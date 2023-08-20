import { askPermission } from "./utils/askPermission";
import { registerServiceWorker } from "./utils/registerServiceWorker";

let registration: ServiceWorkerRegistration;

async function start() {
  registration = await registerServiceWorker();
}

async function request(e: MouseEvent) {
  e.preventDefault();
  await askPermission();
}

async function send(e: MouseEvent) {
  e.preventDefault();
  registration.showNotification("سلام به همه", {
    body: "یه اتفاقی افتاده بهت نمیگیم!",
    dir: "rtl",
    actions: [
      {
        action: "reply",
        // @ts-expect-error
        type: "text",
        title: "جواب بده",
        placeholder: "هیچ اتفاقی نیفتاده",
      },
    ],
  });
}

start();

const requestBtn = document.querySelector("#start") as HTMLButtonElement;
requestBtn.addEventListener("click", request);

const sendBtn = document.querySelector("#send") as HTMLButtonElement;
sendBtn.addEventListener("click", send);
