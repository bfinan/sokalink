// Listen for messages from the Sokalink website
window.addEventListener("message", (event) => {
  if (event.source !== window) return;

  if (event.data.type && event.data.type === "SET_USER_ID") {
    chrome.runtime.sendMessage(event.data, (response) => {
      console.log("Response from background script:", response);
    });
  }
});
