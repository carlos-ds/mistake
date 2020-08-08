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
  for (const [key, value] of Object.entries(rules)) {
    createRule(value.ruleType, value.ruleExpression);
  }
}

function createRule(type, expression) {
  removeActiveAlert();
  const currentNumberOfRules = document.querySelectorAll(".rule").length;

  const newRule = document.createElement("div");
  newRule.classList.add("rule");
  newRule.setAttribute("data-index", currentNumberOfRules);

  newRule.appendChild(createDropdown("ruleType", type));
  newRule.appendChild(createInputField("ruleExpression", expression));
  newRule.appendChild(createButton("save"));
  newRule.appendChild(createButton("remove"));

  rulesList.appendChild(newRule);
}

function saveRule(rule) {
  if (rule.target.getAttribute("data-action") === "save") {
    try {
      const ruleKey =
        "rule" + rule.target.parentNode.getAttribute("data-index");
      const ruleType = rule.target.parentNode.querySelector(
        '[data-dropdown-type="ruleType"]'
      );
      const ruleExpression = rule.target.parentNode.querySelector(
        '[data-input-type="ruleExpression"]'
      ).value;

      chrome.storage.sync.set({
        [ruleKey]: {
          // Set rule type as a value from the global ruleTypeOptions array
          ruleType: ruleTypeOptions[ruleType.value],
          ruleExpression: ruleExpression,
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
