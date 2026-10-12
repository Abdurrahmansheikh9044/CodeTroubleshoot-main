const input = document.querySelector("#image-input");
const preview = document.querySelector("#preview");
const processButton = document.querySelector("#process");
const message = document.querySelector("#message");
const resultPanel = document.querySelector("#result-panel");
const resultText = document.querySelector("#result-text");
const timing = document.querySelector("#timing");
const processed = document.querySelector("#processed");
const copyButton = document.querySelector("#copy-text");
const downloadButton = document.querySelector("#download-text");

let selectedFile = null;
let resultId = null;

input.addEventListener("change", () => {
  const file = input.files && input.files[0];
  selectedFile = file || null;
  resultId = null;
  resultPanel.hidden = true;
  message.textContent = "";
  if (!selectedFile) {
    preview.hidden = true;
    processButton.disabled = true;
    return;
  }
  preview.src = URL.createObjectURL(selectedFile);
  preview.hidden = false;
  processButton.disabled = false;
});

processButton.addEventListener("click", async () => {
  if (!selectedFile) {
    return;
  }
  processButton.disabled = true;
  message.textContent = "";
  const body = new FormData();
  body.append("file", selectedFile);
  let response, data;
  try {
    response = await fetch("/api/recognize", { method: "POST", body });
    data = await response.json();
  } catch (err) {
    // Network error or invalid JSON — show friendly message and re-enable button
    message.textContent = "Network error — please check your connection and try again.";
    processButton.disabled = false;
    return;
  }
  processButton.disabled = false;
  if (!response.ok) {
    message.textContent = data.error || "Request failed";
    return;
  }
  resultId = data.id;
  resultText.value = data.text;
  timing.textContent = `${data.processing_ms} ms`;
  processed.src = `/api/results/${data.id}/processed.png?t=${Date.now()}`;
  processed.hidden = false;
  resultPanel.hidden = false;
});

copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(resultText.value);
    copyButton.textContent = "Copied!";
    setTimeout(() => {
      copyButton.textContent = "Copy text";
    }, 2000);
  } catch (err) {
    // Clipboard permission denied — fall back to select all so user can copy manually
    resultText.select();
    message.textContent = "Could not copy automatically — text selected, press Ctrl+C.";
  }
});

downloadButton.addEventListener("click", () => {
  if (!resultId) {
    return;
  }
  window.location.href = `/api/results/${resultId}/download`;
});
