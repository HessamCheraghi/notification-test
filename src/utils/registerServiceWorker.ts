export async function registerServiceWorker() {
  try {
    const registration: ServiceWorkerRegistration =
      await navigator.serviceWorker.register("./assets/sw.js");
    console.log("Service worker successfully registered.");
    return registration;
  } catch (err) {
    console.error(err);
    throw new Error("Unable to register service worker.");
  }
}
