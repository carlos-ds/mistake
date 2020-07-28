const buttonAddNewRule = document.getElementById("add");
const rulesList = document.getElementById("rules");

window.onload = function () {
  const rules = getRules();
  displayRules(rules);

  buttonAddNewRule.addEventListener("click", createRule);
  rulesList.addEventListener("click", saveRule);
  rulesList.addEventListener("click", removeRule);
};

function getRules() {
  try {
    chrome.storage.sync.get(null, function (items) {
      return items;
    });
  } catch (error) {
    displayAlert(
      "danger",
      "Something went wrong while retrieving the existing rules. Please refresh the page and try again!"
    );
  }
}

function displayRules(rules) {
  // for (const [key, value] of Object.entries(rules)) {
  //   createRule(key
  // }
}

function createRule(type) {
  const currentNumberOfRules = document.querySelectorAll(".rule").length;

  const newRule = document.createElement("div");
  newRule.classList.add("rule");
  newRule.setAttribute("data-index", currentNumberOfRules);

  newRule.appendChild(createDropdown("rule type", type));
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

      chrome.storage.sync.set({
        [ruleKey]: {
          // Set rule type as a value from the global ruleTypeOptions array
          ruleType: ruleTypeOptions[ruleType.value],
        },
      });
      displayAlert("success", "The rule was successfully saved!");
    } catch (error) {
      displayAlert(
        "danger",
        "The rule could not be saved. Please refresh the page and try again."
      );
    }
  }
}

// To clear all existing items from storage: chrome.storage.sync.clear()

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

const ruleTypeOptions = ["URL begins with", "URL contains", "URL ends with"];

function createDropdown(type, value) {
  if (type === "rule type") {
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

function displayAlert(type, text) {
  const activeAlert = document.getElementsByClassName("alert");
  if (activeAlert.length > 0) {
    activeAlert[0].remove();
  }

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
