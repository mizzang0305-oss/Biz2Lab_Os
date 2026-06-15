# Supabase pgvector Model

Future tables:

- `content_chunks`
- `content_embeddings`
- `user_queries`
- `ai_answer_logs`

Rules:

- Keep service role server-only.
- Do not expose raw private notes publicly.
- Separate published content from private inquiry data.
- Add RLS before any client access.

