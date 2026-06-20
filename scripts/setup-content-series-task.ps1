$ErrorActionPreference = "Stop"

$TaskName = "Biz2Lab Content Series Scheduler"
$RepoRoot = "C:\Users\LOVE\MyProjects\Biz2Lab_Os"
$LogDirectory = Join-Path $RepoRoot ".tmp"
$LogPath = Join-Path $LogDirectory "content-series-scheduler.log"

if (!(Test-Path $LogDirectory)) {
  New-Item -ItemType Directory -Path $LogDirectory | Out-Null
}

$scheduledCommand = "cd '$RepoRoot'; if (!(Test-Path '.tmp')) { New-Item -ItemType Directory -Path '.tmp' | Out-Null }; git fetch origin; git checkout master; git pull --ff-only origin master; npm run content:series:scheduler -- --cadence 180 --use-latest-codex-artifact >> .tmp\content-series-scheduler.log 2>&1"

$action = New-ScheduledTaskAction `
  -Execute "powershell.exe" `
  -Argument "-NoProfile -ExecutionPolicy Bypass -Command `"$scheduledCommand`""

$trigger = New-ScheduledTaskTrigger `
  -Once `
  -At (Get-Date).AddHours(3) `
  -RepetitionInterval (New-TimeSpan -Hours 3) `
  -RepetitionDuration (New-TimeSpan -Days 3650)

$settings = New-ScheduledTaskSettingsSet `
  -MultipleInstances IgnoreNew `
  -StartWhenAvailable `
  -ExecutionTimeLimit (New-TimeSpan -Hours 1) `
  -AllowStartIfOnBatteries `
  -DontStopIfGoingOnBatteries

$principal = New-ScheduledTaskPrincipal `
  -UserId ([System.Security.Principal.WindowsIdentity]::GetCurrent().Name) `
  -LogonType Interactive `
  -RunLevel Limited

Register-ScheduledTask `
  -TaskName $TaskName `
  -Action $action `
  -Trigger $trigger `
  -Settings $settings `
  -Principal $principal `
  -Description "Runs the Biz2Lab content series scheduler every 3 hours. The scheduler keeps Codex artifact, PR limit, daily limit, active hours, no auto-merge, and no deploy gates." `
  -Force | Out-Null

Write-Host "Registered scheduled task: $TaskName"
Write-Host "Repo root: $RepoRoot"
Write-Host "Log path: $LogPath"
