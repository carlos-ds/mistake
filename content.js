window.onload = function () {
  chrome.storage.sync.get(null, function (items) {
    for (const value in Object.values(items)) {
      if (
        value.ruleType === "URL begins with" &&
        urlBeginsWith(window.location.href, value.ruleExpression)
      ) {
        document.body.prepend(createMessage());
      }
    }
  });
};

function urlBeginsWith(url, expression) {
  const regularExpression = new RegExp(removeProtocol(expression) + ".*");
  return removeProtocol(url).match(regularExpression);
}

// https://stackoverflow.com/questions/3999764/taking-off-the-http-or-https-off-a-javascript-string
function removeProtocol(url) {
  const urlNoProtocol = url.replace(/^https?\:\/\//i, "");
  return urlNoProtocol;
}

function createMessage(text, color) {
  const paragraph = document.createElement("p");
  paragraph.innerText = "test";
  return paragraph;
}
