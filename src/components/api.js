export function getCardsInfo() {
  return fetch("https://nomoreparties.co/v1/wff-cohort-15/cards", {
    headers: {
      authorization: "2b1d046a-7a38-44ae-adc1-5d0abf366ad9",
    },
  }).then((res) => res.json());
}

export function getUserData() {
  return fetch("https://nomoreparties.co/v1/wff-cohort-15/users/me", {
    headers: {
      authorization: "2b1d046a-7a38-44ae-adc1-5d0abf366ad9",
    },
  }).then((handleResponse) => handleResponse.json());
}

// sand to server info profile

export function sandUserData() {
  const formEditProfile = document.forms["edit-profile"];
  const nameInput = formEditProfile.querySelector(".popup__input_type_name");
  const jobInput = formEditProfile.querySelector(
    ".popup__input_type_description"
  );

  return fetch(`https://nomoreparties.co/v1/wff-cohort-15/users/me`, {
    method: "PATCH",
    headers: {
      authorization: "2b1d046a-7a38-44ae-adc1-5d0abf366ad9",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: `${nameInput.value}`,
      about: `${jobInput.value}`,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Ошибка при обновлении профиля:", error);
    });
}


// upload new card

export function createNewCardsOnServer(newCardData) {
  return fetch("https://nomoreparties.co/v1/wff-cohort-15/cards", {
    method: "POST",
    headers: {
      authorization: "2b1d046a-7a38-44ae-adc1-5d0abf366ad9",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: newCardData.name,
      link: newCardData.link,
    })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });
}

// Лайкнуть карточку
export function likeCard(cardId) {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-15/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: '2b1d046a-7a38-44ae-adc1-5d0abf366ad9',
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });
}

// Убрать лайк с карточки
export function unlikeCard(cardId) {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-15/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: '2b1d046a-7a38-44ae-adc1-5d0abf366ad9',
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });
}


export function updateAvatar(avatarUrl) {
  return fetch("https://nomoreparties.co/v1/wff-cohort-15/users/me/avatar", {
    method: "PATCH",
    headers: {
      authorization: "2b1d046a-7a38-44ae-adc1-5d0abf366ad9",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: avatarUrl,
    }),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });
}
