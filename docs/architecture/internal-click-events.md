# Internal Click Events

Biz2Lab MVP treats click tracking as optional, non-blocking, and internal.

Allowed future event types:

- `related_post`
- `template_cta`
- `next_step`
- `category_hub`
- `contact_cta`
- `search_result`

Rules:

- Do not block navigation if tracking fails.
- Do not collect direct personal identifiers for simple link clicks.
- Store only event type, source path, target path, and timestamp unless a user explicitly submits a form.
- Keep tracking server-side and minimal.
- Do not expose dashboards before AdSense approval.

