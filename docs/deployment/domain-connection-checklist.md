# Domain Connection Checklist

Date: 2026-06-15
Status: readiness checklist only
Scope: biz2lab.com

## Domain Target

- Apex domain: `biz2lab.com`
- Primary serving host: `www.biz2lab.com`
- Canonical URL: `https://www.biz2lab.com`
- Sitemap URL: `https://www.biz2lab.com/sitemap.xml`
- RSS URL: `https://www.biz2lab.com/rss.xml`
- Robots URL: `https://www.biz2lab.com/robots.txt`

The code currently builds absolute URLs from the official canonical URL `https://www.biz2lab.com`. If `NEXT_PUBLIC_SITE_URL` is configured, it must match `https://www.biz2lab.com`; do not use an apex, localhost, or Vercel preview URL as canonical.

## Apex and WWW Strategy

Recommended:

- Use `https://www.biz2lab.com` as canonical.
- Keep the existing apex `https://biz2lab.com` to `https://www.biz2lab.com` redirect.
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
- [ ] Confirm `https://biz2lab.com` redirects to `https://www.biz2lab.com`.
- [ ] Confirm canonical tags use `https://www.biz2lab.com`, not apex or preview URLs.

## Post-Domain Smoke

Expected `200`:

- `https://www.biz2lab.com/`
- `https://www.biz2lab.com/ko`
- `https://www.biz2lab.com/ko/automation`
- `https://www.biz2lab.com/ko/sales-ops`
- `https://www.biz2lab.com/ko/small-business`
- `https://www.biz2lab.com/ko/contracts-payments`
- `https://www.biz2lab.com/sitemap.xml`
- `https://www.biz2lab.com/robots.txt`
- `https://www.biz2lab.com/rss.xml`

Expected `404`:

- `https://www.biz2lab.com/en`
- `https://www.biz2lab.com/ja`
- `https://www.biz2lab.com/admin`
- `https://www.biz2lab.com/ai`
- `https://www.biz2lab.com/amazon`
- `https://www.biz2lab.com/lotto`
