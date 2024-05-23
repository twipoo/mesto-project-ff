export function createCard(initialCard, handleImageClick, handleDeleteCard, handleLikeClick) {
  const templateCard = document.querySelector('#card-template');
  const placesItem = templateCard.content.querySelector('.places__item');
  const card = placesItem.cloneNode(true);
  const cardTitle = card.querySelector('.card__title');
  const cardImage = card.querySelector('.card__image');
  const deleteButton = card.querySelector('.card__delete-button');
  const likeButton = card.querySelector('.card__like-button');

  cardTitle.textContent = initialCard.name;
  cardImage.src = initialCard.link;
  cardImage.alt = initialCard.alt;

  cardImage.addEventListener('click', () => handleImageClick(initialCard.name, initialCard.link));
  deleteButton.addEventListener('click', () => handleDeleteCard(card));
  likeButton.addEventListener('click', () => handleLikeClick(likeButton));

  return card;
}

export function handleLikeClick(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}

export function handleDeleteCard(card) {
  card.remove();
}