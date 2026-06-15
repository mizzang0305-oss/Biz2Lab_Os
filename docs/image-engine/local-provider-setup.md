# Local Provider Setup

Date: 2026-06-16
Status: setup reference only

## Detection

Run:

```bash
npm run image-skill:detect
```

The command checks safe localhost defaults only:

- ComfyUI: `http://127.0.0.1:8188`
- Stable Diffusion WebUI / Automatic1111: `http://127.0.0.1:7860`

It does not start programs, install tools, download models, or call remote hosts.

## ComfyUI Local Option

The user must install and run ComfyUI manually if desired. Codex must not download model weights or workflows.

Example environment values:

```bash
LOCAL_IMAGE_PROVIDER=comfyui
LOCAL_IMAGE_ENDPOINT=http://127.0.0.1:8188
LOCAL_IMAGE_WORKFLOW_PATH=config/comfyui-workflow.local.json
```

The endpoint must be localhost. A workflow config is required before actual generation can be enabled.

## Stable Diffusion WebUI Local Option

The user must install and run Stable Diffusion WebUI or Automatic1111 manually if desired. Codex must not download model weights.

Example environment values:

```bash
LOCAL_IMAGE_PROVIDER=sd-webui
LOCAL_IMAGE_ENDPOINT=http://127.0.0.1:7860
```

The current adapter is a safe scaffold. Payload and model assumptions must be reviewed before generation is enabled.

## Endpoint Restrictions

Allowed:

- `http://127.0.0.1:<port>`
- `http://localhost:<port>`

Rejected:

- `https://...`
- LAN IPs
- public domains
- remote API hosts

## Config Example

See:

```text
config/local-image-providers.example.json
```

Do not place secrets in provider config files.
