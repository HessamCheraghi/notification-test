import { askPermission } from "./utils/askPermission";
import { disableUI } from "./utils/disableUI";
import { postToServer } from "./utils/postToServer";
import { registerServiceWorker } from "./utils/registerServiceWorker";
import { subscribeUserToPush } from "./utils/subscribeUserToPush";

let registration: ServiceWorkerRegistration | null = null;

main();

export async function main() {
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
    // Service Worker isn't supported on this browser, disable or hide UI.
    disableUI();
    return;
  }
  // Service Worker and Push is supported on this browser.
  registration = await registerServiceWorker();
}

async function activateNotification() {
  if (!registration) {
    // there is no service worker installed
    return;
  }

  const notificationPermission = await askPermission();
  if (!notificationPermission) {
    // We weren't granted permission.
    return;
  }
  const pushSubscription = await subscribeUserToPush(registration);

  await postToServer("/add-subscription/", pushSubscription);
}

async function deactivateNotification() {
  const registration = await navigator.serviceWorker.getRegistration();
  if (!registration) {
    // there is no service worker installed
    return;
  }
  const pushSubscription = await registration.pushManager.getSubscription();
  if (!pushSubscription) {
    // there is no push subscription
    return;
  }

  await postToServer("/remove-subscription/", {
    endpoint: pushSubscription.endpoint,
  });

  await pushSubscription.unsubscribe();
  await registration.unregister();
}

const activateBtn = document.querySelector("#activate");
const deactivateBtn = document.querySelector("#deactivate");

activateBtn?.addEventListener("click", activateNotification);
deactivateBtn?.addEventListener("click", deactivateNotification);
