import { checkResponse } from "./utils.js";

const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-14",
  headers: {
    authorization: "8026ba24-3947-401b-ab48-c209fe9bf574",
    "Content-Type": "application/json",
  },
};

// Функция для получения данных пользователя
function getUser() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(checkResponse);
}

// Функция для получения карточек
function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(checkResponse);
}

// Функция обновления данных пользователя
function updateUser(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then(checkResponse);
}

// Функция добовления новой карточки на сервер
function uploadNewCard(placeName, placeLink) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: placeName,
      link: placeLink,
    }),
  }).then(checkResponse);
}

// Функция вызова API для удаления карточки
function apiDeleteCard(cardId) {
  const url = `${config.baseUrl}/cards/${cardId}`;

  return fetch(url, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
}

// Функция для отправки нового аватара на сервер
function updateAvatar(newAvatarUrl) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: newAvatarUrl,
    }),
  }).then(checkResponse);
}

// Функция обработки лайка
function likeCard(cardId, isLiked) {
return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
  method: isLiked ? "DELETE" : "PUT",
  headers: config.headers,
})
  .then(checkResponse);
}

export { apiDeleteCard };
export {
  getUser,
  getCards,
  updateUser,
  uploadNewCard,
  updateAvatar,
  likeCard
};
