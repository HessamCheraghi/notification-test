import { askPermission } from "./utils/askPermission";
import { registerServiceWorker } from "./utils/registerServiceWorker";

const requestBtn = document.querySelector("#start") as HTMLButtonElement;
requestBtn.addEventListener("click", request);

const sendBtn = document.querySelector("#send") as HTMLButtonElement;
sendBtn.addEventListener("click", send);

let registration: ServiceWorkerRegistration;
let notificationPermission: boolean;

async function request(e: MouseEvent) {
  e.preventDefault();
  registration = await registerServiceWorker();
  notificationPermission = await askPermission();
}
async function send(e: MouseEvent) {
  e.preventDefault();
  if (notificationPermission) {
    registration.showNotification("سلام به همه", {
      body: "یه اتفاقی افتاده بهت نمیگیم!",
    });
  }
}
