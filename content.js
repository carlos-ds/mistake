window.onload = function () {
  chrome.storage.sync.get(null, function (items) {
    Object.values(items).forEach(function (item) {
      console.log(window.location.href);
      console.log(item);
      if (
        item.ruleType === "URL begins with" &&
        urlBeginsWith(window.location.href, item.ruleExpression)
      ) {
        document.body.prepend(createMessage());
        console.log("message was sent to front-end");
      }
    });
  });
};

function urlBeginsWith(url, expression) {
  const regex = new RegExp(expression + ".*");
  return regex.test(url);
}

function createMessage(text, color) {
  const paragraph = document.createElement("p");
  paragraph.innerText = "test";
  return paragraph;
}
