export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error',
  // Новое правило для поля аватара
  avatar: {
    url: {
      invalid: "Введите корректный URL",
      empty: "Вы пропустили это поле"
    }
  }
};