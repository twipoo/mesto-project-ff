// @todo: Темплейт карточки
const templateCard = document.querySelector('#card-template'); // Выбор Template
// @todo: DOM узлы
const list = document.querySelector('.places__list'); // Выбор элемента ul листа 
const placesItem = templateCard.content.querySelector('.places__item'); // выбор Элемент tempalte. li
// @todo: Функция создания карточки
function createCard(initialCard, deleteCard) {
    const card = placesItem.cloneNode(true);
    const cardTitle = card.querySelector('.card__title');
    const cardImage = card.querySelector('.card__image');
    const deleteButton = card.querySelector('.card__delete-button');

    cardTitle.textContent = initialCard.name;
    cardImage.src = initialCard.link;
    cardImage.alt = initialCard.alt;

    deleteButton.addEventListener('click', deleteCard);

    return card;
}
// @todo: Вывести карточки на страницу
function addCards() {
    initialCards.forEach(function(initialCard) {
        const newCard = createCard(initialCard, function() {
            newCard.remove();
        });
        list.appendChild(newCard);
    });
}
addCards();











