# Biz2Lab evidence source discovery — 2026-07-28

> 기존 프로젝트의 주 작업 폴더는 변경하지 않았습니다. 캡처는 `origin`의 exact commit을 분리한 detached worktree에서 실행했으며, 촬영 직전과 종료 후 tracked 상태가 clean인지 확인했습니다. 공개 manifest에는 로컬 절대 경로, 실행 명령, remote URL을 넣지 않았습니다.

| project | found | remote | capture source commit | source state | run mode | local port | health / capture routes | result | blocked reason |
|---|---|---|---|---|---|---:|---|---|---|
| commerce-automation | YES | origin configured | `29ef9efbf46ebe8ef7d8137dd866516056092f4f` | detached clean | local JSON, external upload disabled | 4311 | `/uploads`, `/runs` | 2 candidate captures | none |
| CN_WMS | YES | origin configured | `6838b13b26610f576ece45e0f16886d522bb4c73` | detached clean | mock fixture | 4312 | `/orders/workbench`, `/operations/flow` | 2 candidate captures | none; account/source reference fields masked on order workbench |
| mybizLab | YES | origin configured | `267ea722ccedc881909cb8c543966cdfc82a495d` | detached clean | read-only local demo | 4313 | `/demo/dashboard` | 1 candidate capture | none |
| CN_FOOD_Contract | YES | origin configured | `77af4a1bf89c926e1b44d97d7475a12b64968a95` | detached clean | NOT RUN | — | safe standalone fixture route not found | 0 captures, 1 blocked source | authentication/contract state could not be demonstrated without provider or sensitive identity flow |
| CN_ExeFlow | YES | origin configured | `cccabded031d0302979f0a553becf2e02b7e8b51` | detached clean | NOT RUN | — | safe standalone fixture route not found | 0 captures, 1 blocked source | available flow required Supabase/auth configuration, so local evidence capture was stopped |

## Capture decisions

- `commerce-automation`: generation and external execution boundaries already existed in local-data mode. Upload remained disabled throughout.
- `CN_WMS`: only the existing mock data provider was used. Customer search and source reference controls were masked before capture.
- `mybizLab`: only the existing read-only demo route was used. All displayed values were local demo data.
- `CN_FOOD_Contract`: no contract, identity, payment, or provider flow was started.
- `CN_ExeFlow`: no Supabase connection, authentication bypass, seed, or database write was attempted.

## Repositories and data not changed

- No source project code, fixture, seed, environment file, database, or remote branch was changed.
- No production API, production database, payment provider, identity provider, or customer record was accessed.
- Raw PNG capture files remain ignored under `artifacts/evidence/raw`; only optimized WebP assets and sanitized manifest metadata are proposed for commit.
