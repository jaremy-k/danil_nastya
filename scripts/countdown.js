const countdown =
  typeof document === "undefined" ? null : document.querySelector("[data-wedding-date]");

if (countdown) {
  const targetDate = new Date(countdown.dataset.weddingDate);
  const day = 1000 * 60 * 60 * 24;
  const hour = 1000 * 60 * 60;
  const minute = 1000 * 60;

  const parts = {
    days: countdown.querySelector("[data-days]"),
    hours: countdown.querySelector("[data-hours]"),
    minutes: countdown.querySelector("[data-minutes]"),
    seconds: countdown.querySelector("[data-seconds]"),
  };

  const render = () => {
    const remaining = Math.max(targetDate.getTime() - Date.now(), 0);
    const days = Math.floor(remaining / day);
    const hours = Math.floor((remaining % day) / hour);
    const minutes = Math.floor((remaining % hour) / minute);
    const seconds = Math.floor((remaining % minute) / 1000);

    parts.days.textContent = days;
    parts.hours.textContent = String(hours).padStart(2, "0");
    parts.minutes.textContent = String(minutes).padStart(2, "0");
    parts.seconds.textContent = String(seconds).padStart(2, "0");
  };

  render();
  window.setInterval(render, 1000);
}
