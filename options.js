const buttonAddNewRule = document.getElementById("add");
const rulesList = document.getElementById("rules");

window.onload = function () {
  initializeRules();
  buttonAddNewRule.addEventListener("click", createRule);
  rulesList.addEventListener("click", saveRule);
  rulesList.addEventListener("click", removeRule);
};

function initializeRules() {
  chrome.storage.sync.get(null, function (syncItems) {
    displayRules(syncItems);
  });
}

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

  const newRule = document.createElement("div");
  newRule.classList.add("rule", "pt-3");
  newRule.setAttribute("data-index", getCurrentNumberOfRules());

  const toggleButton = document.createElement("button");
  toggleButton.classList.add("btn", "btn-light");
  toggleButton.setAttribute("type", "button");
  toggleButton.setAttribute("data-toggle", "collapse");
  toggleButton.setAttribute("data-target", "#collapse" + getCurrentNumberOfRules());
  toggleButton.setAttribute("aria-expanded", "false");
  toggleButton.setAttribute("aria-controls", "collapse" + getCurrentNumberOfRules());
  if (!type || !expression) { 
    toggleButton.innerText = "New rule (unsaved)";
  } else { 
    toggleButton.innerHTML = `${type} "${expression}" &darr;`;
  }

  const collapseDiv = document.createElement("div");
  collapseDiv.classList.add("collapse", "show", "mb-5");
  collapseDiv.setAttribute("id", "collapse" + getCurrentNumberOfRules());

  const card = document.createElement("div");
  card.classList.add("card", "card-body");

  card.appendChild(createTypeButtonGroup(type));
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
      const ruleTargetParent = rule.target.parentNode;
      const ruleIndex = ruleTargetParent.parentNode.parentNode.getAttribute("data-index");
      const typeArray = ruleTargetParent.getElementsByClassName("active");
      if (typeArray.length !== 1) {
        throw new Error(
          "One and only one rule type should be selected. Please refresh the page and try again."
        );
      }
      const type = typeArray[0].textContent;
      const expression = ruleTargetParent.querySelector('[data-input="expression"]').value;
      const message = ruleTargetParent.querySelector('[data-input="message"]').value;
      const textColor = ruleTargetParent.querySelector('[data-input="textColor"]').value;
      const backgroundColor = ruleTargetParent.querySelector('[data-input="backgroundColor"]').value;

      chrome.storage.sync.set({
        [ruleIndex]: {
          type,
          expression,
          message,
          textColor,
          backgroundColor,
        },
      });

      const toggleButton = ruleTargetParent.parentNode.parentNode.querySelector('[data-toggle="collapse"]');
      toggleButton.innerHTML = `${type} "${expression}" &darr;`;

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
      const ruleNode = rule.target.parentNode.parentNode.parentNode;
      chrome.storage.sync.remove(ruleNode.getAttribute("data-index"));
      ruleNode.remove();
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
