export const GA_TRACKING_ID = 'UA-156485505-1';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export function pageview(url: string) {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
}

type EventOptions = {
  action: string;
  category: string;
  label: string;
  value?: string;
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export function event({ action, category, label, value }: EventOptions) {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
}
