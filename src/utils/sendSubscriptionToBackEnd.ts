export async function sendSubscriptionToBackEnd(
  subscription: PushSubscription,
) {
  const response = await fetch("/api/save-subscription/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(subscription),
  });
  if (!response.ok) {
    throw new Error("Bad status code from server.");
  }
  const responseData = await response.json();
  if (!(responseData.data && responseData.data.success)) {
    throw new Error("Bad response from server.");
  }
}
