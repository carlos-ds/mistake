window.onload = function () {
  chrome.storage.sync.get(null, function (items) {
    Object.values(items).forEach(function (item) {
      if (
        item.ruleType === "URL begins with" &&
        urlBeginsWith(window.location.href, item.ruleExpression)
      ) {
        document.body.prepend(
          createMessage(
            item.font,
            item.text,
            item.textColor,
            item.backgroundColor
          )
        );
      }
    });
  });
};

function urlBeginsWith(url, expression) {
  const regex = new RegExp(expression + ".*");
  return regex.test(url);
}

function createMessage(font, text, textColor, backgroundColor) {
  const paragraph = document.createElement("p");
  paragraph.style.backgroundColor = backgroundColor;
  paragraph.style.color = textColor;
  paragraph.style.fontFamily = font;
  paragraph.innerText = text;
  return paragraph;
}
