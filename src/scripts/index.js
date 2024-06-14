import "../pages/index.css"; // css

import {
  createCard,
  handleLikeClick,
} from "../components/card.js";
import {
  openModal,
  closeModal,
  closePopupByOverlay,
} from "../components/modal.js";
import {
  enableValidation,
  clearValidation,
} from "../components/validation.js";
import {
  getCardsInfo,
  getUserData,
  sendUserData,
  createNewCardsOnServer,
  updateAvatar,
  deleteCard,
} from "../components/api.js";
import { validationConfig } from "../components/validationConfig.js";

  const popupEditProfile = document.querySelector(".popup_type_edit");
  const popupNewCard = document.querySelector(".popup_type_new-card");
  const popupImage = document.querySelector(".popup_type_image");
  const popupDeleteCard = document.querySelector('.popup_type_delete-card');
  const profileEditButton = document.querySelector(".profile__edit-button");
  const profileAddButton = document.querySelector(".profile__add-button");
  const popupCloseButtons = document.querySelectorAll(".popup__close");
  const popups = document.querySelectorAll(".popup");

  const formEditProfile = document.forms["edit-profile"];
  const nameInput = formEditProfile.querySelector(".popup__input_type_name");
  const jobInput = formEditProfile.querySelector(".popup__input_type_description");
  const profileName = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");

  const formNewCard = document.forms["new-place"];
  const placeNameInput = formNewCard.querySelector(".popup__input_type_card-name");
  const placeLinkInput = formNewCard.querySelector(".popup__input_type_url");
  const list = document.querySelector(".places__list");
  const submitButtonEditProfile = formEditProfile.querySelector(".popup__button");
  const submitButtonNewCard = formNewCard.querySelector(".popup__button");

  const popupChangeAvatar = document.querySelector(".popup_type_change-avatar");
  const avatarEditIcon = document.querySelector(".profile__avatar-edit-icon");
  const profileAvatar = document.querySelector(".profile__image"); 
  const formChangeAvatar = document.forms["change-avatar"];
  const avatarLinkInput = formChangeAvatar.querySelector(".popup__input_type_avatar-link");
  const submitButtonChangeAvatar = formChangeAvatar.querySelector(".popup__button");
  const profileImageElement = document.getElementById("profileImage");

  let currentCard = null;
  let currentCardId = null;

  const confirmButton = popupDeleteCard.querySelector('.popup__button_confirm');


  profileAvatar.addEventListener("click", () => {
    openModal(popupChangeAvatar);
    formChangeAvatar.reset();
    clearValidation(formChangeAvatar, validationConfig);
  });

  formChangeAvatar.addEventListener('submit', (evt) => {
    evt.preventDefault();
    submitButtonChangeAvatar.textContent = 'Сохранение...';
    updateAvatar(avatarLinkInput.value)
      .then((data) => {
        profileImageElement.style.backgroundImage = `url(${data.avatar})`;
        closeModal(popupChangeAvatar);
      })
      .catch((error) => {
        console.error('Ошибка при обновлении аватара:', error);
      })
      .finally(() => {
        submitButtonChangeAvatar.textContent = 'Сохранить';
      });
  });

  profileEditButton.addEventListener("click", () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    openModal(popupEditProfile);
    clearValidation(formEditProfile, validationConfig);
  });

  formEditProfile.addEventListener("submit", (evt) => {
    evt.preventDefault();
    submitButtonEditProfile.textContent = "Сохранение...";
    sendUserData(nameInput.value, jobInput.value)
      .then((userData) => {
        profileName.textContent = userData.name;
        profileDescription.textContent = userData.about;
        closeModal(popupEditProfile);
      })
      .catch((error) => {
        console.error("Ошибка при обновлении профиля:", error);
      })
      .finally(() => {
        submitButtonEditProfile.textContent = "Сохранить";
      });
  });

  profileAddButton.addEventListener("click", () => {
    openModal(popupNewCard);
    formNewCard.reset();
    clearValidation(formNewCard, validationConfig);
  });

  formNewCard.addEventListener('submit', (evt) => {
    evt.preventDefault();
    submitButtonNewCard.textContent = 'Сохранение...';
    const newCardData = {
      name: placeNameInput.value,
      link: placeLinkInput.value,
    };
    createNewCardsOnServer(newCardData.name, newCardData.link)
      .then((cardData) => {
        const newCard = createCard(cardData, userId, handleImageClick, handleDeleteCard, handleLikeClick);
        list.prepend(newCard);
        closeModal(popupNewCard);
      })
      .catch((error) => {
        console.error('Ошибка при добавлении новой карточки:', error);
      })
      .finally(() => {
        submitButtonNewCard.textContent = 'Сохранить';
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

  function handleDeleteCard(card, cardId) {
    currentCard = card;
    currentCardId = cardId;
    openModal(popupDeleteCard);
  }

  confirmButton.addEventListener('click', () => {
    if (currentCard && currentCardId) {
      deleteCard(currentCardId)
        .then(() => {
          currentCard.remove();
          closeModal(popupDeleteCard);
        })
        .catch(error => {
          console.error('Ошибка при удалении карточки:', error);
        });
    }
  });

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

  Promise.all([getUserData(), getCardsInfo()])
    .then(([userData, cards]) => {
      userId = userData._id;
      const name = userData.name;
      const about = userData.about;
      const avatar = userData.avatar;
      profileImageElement.style.backgroundImage = `url(${avatar})`;
      profileName.textContent = name;
      profileDescription.textContent = about;
      addInitialCards(cards, userId);
    })
    .catch((err) => {
      console.error("Ошибка при загрузке данных:", err);
    });

