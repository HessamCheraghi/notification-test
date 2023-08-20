import { urlBase64ToUint8Array } from "./urlBase64ToUint8Array";

export async function subscribeUserToPush(
  registration: ServiceWorkerRegistration,
) {
  const subscribeOptions = {
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(
      import.meta.env.VITE_VAPID_PUBLIC_KEY,
    ),
  };
  const pushSubscription =
    await registration.pushManager.subscribe(subscribeOptions);

  console.log("Push Subscription received successfully.");

  return pushSubscription;
}
