import "../pages/index.css"; // css
import {
  createCard,
  handleLikeClick,
  handleDeleteCard,
} from "../components/card.js";
import {
  openModal,
  closeModal,
  closePopupByOverlay,
} from "../components/modal.js";
import {
  validateInput,
  toggleSubmitButton,
  resetValidation,
  enableValidation,
} from "../components/validation.js";
import {
  getCardsInfo,
  getUserData,
  sandUserData,
  createNewCardsOnServer,
  updateAvatar,
} from "../components/api.js";
import { validationConfig } from "../components/validationConfig.js";

document.addEventListener("DOMContentLoaded", () => {
  const popupEditProfile = document.querySelector(".popup_type_edit");
  const popupNewCard = document.querySelector(".popup_type_new-card");
  const popupImage = document.querySelector(".popup_type_image");
  const profileEditButton = document.querySelector(".profile__edit-button");
  const profileAddButton = document.querySelector(".profile__add-button");
  const popupCloseButtons = document.querySelectorAll(".popup__close");
  const popups = document.querySelectorAll(".popup");

  const formEditProfile = document.forms["edit-profile"];
  const nameInput = formEditProfile.querySelector(".popup__input_type_name");
  const jobInput = formEditProfile.querySelector(
    ".popup__input_type_description"
  );
  const profileName = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");

  const formNewCard = document.forms["new-place"];
  const placeNameInput = formNewCard.querySelector(
    ".popup__input_type_card-name"
  );
  const placeLinkInput = formNewCard.querySelector(".popup__input_type_url");
  const list = document.querySelector(".places__list");
  const submitButtonEditProfile =
    formEditProfile.querySelector(".popup__button");
  const submitButtonNewCard = formNewCard.querySelector(".popup__button");

  const popupChangeAvatar = document.querySelector(".popup_type_change-avatar");
  const avatarEditIcon = document.querySelector(".profile__avatar-edit-icon");
  const formChangeAvatar = document.forms["change-avatar"];
  const avatarLinkInput = formChangeAvatar.querySelector(".popup__input_type_avatar-link");
  const submitButtonChangeAvatar = formChangeAvatar.querySelector(".popup__button");
  const profileImageElement = document.getElementById("profileImage");

  avatarEditIcon.addEventListener("click", () => {
    openModal(popupChangeAvatar);
    formChangeAvatar.reset();
    resetValidation(formChangeAvatar, validationConfig); // Сброс валидации при открытии формы
    toggleSubmitButton(formChangeAvatar, validationConfig); // Деактивация кнопки при открытии формы
  });

  // Добавление события input
  formChangeAvatar.addEventListener('input', (event) => {
    const input = event.target.closest(validationConfig.inputSelector);
    if (input) {
      validateInput(input, validationConfig);
      toggleSubmitButton(formChangeAvatar, validationConfig);
    }
  });

  formChangeAvatar.addEventListener('submit', (evt) => {
    evt.preventDefault();
    submitButtonChangeAvatar.textContent = 'Сохранение...'; // Изменяем текст кнопки
    updateAvatar(avatarLinkInput.value)
      .then((data) => {
        profileImageElement.style.backgroundImage = `url(${data.avatar})`;
        closeModal(popupChangeAvatar);
      })
      .catch((error) => {
        console.error('Ошибка при обновлении аватара:', error);
      })
      .finally(() => {
        submitButtonChangeAvatar.textContent = 'Сохранить'; // Возвращаем текст кнопки
      });
  });
  
  

  profileEditButton.addEventListener("click", () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    openModal(popupEditProfile);
    resetValidation(formEditProfile, validationConfig); // Сброс валидации при открытии формы
    toggleSubmitButton(formEditProfile, validationConfig); // Активируем/деактивируем кнопку при открытии формы
  });

  formEditProfile.addEventListener("submit", (evt) => {
    evt.preventDefault();
    submitButtonEditProfile.textContent = "Сохранение..."; // Изменяем текст кнопки
    sandUserData()
      .then(() => {
        profileName.textContent = nameInput.value;
        profileDescription.textContent = jobInput.value;
        closeModal(popupEditProfile);
      })
      .catch((error) => {
        console.error("Ошибка при обновлении профиля:", error);
      })
      .finally(() => {
        submitButtonEditProfile.textContent = "Сохранить"; // Возвращаем текст кнопки
      });
  });

  profileAddButton.addEventListener("click", () => {
    openModal(popupNewCard);
    formNewCard.reset();
    resetValidation(formNewCard, validationConfig); // Сброс валидации при открытии формы
    toggleSubmitButton(formNewCard, validationConfig); // Деактивация кнопки при открытии формы
  });

  formNewCard.addEventListener('submit', (evt) => {
    evt.preventDefault();
    submitButtonNewCard.textContent = 'Сохранение...'; // Изменяем текст кнопки
    
    const newCardData = {
      name: placeNameInput.value,
      link: placeLinkInput.value,
      alt: placeNameInput.value,
    };
    
    createNewCardsOnServer(newCardData)
      .then((cardData) => {
        const newCard = createCard(cardData, userId, handleImageClick, handleDeleteCard, handleLikeClick);
        list.prepend(newCard);
        closeModal(popupNewCard);
        formNewCard.reset();
        resetValidation(formNewCard, validationConfig); // Сброс валидации после добавления карточки
      })
      .catch((error) => {
        console.error('Ошибка при добавлении новой карточки:', error);
      })
      .finally(() => {
        submitButtonNewCard.textContent = 'Сохранить'; // Возвращаем текст кнопки
      });
  });

  function handleImageClick(name, link) {
    const popupImagePicture = popupImage.querySelector(".popup__image");
    const popupImageCaption = popupImage.querySelector(".popup__caption");
    popupImagePicture.src = link;
    popupImagePicture.alt = name;
    popupImageCaption.textContent = name;
    openModal(popupImage);
  }

  popups.forEach((popup) => {
    popup.addEventListener("mousedown", closePopupByOverlay);
  });

  popupCloseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const popup = button.closest(".popup");
      closeModal(popup);
    });
  });

  function addInitialCards(cards, userId) {
    cards.forEach((cardData) => {
      const newCard = createCard(
        cardData,
        userId,
        handleImageClick,
        handleDeleteCard,
        handleLikeClick
      );
      list.appendChild(newCard);
    });
  }

  let userId = null;
  enableValidation(validationConfig);

  // Используем Promise.all для получения данных пользователя и карточек
  Promise.all([getUserData(), getCardsInfo()])
    .then(([userData, cards]) => {
      userId = userData._id;
      const name = userData.name;
      const about = userData.about;
      const avatar = userData.avatar;
      // Обновляем данные профиля
      const profileImageElement = document.getElementById("profileImage");
      profileImageElement.style.backgroundImage = `url(${avatar})`;
      profileName.textContent = name;
      profileDescription.textContent = about;
      // Добавляем карточки
      addInitialCards(cards, userId);
    })
    .catch((err) => {
      console.error("Ошибка при загрузке данных:", err);
    });
});
