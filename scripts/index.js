// @todo: Темплейт карточки
const templateCard = document.querySelector('#card-template'); // Выбор Template
// @todo: DOM узлы
const list = document.querySelector('.places__list'); // Выбор элемента ul листа 
const places__item = templateCard.content.querySelector('.places__item'); // выбор Элемент tempalte. li
const nameCard = templateCard.content.querySelector('.card__title'); //выбор Card Title в li
const img = templateCard.content.querySelector('.card__image'); // выбор img
// @todo: Функция создания карточки
function addCards (){
    initialCards.forEach(function (initialCard) {
        nameCard.textContent = initialCard.name;
        img.src = initialCard.link;
        img.alt = initialCard.alt;
        let cloneCardPattern = places__item.cloneNode(true);
        list.appendChild(cloneCardPattern);
// @todo: Функция удаления карточки
        const buttonsDell = document.querySelectorAll('.card__delete-button');// выбор кнопок удаления
        function delitecard (e){
          const currentButton =e.currentTarget;
          currentButton.parentElement.remove();
          }
          buttonsDell.forEach(button => {
            button.addEventListener('click', delitecard)
          })
    })
    }
// @todo: Вывести карточки на страницу
addCards ();
