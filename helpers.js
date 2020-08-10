function createRuleTypeButtonGroup(value) {
  const ruleTypeButtonGroup = document.createElement("div");
  ruleTypeButtonGroup.classList.add("btn-group", "btn-group-toggle", "mb-3");
  ruleTypeButtonGroup.setAttribute("data-toggle", "buttons");
  ruleTypeButtonGroup.setAttribute("data-purpose", "ruleType");

  // Create dropdown options based on RULE_TYPE_OPTIONS array
  for (i = 0; i < RULE_TYPE_OPTIONS.length; i++) {
    const ruleTypeOptionLabel = document.createElement("label");
    ruleTypeOptionLabel.classList.add("btn", "btn-secondary");
    ruleTypeOptionLabel.textContent = RULE_TYPE_OPTIONS[i];

    const ruleTypeOptionInput = document.createElement("input");
    ruleTypeOptionInput.setAttribute("type", "radio");
    ruleTypeOptionInput.setAttribute("name", "options");
    ruleTypeOptionInput.setAttribute("id", "option" + (i + 1));

    if (value === RULE_TYPE_OPTIONS[i]) {
      ruleTypeOptionInput.checked = true;
      ruleTypeOptionLabel.classList.add("active");
    }

    ruleTypeOptionLabel.appendChild(ruleTypeOptionInput);
    ruleTypeButtonGroup.appendChild(ruleTypeOptionLabel);
  }
  return ruleTypeButtonGroup;
}

function createExpressionInput(expression) {
  const inputGroup = document.createElement("div");
  inputGroup.classList.add("input-group", "mb-3");

  const inputGroupPrepend = document.createElement("div");
  inputGroupPrepend.classList.add("input-group-prepend");

  const inputGroupText = document.createElement("span");
  inputGroupText.classList.add("input-group-text");
  inputGroupText.innerText = "https://";
  inputGroupPrepend.appendChild(inputGroupText);

  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("class", "form-control");
  input.setAttribute("placeholder", "www.example.com");
  input.setAttribute("aria-label", "URL");
  input.setAttribute("minlength", "1");
  input.setAttribute("maxlength", "255");
  if (expression) {
    input.value = expression;
  }

  inputGroup.appendChild(inputGroupPrepend);
  inputGroup.appendChild(input);

  return inputGroup;
}

function createMessageInput(message) {
  const inputGroup = document.createElement("div");
  inputGroup.classList.add("input-group", "mb-3");

  const inputGroupPrepend = document.createElement("div");
  inputGroupPrepend.classList.add("input-group-prepend");

  const inputGroupText = document.createElement("span");
  inputGroupText.classList.add("input-group-text");
  inputGroupText.innerText = "Message:";
  inputGroupPrepend.appendChild(inputGroupText);

  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("class", "form-control");
  input.setAttribute("placeholder", "Hi there!");
  input.setAttribute("minlength", "1");
  input.setAttribute("maxlength", "255");
  input.setAttribute("aria-label", "Message");
  if (message) {
    input.value = message;
  }

  inputGroup.appendChild(inputGroupPrepend);
  inputGroup.appendChild(input);
  return inputGroup;
}

function createColorInput(colorType, color) {
  const div = document.createElement("div");
  div.classList.add("mb-3");

  const label = document.createElement("label");
  if (colorType === "textColor") {
    label.setAttribute("for", "textColor");
    label.innerText = "Text color:";
  }
  if (colorType === "backgroundColor") {
    label.setAttribute("for", "backgroundColor");
    label.innerText = "Background color:";
  }

  const input = document.createElement("input");
  if (colorType === "textColor") {
    input.setAttribute("id", "textColor");
  }
  if (colorType === "backgroundColor") {
    input.setAttribute("id", "backgroundColor");
  }
  input.setAttribute("type", "color");
  input.setAttribute("aria-label", "Background color");
  input.setAttribute("width", "50");
  if (color) {
    input.value = color;
  }

  div.appendChild(label);
  div.appendChild(input);
  return div;
}

function createButton(type) {
  if (type === "save") {
    const saveButton = document.createElement("button");
    saveButton.innerText = "Save";
    saveButton.classList.add("btn", "btn-primary", "mb-3");
    saveButton.setAttribute("data-action", "save");
    return saveButton;
  }

  if (type === "remove") {
    const removeButton = document.createElement("button");
    removeButton.innerText = "Remove";
    removeButton.classList.add("btn", "btn-danger", "mb-3");
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
