// Add guidance to served pages while preserving the pinned downloadable artifacts.
export function withMinzPrivacyNotice(html: string): string {
  const notice = '<div role="contentinfo" aria-label="MINZ 개인정보 안내" data-minz-privacy-notice style="box-sizing:border-box;padding:12px 20px;background:#f7f4ed;color:#202b2c;font:14px/1.6 system-ui,sans-serif;text-align:center;overflow-wrap:anywhere"><a href="/privacy#privacy-minz" style="display:inline-flex;align-items:center;min-height:44px;color:#165d56;text-decoration:underline;text-underline-offset:3px">개인정보·광고 안내 · MINZ 브라우저 저장과 데모 입력</a></div>';
  return html.replace("</body>", `${notice}</body>`);
}
