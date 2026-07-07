const GA4_MEASUREMENT_ID = "G-VGFVWF59M7";
const ADSENSE_CLIENT_ID = "ca-pub-2021259826985155";
const ADSENSE_PUBLISHER_ID = "pub-2021259826985155";

export const googleSetup = {
  ga4MeasurementId: GA4_MEASUREMENT_ID,
  ga4ScriptUrl: `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`,
  adsenseClientId: ADSENSE_CLIENT_ID,
  adsensePublisherId: ADSENSE_PUBLISHER_ID,
  adsenseScriptUrl: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`,
  adsTxtLine: `google.com, ${ADSENSE_PUBLISHER_ID}, DIRECT, f08c47fec0942fa0`,
  adsenseApprovalMode: {
    name: "pre-approval-client-loader-only",
    clientLoaderAllowed: true,
    manualAdSlotsAllowed: false,
    runtimeNoablateAllowedWhen:
      "hidden, unfilled, no ad slot attribute, and no measurable layout footprint",
  },
} as const;
