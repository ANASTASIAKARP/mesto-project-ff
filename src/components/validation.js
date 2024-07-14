export { enableValidation, clearValidation };

//ф-я, которая добавляет класс с ошибкой
const showInputError = (validationConfig, formElement, formInput) => {
  const errorElement = formElement.querySelector(`.${formInput.id}-error`);
  formInput.classList.add(validationConfig.inputErrorClass); //добавляет инпуту класс с красной обводкой
  errorElement.textContent = formInput.validationMessage;
  // Показываем сообщение об ошибке
  errorElement.classList.add("popup__error_visible");
};

//ф-я, которая удаляет класс с ошибкой
const hideInputError = (formElement, formInput, validationConfig) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${formInput.id}-error`);
  formInput.classList.remove(validationConfig.inputErrorClass); //удаляет инпуту класс с красной обводкой
  errorElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.textContent = "";
};

//ф-я, которая проверяет валидность поля
const checkInputValidity = (formElement, formInput, validationConfig) => {
  if (formInput.validity.valueMissing)
    formInput.setCustomValidity(formInput.dataset.errorEmpty); //если пустое
  else if (formInput.validity.patternMismatch)
    formInput.setCustomValidity(formInput.dataset.errorPattern);
  //соответствует патерну
  else if (formInput.validity.typeMismatch)
    formInput.setCustomValidity(formInput.dataset.errorType);
  //соответствует значению type
  else formInput.setCustomValidity("");
  if (!formInput.validity.valid)
    showInputError(validationConfig, formElement, formInput);
  else hideInputError(formElement, formInput, validationConfig);
};

const setEventListeners = (validationConfig, popupForm) => {
  const inputList = Array.from(
    popupForm.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = popupForm.querySelector(
    validationConfig.submitButtonSelector
  );
  inputList.forEach((formInput) => {
    formInput.addEventListener("input", () => {
      checkInputValidity(popupForm, formInput, validationConfig);
      toggleButtonState(validationConfig, inputList, buttonElement);
    });
  });
};

const enableValidation = (validationConfig) => {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formList.forEach((popupForm) => {
    popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(validationConfig, popupForm);
  });
};

const clearValidation = (validationConfig, form) => {
  const errorlist = Array.from(
    form.querySelectorAll(validationConfig.errorSelector)
  );
  const inputList = Array.from(
    form.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = form.querySelector(
    validationConfig.submitButtonSelector
  );
  form.reset();
  errorlist.forEach((error) => {
    error.classList.remove(validationConfig.errorClass);
    error.textContent = "";
  });
  inputList.forEach((formInput) =>
    formInput.classList.remove(validationConfig.inputErrorClass)
  );
  toggleButtonState(validationConfig, inputList, buttonElement);
};

//Ф-Я "блокировки" ищет невалидные поля
const hasInvalidInput = (inputList) => {
  return inputList.some((formInput) => {
    return !formInput.validity.valid;
  });
};

//ф-я состояния кнопки переключения
const toggleButtonState = (validationConfig, inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
};
