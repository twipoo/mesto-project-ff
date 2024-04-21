// @todo: Темплейт карточки
const templateCard = document.querySelector('#card-template'); // Выбор Template
// @todo: DOM узлы
const list = document.querySelector('.places__list'); // Выбор элемента ul листа 
const placesItem = templateCard.content.querySelector('.places__item'); // выбор Элемент tempalte. li
// @todo: Функция создания карточки
function createCard(initialCard) {
  const card = placesItem.cloneNode(true);// создаем клон заготовки в перемунную card
  const cardTitle = card.querySelector('.card__title');//выбираем в заготовке title
  const cardImage = card.querySelector('.card__image');// Выбираем в заготовке img
  
  cardTitle.textContent = initialCard.name;
  cardImage.src = initialCard.link;
  cardImage.alt = initialCard.alt;

  // @todo: Функция удаления карточки
  const deleteButton = card.querySelector('.card__delete-button');// выбираем кнопки удаления карточки

  deleteButton.addEventListener('click', function() {// Добавляет слушатель на карту.
      card.remove();
  });
  
  return card;
}
// @todo: Вывести карточки на страницу

function addCards() {
    initialCards.forEach(function(initialCard) {
        const newCard = createCard(initialCard);
        list.appendChild(newCard);
    });
}
addCards();
// Увидел коментарий на коде только после отправки практикум до сих пор не починили. только в историии  видно.











