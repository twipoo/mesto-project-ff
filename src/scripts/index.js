import {getUserInfo} from '../components/api.js';
import { initialCards } from '../components/cards.js'; // массив исходных карточек 
import '../pages/index.css'; // css 
import { createCard, handleLikeClick, handleDeleteCard } from '../components/card.js'; 
import { openModal, closeModal, closePopupByOverlay } from '../components/modal.js';

getUserInfo();

document.addEventListener('DOMContentLoaded', () => { 
  const popupEditProfile = document.querySelector('.popup_type_edit'); 
  const popupNewCard = document.querySelector('.popup_type_new-card'); 
  const popupImage = document.querySelector('.popup_type_image'); 
  const profileEditButton = document.querySelector('.profile__edit-button'); 
  const profileAddButton = document.querySelector('.profile__add-button'); 
  const popupCloseButtons = document.querySelectorAll('.popup__close'); 
  const popups = document.querySelectorAll('.popup'); 

  const formEditProfile = document.forms['edit-profile']; 
  const nameInput = formEditProfile.querySelector('.popup__input_type_name'); 
  const jobInput = formEditProfile.querySelector('.popup__input_type_description'); 
  const profileName = document.querySelector('.profile__title'); 
  const profileDescription = document.querySelector('.profile__description'); 

  const formNewCard = document.forms['new-place']; 
  const placeNameInput = formNewCard.querySelector('.popup__input_type_card-name'); 
  const placeLinkInput = formNewCard.querySelector('.popup__input_type_url'); 
  const list = document.querySelector('.places__list'); 

  profileEditButton.addEventListener('click', () => { 
    nameInput.value = profileName.textContent; 
    jobInput.value = profileDescription.textContent; 
    openModal(popupEditProfile); 
  }); 

  formEditProfile.addEventListener('submit', (evt) => { 
    evt.preventDefault(); 
    profileName.textContent = nameInput.value; 
    profileDescription.textContent = jobInput.value; 
    closeModal(popupEditProfile); 
  }); 

  profileAddButton.addEventListener('click', () => openModal(popupNewCard)); 

  formNewCard.addEventListener('submit', (evt) => { 
    evt.preventDefault(); 
    const newCardData = { 
      name: placeNameInput.value, 
      link: placeLinkInput.value, 
      alt: placeNameInput.value 
    }; 
    const newCard = createCard(newCardData, handleImageClick, handleDeleteCard, handleLikeClick); 
    list.prepend(newCard); 
    closeModal(popupNewCard); 
    formNewCard.reset(); 
  }); 

  function handleImageClick(name, link) { 
    const popupImagePicture = popupImage.querySelector('.popup__image'); 
    const popupImageCaption = popupImage.querySelector('.popup__caption'); 
    popupImagePicture.src = link; 
    popupImagePicture.alt = name; 
    popupImageCaption.textContent = name; 
    openModal(popupImage); 
  } 

  popups.forEach((popup) => { 
    popup.addEventListener('mousedown', closePopupByOverlay); 
  }); 

  popupCloseButtons.forEach((button) => { 
    button.addEventListener('click', () => { 
      const popup = button.closest('.popup'); 
      closeModal(popup); 
    }); 
  }); 

  function addInitialCards() { 
    initialCards.forEach((initialCard) => { 
      const newCard = createCard(initialCard, handleImageClick, handleDeleteCard, handleLikeClick); 
      list.appendChild(newCard); 
    }); 
  } 

  addInitialCards(); 
});
