import { openModal, closeModal } from './modal.js'; // Добавляем импорт
import { likeCard, unlikeCard } from './api.js'; // Импортируем новые функции

export function createCard(newCardData, userId, handleImageClick, handleDeleteCard, handleLikeClick) {
  const templateCard = document.querySelector('#card-template');
  const placesItem = templateCard.content.querySelector('.places__item');
  const card = placesItem.cloneNode(true);
  const cardTitle = card.querySelector('.card__title');
  const cardImage = card.querySelector('.card__image');
  const deleteButton = card.querySelector('.card__delete-button');
  const likeButton = card.querySelector('.card__like-button');
  const likesCount = card.querySelector('.card__likes_score');

  cardTitle.textContent = newCardData.name;
  cardImage.src = newCardData.link;
  cardImage.alt = newCardData.alt;
  likesCount.textContent = newCardData.likes.length;

  if (newCardData.likes.some(like => like._id === userId)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  if (newCardData.owner._id !== userId) {
    deleteButton.style.display = 'none';
  } else {
    deleteButton.addEventListener('click', () => handleDeleteCard(card, newCardData._id));
  }

  cardImage.addEventListener('click', () => handleImageClick(newCardData.name, newCardData.link));
  likeButton.addEventListener('click', () => handleLikeClick(likeButton, newCardData._id, likesCount));

  return card;
}

export function handleLikeClick(likeButton, cardId, likesCount) {
  if (likeButton.classList.contains('card__like-button_is-active')) {
    unlikeCard(cardId)
      .then(updatedCard => {
        likeButton.classList.remove('card__like-button_is-active');
        likesCount.textContent = updatedCard.likes.length;
      })
      .catch(error => {
        console.error('Ошибка при снятии лайка:', error);
      });
  } else {
    likeCard(cardId)
      .then(updatedCard => {
        likeButton.classList.add('card__like-button_is-active');
        likesCount.textContent = updatedCard.likes.length;
      })
      .catch(error => {
        console.error('Ошибка при добавлении лайка:', error);
      });
  }
}

export function handleDeleteCard(card, cardId) {
  const popupDeleteCard = document.querySelector('.popup_type_delete-card');
  openModal(popupDeleteCard);
  
  const confirmButton = popupDeleteCard.querySelector('.popup__button_confirm');
  confirmButton.addEventListener('click', () => {
    fetch(`https://nomoreparties.co/v1/wff-cohort-15/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: '2b1d046a-7a38-44ae-adc1-5d0abf366ad9',
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      card.remove();
      closeModal(popupDeleteCard);
    })
    .catch(error => {
      console.error('Ошибка при удалении карточки:', error);
    });
  });
}
