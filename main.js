const inputFields = document.querySelectorAll(".inp-field");
const form = document.querySelector("#container-form");
const thankYou = document.querySelector("#container-thankyou");
const cardLabels = document.querySelectorAll(".card-label");

const btnConfirm = document.querySelector("#btn-confirm");
const btnContinue = document.querySelector("#btn-continue");

let num;

// FUNCTIONS

// Name formatting
const formatName = (str) => {
  return `${str
    .toLowerCase()
    .trim()
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ")}`;
};

// Number formatting ????
const formatNumber = (str) => {
  const leer = " ";
  return `${
    str.slice(0, 4) +
    leer +
    str.slice(4, 8) +
    leer +
    str.slice(8, 12) +
    leer +
    str.slice(12, 16)
  }`;
};

const hideErrors = (field) =>
  document.querySelector(`.error-msg-${field}`).classList.add("hidden");

const showErrors = function (field, msg = "Can't be blank") {
  document.querySelector(`.error-msg-${field}`).classList.remove("hidden");
  document.querySelector(`.error-msg-${field}`).textContent = msg;
};

// Dispalying inputted card informations
const displayCardInputs = (field) => {
  if (field.name === "number") {
    document.querySelector(`#card-number-display`).textContent = formatNumber(
      field.value
    );
  }
  document.querySelector(`#card-${field.name}-display`).textContent =
    field.value;
};

// Checking if input is a num or/and if its filled correctly
const checkInput = function (inp, inpMax) {
  if (isNaN(inp.value)) showErrors(inp.id, "Wrong format, numbers only");
  else if (inp.value.length < inpMax)
    showErrors(inp.id, "Please enter all numbers");
  else {
    num++;
    displayCardInputs(inp);
  }
};

// Displaying "thankyou" screen
const displayThankyou = function () {
  form.classList.add("hidden");
  thankYou.classList.remove("hidden");
};

// Resetting input fields, card labels and displaying default form again
const resetForm = function () {
  form.classList.remove("hidden");
  thankYou.classList.add("hidden");

  inputFields.forEach((inp) => (inp.value = ""));

  cardLabels.forEach((label) => {
    label.dataset.name === "number" &&
      (label.textContent = "0000 0000 0000 0000");
    label.dataset.name === "name" && (label.textContent = "JANE APPLEES");
    label.dataset.name === "month" && (label.textContent = "00");
    label.dataset.name === "year" && (label.textContent = "00");
  });
};

// Resetting all errors and checking input again
const checkValidation = function () {
  num = 0;

  inputFields.forEach((inp) => {
    hideErrors(inp.id);
    // When input is empty
    if (!inp.value) {
      showErrors(inp.id);
    } else if (inp.id === "name") {
      const input = formatName(inp.value);
      inp.value = input;
      displayCardInputs(inp);
      num++;
    } else if (inp.id === "number") {
      checkInput(inp, 16);
    } else if (inp.id === "date") {
      checkInput(inp, 2);
    } else if (inp.id === "cvc") {
      checkInput(inp, 3);
    }
  });
};

// EVENTS

// If input is valid displaying "thankyou"
btnConfirm.addEventListener("click", function (e) {
  e.preventDefault();
  checkValidation();
  num === 5 ? displayThankyou() : "";
});

// Resetting everything
btnContinue.addEventListener("click", resetForm);
