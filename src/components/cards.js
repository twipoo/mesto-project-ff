export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
      alt: "Зеленый масив гор с озером по центру , и немного снегу вокруг озера",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
      alt: "Не замершая река в заснеженном лесу",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
      alt: "Вечерний вид на спальный район, советской постройки.",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
      alt: "Фото у подножья вулкана, где еще растет зелень",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
      alt: "Желеная дорога скрывающия в горизон. По обе стороны лес",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
      alt: "Скалистый берег Байкала зимой",
    }
];



export function getCardsFromServer (){
  return fetch('GET https://nomoreparties.co/v1/wff-cohort-15/cards', {
headers: {
  authorization: '2b1d046a-7a38-44ae-adc1-5d0abf366ad9'
}
})
.then(res => res.json())
.then((result) => {
  console.log(result);
});
}