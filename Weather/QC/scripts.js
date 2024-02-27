const Modal = (el) => {
  const modal = {
    open() {
      el.style.display = null;
    },
    close() {
      el.style.display = "none";
    },
  };
  el.addEventListener("click", (e) => {
    if (e.target === el) {
      modal.close();
    }
  });
  modal.close();
  return modal;
};
const Timer = (el) => ({
  el: {
    minutes: el.querySelector(".minutes"),
    seconds: el.querySelector(".seconds"),
  },
  seconds: 0,
  lastTime: null,
  frameId: null,
  get fmt() {
    const minutes = Math.floor(this.seconds / 60);
    const seconds = Math.floor(this.seconds % 60);
    return {
      minutes: `${minutes}`.padStart(2, "0"),
      seconds: `${seconds}`.padStart(2, "0"),
    };
  },
  start() {
    const now = Date.now();
    if (this.lastTime) {
      this.seconds += (now - this.lastTime) / 1000;
    }
    this.lastTime = now;

    this.el.minutes.textContent = this.fmt.minutes;
    this.el.seconds.textContent = this.fmt.seconds;

    this.frameId = requestAnimationFrame(() => this.start());
  },
  pause() {
    cancelAnimationFrame(this.frameId);
    this.lastTime = null;
  },
});

const approveModal = Modal(document.getElementById("approve-modal"));
const timer = Timer(document.getElementById("timer"));
const focusTimer = Timer(document.getElementById("focus-timer"));
const iframeWindow = document.querySelector("iframe").contentWindow;
const approveButton = document.getElementById("approve-button");
const approveForm = document.getElementById("approve-form");

timer.start();
iframeWindow.addEventListener("focus", () => focusTimer.start());
iframeWindow.addEventListener("blur", () => focusTimer.pause());
approveButton.addEventListener("click", () => {
  approveModal.open();
  timer.pause();
  focusTimer.pause();
  approveForm.querySelector('input[name="time"]').value =
    focusTimer.fmt.minutes + ":" + focusTimer.fmt.seconds;
});

approveForm.addEventListener("submit", (e) => {
  const form = e.target;
  const time = form["time"].value;
  const [minutes, seconds] = time.split(":");
  if (
    parseInt(minutes) * 60 + parseInt(seconds) > 300 &&
    !form["line_and_scene"].checked &&
    !form["wording_and_semantics"].checked &&
    !form["footage"].checked &&
    !form["screen_time"].checked &&
    !form["video_length"].checked &&
    !form["other_feedback"].value
  ) {
    alert(
      `Because the qc time is more than 5 minutes, please select at least one option or give some feedback.`
    );
    e.preventDefault();
  }
});
