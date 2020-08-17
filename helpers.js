function createTypeButtonGroup(value) {
  const typeButtonGroup = document.createElement("div");
  typeButtonGroup.classList.add("btn-group", "btn-group-toggle", "mb-3");
  typeButtonGroup.setAttribute("data-toggle", "buttons");
  typeButtonGroup.setAttribute("data-purpose", "type");

  // Create dropdown options based on RULE_TYPE_OPTIONS array
  for (i = 0; i < RULE_TYPE_OPTIONS.length; i++) {
    const typeOptionLabel = document.createElement("label");
    typeOptionLabel.classList.add("btn", "btn-secondary");
    typeOptionLabel.textContent = RULE_TYPE_OPTIONS[i];

    const typeOptionInput = document.createElement("input");
    typeOptionInput.setAttribute("type", "radio");
    typeOptionInput.setAttribute("name", "options");
    typeOptionInput.setAttribute("id", "option" + (i + 1));

    if (value === RULE_TYPE_OPTIONS[i]) {
      typeOptionInput.checked = true;
      typeOptionLabel.classList.add("active");
    }

    typeOptionLabel.appendChild(typeOptionInput);
    typeButtonGroup.appendChild(typeOptionLabel);
  }
  return typeButtonGroup;
}

function createExpressionInput(expression) {
  const inputGroup = document.createElement("div");
  inputGroup.classList.add("input-group", "mb-3");

  const inputGroupPrepend = document.createElement("div");
  inputGroupPrepend.classList.add("input-group-prepend");

  const inputGroupText = document.createElement("span");
  inputGroupText.classList.add("input-group-text");
  inputGroupText.innerText = "String:";
  inputGroupPrepend.appendChild(inputGroupText);

  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("class", "form-control");
  input.setAttribute("placeholder", "https://www.example.com");
  input.setAttribute("aria-label", "URL");
  input.setAttribute("minlength", "1");
  input.setAttribute("maxlength", "255");
  input.setAttribute("data-input", "expression");
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
  input.setAttribute("data-input", "message");
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
  const input = document.createElement("input");
  input.setAttribute("type", "color");
  input.setAttribute("width", "50");

  if (colorType === "textColor") {
    label.setAttribute("for", "textColor");
    label.innerText = "Text color:";
    input.setAttribute("data-input", "textColor");
    input.setAttribute("aria-label", "Text color");
    input.defaultValue = DEFAULT_TEXT_COLOR;
  }
  if (colorType === "backgroundColor") {
    label.setAttribute("for", "backgroundColor");
    label.innerText = "Background color:";
    input.setAttribute("data-input", "backgroundColor");
    input.setAttribute("aria-label", "Background color");
    input.defaultValue = DEFAULT_BACKGROUND_COLOR;
  }
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
    saveButton.classList.add("btn", "btn-primary", "mb-3", "mt-3");
    saveButton.setAttribute("data-action", "save");
    return saveButton;
  }

  if (type === "remove") {
    const removeButton = document.createElement("button");
    removeButton.innerText = "Remove";
    removeButton.classList.add("btn", "btn-danger", "mb-3");
    removeButton.setAttribute("data-action", "remove", "mt-3");
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

function getCurrentNumberOfRules() {
  return parseInt(document.querySelectorAll(".rule").length, 10);
}
