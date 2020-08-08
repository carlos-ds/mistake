function createDropdown(type, value) {
  if (type === "ruleType") {
    const ruleTypeDropdown = document.createElement("select");
    ruleTypeDropdown.setAttribute("data-dropdown-type", "ruleType");

    // Create dropdown options based on global ruleTypeOptions array
    for (i = 0; i < RULE_TYPE_OPTIONS.length; i++) {
      const ruleTypeOption = document.createElement("option");
      ruleTypeOption.setAttribute("value", i);
      if (value === RULE_TYPE_OPTIONS[i]) {
        ruleTypeOption.setAttribute("selected", "selected");
      }
      ruleTypeOption.innerText = RULE_TYPE_OPTIONS[i];
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
    input.setAttribute("placeholder", "https://www.example.com");
    if (expression) {
      input.value = expression;
    } else {
      input.value = "";
    }

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
