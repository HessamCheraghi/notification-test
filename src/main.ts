import { askPermission } from "./utils/askPermission";
import { registerServiceWorker } from "./utils/registerServiceWorker";
import { sendSubscriptionToBackEnd } from "./utils/sendSubscriptionToBackEnd";
import { subscribeUserToPush } from "./utils/subscribeUserToPush";
import "./test";

async function main() {
  if (!("serviceWorker" in navigator)) {
    // Service Worker isn't supported on this browser, disable or hide UI.
    return;
  }

  if (!("PushManager" in window)) {
    // Push isn't supported on this browser, disable or hide UI.
    return;
  }
  // Service Worker and Push is supported on this browser.

  const registration = await registerServiceWorker();
  const notificationPermission = await askPermission();
  if (!notificationPermission) {
    // We weren't granted permission.
    return;
  }
  const pushSubscription = await subscribeUserToPush(registration);
  await sendSubscriptionToBackEnd(pushSubscription);
}
