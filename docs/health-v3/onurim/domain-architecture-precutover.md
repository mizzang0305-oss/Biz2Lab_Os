# ONURIM DOMAIN ARCHITECTURE — PRE-CUTOVER ANALYSIS

## Scope

Analysis only. No domain, DNS, redirect, sitemap, noindex or Production navigation mutation is authorized by this document.

| Option | Separation from legacy Biz2Lab topics | Operational continuity | Main risk | Pre-cutover requirement |
| --- | --- | --- | --- | --- |
| D1. Existing Biz2Lab domain | Lowest. The existing site contains non-health content, so visitors and crawlers may encounter mixed topical signals. | Highest. Existing hosting and repository setup can be reused. | Health trust context can be diluted by unrelated business/automation content. | Explicit information architecture and health-only trust surfaces before cutover. |
| D2. Dedicated Onurim domain | Highest. Health editorial identity, policies and future reputation are clearly bounded. | Lower initially. Requires owned domain, DNS, verified contact and controlled launch plan. | More setup and no inherited site history. | Owner selects and acquires the domain; DNS and ownership proof are separate approvals. |
| D3. Onurim subdomain | Medium-high. A clear health namespace while retaining Biz2Lab operational ownership. | Medium. Shared operations but separate host and navigation can be staged. | Parent-brand relationship remains visible; cross-host canonical, analytics and consent design need care. | Owner-approved subdomain, DNS, host mapping and separate live validation. |

## Current decision

`DOMAIN_ARCHITECTURE_DECISION = NOT_MADE`

No later explicit Owner domain decision was found in the current Health V3 scope. Do not select D1, D2 or D3 automatically.

## Decision inputs for the Owner

1. Whether long-term health-brand separation is more important than reuse of the current site history.
2. Whether a verified correction mailbox and named operational owner will be ready before launch.
3. Whether the launch plan can validate noindex removal, sitemap, robots, canonical URLs and protected-to-public transition on the chosen host.
