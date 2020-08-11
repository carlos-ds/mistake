const buttonAddNewRule = document.getElementById("add");
const rulesList = document.getElementById("rules");

window.onload = function () {
  chrome.storage.sync.get(null, function (syncItems) {
    displayRules(syncItems);
  });
  buttonAddNewRule.addEventListener("click", createRule);
  rulesList.addEventListener("click", saveRule);
  rulesList.addEventListener("click", removeRule);
};

function displayRules(rules) {
  for (const value of Object.values(rules)) {
    createRule(
      value.ruleType,
      value.ruleExpression,
      value.message,
      value.textColor,
      value.backgroundColor
    );
  }
}

function createRule(type, expression, message, textColor, backgroundColor) {
  removeActiveAlert();
  const currentNumberOfRules = parseInt(
    document.querySelectorAll(".rule").length,
    10
  );

  const newRule = document.createElement("div");
  newRule.classList.add("rule", "pt-3");
  newRule.setAttribute("data-index", currentNumberOfRules);

  const toggleButton = document.createElement("button");
  toggleButton.classList.add("btn", "btn-light");
  toggleButton.setAttribute("type", "button");
  toggleButton.setAttribute("data-toggle", "collapse");
  toggleButton.setAttribute("data-target", "#collapse" + currentNumberOfRules);
  toggleButton.setAttribute("aria-expanded", "false");
  toggleButton.setAttribute("aria-controls", "collapse" + currentNumberOfRules);
  toggleButton.innerHTML = `Rule ${
    currentNumberOfRules + 1
  } - ${type} "${expression}" &darr;`;

  const collapseDiv = document.createElement("div");
  collapseDiv.classList.add("collapse", "show", "mb-5");
  collapseDiv.setAttribute("id", "collapse" + currentNumberOfRules);

  const card = document.createElement("div");
  card.classList.add("card", "card-body");

  card.appendChild(createRuleTypeButtonGroup(type));
  card.appendChild(createExpressionInput(expression));
  card.appendChild(createMessageInput(message));
  card.appendChild(createColorInput("textColor", textColor));
  card.appendChild(createColorInput("backgroundColor", backgroundColor));
  card.appendChild(createButton("save"));
  card.appendChild(createButton("remove"));

  collapseDiv.appendChild(card);
  newRule.appendChild(toggleButton);
  newRule.appendChild(collapseDiv);
  rulesList.appendChild(newRule);
}

function saveRule(rule) {
  if (rule.target.getAttribute("data-action") === "save") {
    try {
      const ruleKey =
        "rule" +
        rule.target.parentNode.parentNode.parentNode.getAttribute("data-index");
      const ruleTypeArray = rule.target.parentNode.getElementsByClassName(
        "active"
      );
      if (ruleTypeArray.length !== 1) {
        throw new Error(
          "One and only one rule type should be selected. Please refresh the page and try again."
        );
      }
      const ruleType = ruleTypeArray[0].textContent;
      const ruleExpression = rule.target.parentNode.querySelector(
        '[data-input="ruleExpression"]'
      ).value;
      const message = rule.target.parentNode.querySelector(
        '[data-input="message"]'
      ).value;
      const textColor = rule.target.parentNode.querySelector(
        '[data-input="textColor"]'
      ).value;
      const backgroundColor = rule.target.parentNode.querySelector(
        '[data-input="backgroundColor"]'
      ).value;

      chrome.storage.sync.set({
        [ruleKey]: {
          ruleType,
          ruleExpression,
          message,
          textColor,
          backgroundColor,
        },
      });
      displayAlert("success", "The rule was successfully saved!");
    } catch (error) {
      console.log(error);
      displayAlert(
        "danger",
        "The rule could not be saved. Please refresh the page and try again."
      );
    }
  }
}

function removeRule(rule) {
  if (rule.target.getAttribute("data-action") === "remove") {
    try {
      chrome.storage.sync.remove(
        "rule" + rule.target.parentNode.getAttribute("data-index")
      );
      rule.target.parentNode.remove();
      displayAlert("success", "The rule was successfully removed!");
    } catch (error) {
      console.log(error);
      displayAlert(
        "danger",
        "The rule could not be removed. Please refresh the page and try again."
      );
    }
  }
}
