# Domain Connection Checklist

Date: 2026-06-15
Status: readiness checklist only
Scope: biz2lab.com

## Domain Target

- Primary domain: `biz2lab.com`
- Canonical URL: `https://biz2lab.com`
- Sitemap URL: `https://biz2lab.com/sitemap.xml`
- RSS URL: `https://biz2lab.com/rss.xml`
- Robots URL: `https://biz2lab.com/robots.txt`

The code currently builds absolute URLs through `NEXT_PUBLIC_SITE_URL` with fallback `https://biz2lab.com`. Do not hardcode a Vercel preview URL as canonical.

## Apex and WWW Strategy

Recommended:

- Use apex domain `biz2lab.com` as canonical.
- Redirect `www.biz2lab.com` to `biz2lab.com`.
- Keep one canonical host in Search Console and AdSense checks.

Manual decisions:

- [ ] Decide whether Vercel nameservers or external DNS records will manage DNS.
- [ ] Confirm the owner can edit DNS records for `biz2lab.com`.
- [ ] Add both apex and `www` in Vercel if the redirect is configured there.

## DNS Method Options

### Option A: Vercel Nameservers

- [ ] Add `biz2lab.com` to the Vercel project.
- [ ] Copy Vercel-provided nameservers.
- [ ] Update nameservers at the domain registrar.
- [ ] Wait for DNS propagation.
- [ ] Confirm Vercel domain status is valid.

### Option B: DNS Records

- [ ] Add `biz2lab.com` to the Vercel project.
- [ ] Add the Vercel-provided apex record.
- [ ] Add the Vercel-provided `www` CNAME record.
- [ ] Confirm no conflicting A/AAAA/CNAME records remain.
- [ ] Wait for DNS propagation.
- [ ] Confirm Vercel domain status is valid.

## SSL Verification

- [ ] Confirm `https://biz2lab.com` loads without certificate errors.
- [ ] Confirm `http://biz2lab.com` redirects to HTTPS.
- [ ] Confirm `https://www.biz2lab.com` redirects to `https://biz2lab.com`.
- [ ] Confirm canonical tags use `https://biz2lab.com`, not preview URLs.

## Post-Domain Smoke

Expected `200`:

- `https://biz2lab.com/`
- `https://biz2lab.com/ko`
- `https://biz2lab.com/ko/automation`
- `https://biz2lab.com/ko/sales-ops`
- `https://biz2lab.com/ko/small-business`
- `https://biz2lab.com/ko/contracts-payments`
- `https://biz2lab.com/sitemap.xml`
- `https://biz2lab.com/robots.txt`
- `https://biz2lab.com/rss.xml`

Expected `404`:

- `https://biz2lab.com/en`
- `https://biz2lab.com/ja`
- `https://biz2lab.com/admin`
- `https://biz2lab.com/ai`
- `https://biz2lab.com/amazon`
- `https://biz2lab.com/lotto`
