const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

// Функция для получения данных пользователя
function getUser() {
  return fetch("https://nomoreparties.co/v1/wff-cohort-14/users/me", {
    headers: {
      authorization: "8026ba24-3947-401b-ab48-c209fe9bf574",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      profileTitle.textContent = result.name;
      profileDescription.textContent = result.about;
      profileImage.style.backgroundImage = `url(${result.avatar})`;
      return result._id;
    })
    .catch((err) => {
      console.error(
        "Ошибка. Запрос на получение данных пользователя не выполнен:",
        err
      );
    });
}

// Функция для получения карточек
function getCards() {
  return fetch("https://nomoreparties.co/v1/wff-cohort-14/cards", {
    headers: {
      authorization: "8026ba24-3947-401b-ab48-c209fe9bf574",
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Ошибка HTTP: ${res.status}`);
      }
      return res.json();
    })
    .catch((err) => {
      console.error("Ошибка. Запрос на получение карточек не выполнен:", err);
    });
}

// Функция обновления данных пользователя
function updateUser(name, about) {
  return fetch("https://nomoreparties.co/v1/wff-cohort-14/users/me", {
    method: "PATCH",
    headers: {
      authorization: "8026ba24-3947-401b-ab48-c209fe9bf574",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  });
}

// Функция добовления новой карточки на сервер
function uploadNewCard(placeName, placeLink) {
  return fetch("https://nomoreparties.co/v1/wff-cohort-14/cards", {
    method: "POST",
    headers: {
      authorization: "8026ba24-3947-401b-ab48-c209fe9bf574",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: placeName,
      link: placeLink,
    }),
  }).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  });
}

// Функция вызова API для удаления карточки
function apiDeleteCard(cardId) {
  const url = `https://nomoreparties.co/v1/wff-cohort-14/cards/${cardId}`;

  return fetch(url, {
    method: "DELETE",
    headers: {
      authorization: "8026ba24-3947-401b-ab48-c209fe9bf574",
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
  });
}

// Функция для отправки нового аватара на сервер
function updateAvatar(newAvatarUrl) {
  return fetch("https://nomoreparties.co/v1/wff-cohort-14/users/me/avatar", {
    method: "PATCH",
    headers: {
      authorization: "8026ba24-3947-401b-ab48-c209fe9bf574",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: newAvatarUrl,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      profileImage.style.backgroundImage = `url(${data.avatar})`;
    })
    .catch((err) => {
      console.error("Ошибка при обновлении аватара:", err);
    });
}

export { apiDeleteCard };
export { getUser, getCards, updateUser, uploadNewCard, updateAvatar };
