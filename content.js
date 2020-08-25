chrome.storage.sync.get(null, function (items) {
  Object.values(items).forEach(function (item) {
    const ruleType = item.type;
    const url = window.location.href;
    const expression = item.expression;
    if (
      (ruleType === "URL begins with" && urlBeginsWith(url, expression)) ||
      (ruleType === "URL contains" && urlContains(url, expression)) ||
      (ruleType === "URL ends with" && urlEndsWith(url, expression))
    ) {
      document.body.prepend(
        createMessage(
          item.font,
          item.message,
          item.textColor,
          item.backgroundColor
        )
      );
    }
  });
});

function urlBeginsWith(url, expression) {
  const regex = new RegExp(expression + ".*");
  return regex.test(url);
}

function urlContains(url, expression) {
  const regex = new RegExp(".*" + expression + ".*");
  return regex.test(url);
}

function urlEndsWith(url, expression) {
  const regex = new RegExp(".*" + expression);
  return regex.test(url);
}

function createMessage(font, text, textColor, backgroundColor) {
  const paragraph = document.createElement("p");
  paragraph.style.backgroundColor = backgroundColor;
  paragraph.style.color = textColor;
  paragraph.style.fontFamily = font;
  paragraph.style.textAlign = "center";
  paragraph.style.padding = "1rem 0";
  paragraph.style.fontFamily = "Arial,Helvetica,sans-serif";
  paragraph.style.margin = "0 0 1rem 0";
  paragraph.innerText = text;
  return paragraph;
}
