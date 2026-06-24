$ErrorActionPreference = "Stop"

$TaskName = "Biz2Lab Autopilot Hourly"
$RepoRoot = "C:\Users\LOVE\MyProjects\Biz2Lab_Os"
$LogDirectory = Join-Path $RepoRoot ".tmp"
$LogPath = Join-Path $LogDirectory "biz2lab-autopilot-task-output.log"

if (!(Test-Path $LogDirectory)) {
  New-Item -ItemType Directory -Path $LogDirectory | Out-Null
}

$scheduledCommand = "cd '$RepoRoot'; if (!(Test-Path '.tmp')) { New-Item -ItemType Directory -Path '.tmp' | Out-Null }; git fetch origin; git checkout master; git pull --ff-only origin master; npm run ops:autopilot-run >> .tmp\biz2lab-autopilot-task-output.log 2>&1"

$action = New-ScheduledTaskAction `
  -Execute "powershell.exe" `
  -Argument "-NoProfile -ExecutionPolicy Bypass -Command `"$scheduledCommand`""

$trigger = New-ScheduledTaskTrigger `
  -Once `
  -At (Get-Date).AddHours(1) `
  -RepetitionInterval (New-TimeSpan -Hours 1) `
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
  -Description "Runs the Biz2Lab hourly autopilot. It keeps active-hours, validation, PR, Codex artifact, no deploy, no secrets, and Green/Yellow/Red gates." `
  -Force | Out-Null

Write-Host "Registered scheduled task: $TaskName"
Write-Host "Repo root: $RepoRoot"
Write-Host "Schedule: every 1 hour"
Write-Host "Command: $scheduledCommand"
Write-Host "Log path: $LogPath"
