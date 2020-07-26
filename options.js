const buttonAddNewRule = document.getElementById("add");
const rulesList = document.getElementById("rules");

window.onload = function () {
  buttonAddNewRule.addEventListener("click", createRule);
  rulesList.addEventListener("click", saveRule);
  rulesList.addEventListener("click", removeRule);
};

function createRule() {
  const currentNumberOfRules = document.querySelectorAll(".rule").length;

  const newRule = document.createElement("div");
  newRule.classList.add("rule");
  newRule.setAttribute("data-index", currentNumberOfRules);

  newRule.appendChild(createDropdown("rule type"));
  newRule.appendChild(createButton("save"));
  newRule.appendChild(createButton("remove"));

  rulesList.appendChild(newRule);
}

function saveRule(rule) {
  if (rule.target.getAttribute("data-action") === "save") {
    try {
      const ruleKey =
        "rule" + rule.target.parentNode.getAttribute("data-index");
      chrome.storage.sync.set({
        [ruleKey]: {
          key1: "value1",
          key2: "value2",
        },
      });
      displayAlert("success", "The rule was successfully saved!");
    } catch (error) {
      displayAlert(
        "danger",
        "The rule could not be removed. Please refresh the page and try again."
      );
    }

    // Disable button for 2 seconds to avoid button mashing
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

function createDropdown(type) {
  if (type === "rule type") {
    const ruleTypeDropdown = document.createElement("select");
    ruleTypeDropdown.innerHTML =
      '<option value="1">Option 1</option><option value="2">Option 2</option>';
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
}
