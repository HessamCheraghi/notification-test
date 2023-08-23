/**
 * Rasamiot service worker version 0.0.1
 */

self.addEventListener("install", (e) => {
  console.log("Service worker installed");
});

self.addEventListener("activate", (e) => {
  console.log("Service worker activated");
});

self.addEventListener("push", (e) => {
  const { title, options } = sanitize(e?.data);
  self.registration.showNotification(title, options);
});

function sanitize(rawData) {
  const defaultReturn = {
    title: "Error",
    options: {
      body: "Server notification JSON is not correct.",
    },
  };
  try {
    /** @type {unknown} */
    const riskyData = rawData?.json();
    if (
      typeof riskyData === "object" &&
      riskyData &&
      "title" in riskyData &&
      typeof riskyData.title === "string" &&
      "text" in riskyData &&
      typeof riskyData.text === "string"
    ) {
      return {
        title: riskyData.title,
        options: {
          body: riskyData.text,
        },
      };
    } else {
      throw new Error("Wrong json schema.");
    }
  } catch (err) {
    console.error(err);
  }
  return defaultReturn;
}
