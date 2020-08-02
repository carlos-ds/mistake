chrome.runtime.onInstalled.addListener(function () {
  console.log("Mistaken extension is installed!");
});

function logOnBefore(details) {
  const standaardRegExp = /https:\/\/www.standaard\.be.*/;
  if (details.url.match(standaardRegExp)) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { greeting: "hello" }, function (
        response
      ) {
        console.log(response.farewell);
      });
    });
  }
}

chrome.webNavigation.onBeforeNavigate.addListener(logOnBefore);
