const sadText = "متاسفانه مرورگر شما از سرویس نوتیفیکیشن پشتیبانی نمی کند.";

export function disableUI() {
  const buttons = document.querySelectorAll("button");

  buttons.forEach((button) => {
    button.disabled = true;
  });

  const title = document.querySelector("h1");
  if (title) {
    title.textContent = sadText;
  }
}
