export const validateInput = (input, config) => {
  const { inputErrorClass, errorClass } = config;
  const patterns = {
    name: /^[a-zA-Zа-яА-ЯёЁ\s-]{2,30}$/,
    description: /^[a-zA-Zа-яА-ЯёЁ\s-]{2,200}$/,
    url: /^(https?:\/\/)(www\.)?[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}([\/\w\-.]*)*\/?$/
  };
  const errorMessages = {
    name: {
      pattern: "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы",
      length: "Название должно быть от 2 до 30 символов",
      empty: "Вы пропустили это поле"
    },
    description: {
      pattern: "Описание должно быть от 2 до 200 символов и содержать только буквы, дефисы и пробелы.",
      empty: "Вы пропустили это поле"
    },
    url: {
      invalid: "Введите корректный URL",
      empty: "Вы пропустили это поле"
    },
    'avatar-link': {
      invalid: "Введите корректный URL",
      empty: "Вы пропустили это поле"
    }
  };

  const errorSpan = input.nextElementSibling;
  const value = input.value.trim();
  let errorMessage = '';

  if (!value) {
    errorMessage = errorMessages[input.name]?.empty || 'Вы пропустили это поле';
  } else if (input.name === 'url' && !patterns.url.test(value)) {
    errorMessage = errorMessages.url?.invalid || 'Введите корректный URL';
  } else if (input.name === 'avatar-link' && !patterns.url.test(value)) {  // Изменение здесь
    errorMessage = errorMessages['avatar-link']?.invalid || 'Введите корректный URL';
  } else if (patterns[input.name] && !patterns[input.name].test(value)) {
    errorMessage = errorMessages[input.name]?.pattern || 'Некорректный формат';
  } else if (input.name === 'name' && (value.length < 2 || value.length > 30)) {
    errorMessage = errorMessages.name?.length || 'Название должно быть от 2 до 30 символов';
  }

  if (errorMessage) {
    errorSpan.textContent = errorMessage;
    input.classList.add(inputErrorClass);
    errorSpan.classList.add(errorClass);
  } else {
    errorSpan.textContent = '';
    input.classList.remove(inputErrorClass);
    errorSpan.classList.remove(errorClass);
  }
};
  
  export const toggleSubmitButton = (form, config) => {
    const { submitButtonSelector, inactiveButtonClass } = config;
    const submitButton = form.querySelector(submitButtonSelector);
    const isFormValid = form.checkValidity();
    submitButton.disabled = !isFormValid;
    if (!isFormValid) {
      submitButton.classList.add(inactiveButtonClass);
    } else {
      submitButton.classList.remove(inactiveButtonClass);
    }
  };

    
  export const resetValidation = (form, config) => {
    const { inputSelector, inputErrorClass, errorClass, submitButtonSelector, inactiveButtonClass } = config;
    const inputs = form.querySelectorAll(inputSelector);
    const errorMessages = form.querySelectorAll(`.${errorClass}`);
    const submitButton = form.querySelector(submitButtonSelector);
  
    inputs.forEach(input => {
      input.classList.remove(inputErrorClass);
    });
  
    errorMessages.forEach(span => {
      span.textContent = '';
      span.classList.remove(errorClass);
    });
  
    submitButton.disabled = true;
    submitButton.classList.add(inactiveButtonClass);
  };
  
  export const enableValidation = (config) => {
    const { formSelector, inputSelector } = config;
    const forms = document.querySelectorAll(formSelector);
  
    forms.forEach(form => {
      form.addEventListener('input', (event) => {
        const input = event.target.closest(inputSelector);
        if (input) {
          validateInput(input, config);
          toggleSubmitButton(form, config);
        }
      });
  
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        // Additional form submission logic
      });
    });
  };
  