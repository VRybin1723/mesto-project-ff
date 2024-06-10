// Валидация форм

// Добавление обработчиков всем формам
const enableValidation = (settings) => {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
    formList.forEach((formElement) => {
      setEventListeners(formElement, settings);
    });
  };

const isValid = (formElement, inputElement, settings) => {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }
  
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, settings);
    } else {
      hideInputError(formElement, inputElement, settings);
    }
  };


// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
  };

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = "";
  };

// Проверка наличия невалидных полей
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// Функция отключения кнопки
const toggleButtonState = (inputList, buttonElement, settings) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(settings.inactiveButtonClass);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(settings.inactiveButtonClass);
    }
  };

// Слушатель события для всех полей
const setEventListeners = (formElement, settings) => {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, settings);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        isValid(formElement, inputElement, settings);
        toggleButtonState(inputList, buttonElement, settings);
      });
    });
  };
  
  // Очистка ошибок валидации
  const clearValidation = (formElement, settings, clearForm = false) => {
      const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
      inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, settings);
        if (clearForm) {
          inputElement.value = "";
        }
      });
      const buttonElement = formElement.querySelector(settings.submitButtonSelector);
      buttonElement.disabled = true;
      buttonElement.classList.add(settings.inactiveButtonClass);
  };

export {
  isValid,
  showInputError,
  hideInputError,
  hasInvalidInput,
  toggleButtonState,
  setEventListeners,
  clearValidation,
  enableValidation,
};
