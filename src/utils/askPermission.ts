export async function askPermission() {
  const permissionResult = await new Promise((resolve, reject) => {
    // old browsers take a callback
    const newBrowserResult = Notification.requestPermission((result) => {
      resolve(result);
    });

    // new browsers return a promise
    if (newBrowserResult) {
      newBrowserResult.then(resolve, reject);
    }
  });
  if (permissionResult !== "granted") {
    return false;
  }
  return true;
}
