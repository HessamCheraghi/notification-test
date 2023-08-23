const BASE_URL = "http://localhost:8000";

export async function postToServer(url: string, data: unknown) {
  const response = await fetch(BASE_URL + url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Bad status code from server.");
  }
}
