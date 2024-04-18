console.log("iframe.js");

window.addEventListener("message", async (event) => {
  if (event.origin !== "http://localhost:8000") return;

  if (event.data && event.data.type === "CAPTURE_FRAME") {
    const targetEl = document.body;
    const canvas = await html2canvas(targetEl);

    const imageDataUrl = canvas.toDataURL("image/png");

    event.source.postMessage(
      {
        type: "FRAME_CAPTURED",
        imageDataUrl: imageDataUrl,
        commentId: event.data.commentId,
      },
      event.origin
    );
  }
});
