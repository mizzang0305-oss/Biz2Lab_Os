export const internalClickEventTypes = [
  "related_post",
  "template_cta",
  "next_step",
  "category_hub",
  "contact_cta",
  "search_result",
] as const;

export type InternalClickEventType = (typeof internalClickEventTypes)[number];

