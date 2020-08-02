const buttonAddNewRule = document.getElementById("add");
const rulesList = document.getElementById("rules");
const ruleTypeOptions = ["URL begins with", "URL contains", "URL ends with"];

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

function createDropdown(type, value) {
  if (type === "ruleType") {
    const ruleTypeDropdown = document.createElement("select");
    ruleTypeDropdown.setAttribute("data-dropdown-type", "ruleType");

    // Create dropdown options based on global ruleTypeOptions array
    for (i = 0; i < ruleTypeOptions.length; i++) {
      const ruleTypeOption = document.createElement("option");
      ruleTypeOption.setAttribute("value", i);
      if (value === ruleTypeOptions[i]) {
        ruleTypeOption.setAttribute("selected", "selected");
      }
      ruleTypeOption.innerText = ruleTypeOptions[i];
      ruleTypeDropdown.appendChild(ruleTypeOption);
    }
    return ruleTypeDropdown;
  }
}

function createInputField(type, expression) {
  if (type === "ruleExpression") {
    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("minlength", 1);
    input.setAttribute("maxlength", 255);
    input.setAttribute("data-input-type", "ruleExpression");
    input.value = expression;
    return input;
  }
}

function createButton(type) {
  if (type === "save") {
    const saveButton = document.createElement("button");
    saveButton.innerText = "Save";
    saveButton.classList.add("btn", "btn-primary");
    saveButton.setAttribute("data-action", "save");
    return saveButton;
  }

  if (type === "remove") {
    const removeButton = document.createElement("button");
    removeButton.innerText = "Remove";
    removeButton.classList.add("btn", "btn-danger");
    removeButton.setAttribute("data-action", "remove");
    return removeButton;
  }
}

function displayAlert(type, text) {
  removeActiveAlert();
  const newAlert = document.createElement("div");
  newAlert.setAttribute("role", "alert");
  newAlert.innerText = text;
  if (type === "success") {
    newAlert.classList.add("alert", "alert-success");
  }
  if (type === "danger") {
    newAlert.classList.add("alert", "alert-danger");
  }
  document.body.prepend(newAlert);
  setTimeout(function () {
    newAlert.remove();
  }, 2000);
}

function removeActiveAlert() {
  const activeAlert = document.getElementsByClassName("alert");
  if (activeAlert.length > 0) {
    activeAlert[0].remove();
  }
}
