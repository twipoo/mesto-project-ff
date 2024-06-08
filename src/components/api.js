const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-15',
  headers: {
    authorization: '2b1d046a-7a38-44ae-adc1-5d0abf366ad9',
    'Content-Type': 'application/json'
  }
};

// Обработка ответа сервера
const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

// Получение информации о карточках
export const getCardsInfo = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
  .then(checkResponse);
};

// Получение данных пользователя
export const getUserData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
  .then(checkResponse);
};

// Обновление данных профиля
export const sendUserData = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ name, about }),
  })
  .then(checkResponse);
};

// Создание новой карточки
export const createNewCardsOnServer = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({ name, link }),
  })
  .then(checkResponse);
};

// Лайкнуть карточку
export const likeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
  .then(checkResponse);
};

// Убрать лайк с карточки
export const unlikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(checkResponse);
};

// Обновление аватара пользователя
export const updateAvatar = (avatarUrl) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ avatar: avatarUrl }),
  })
  .then(checkResponse);
};
