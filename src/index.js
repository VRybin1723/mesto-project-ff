import "./pages/index.css";
import {
  initialCards,
  createCard,
  deleteCard,
  handleLike,
} from "./components/cards.js";
import {
  openModalEdit,
  openModalNewCard,
  openImageModal,
  closeModal,
  closeModalOverlay,
  closeModalEsc,
} from "./components/modal.js";

// DOM узлы
const places = document.querySelector(".places__list");
const modalEdit = document.querySelector(".popup_type_edit");
const modalNewCard = document.querySelector(".popup_type_new-card");
const modalImage = document.querySelector(".popup_type_image");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileName = modalEdit.querySelector(".popup__input_type_name");
const descriptionInput = modalEdit.querySelector(
  ".popup__input_type_description"
);
const popupImage = modalImage.querySelector(".popup__image");
const popupCaption = modalImage.querySelector(".popup__caption");

// Вывести карточки на страницу
initialCards.forEach(function (cardData) {
  places.append(
    createCard(cardData, deleteCard, handleLike, (img) =>
      openImageModal(modalImage, img, popupImage, popupCaption, closeModalEsc)
    )
  );
});

// Открытие и закрытие модального окна

// Модальное окно Edit
const modalButtonEdit = document.querySelectorAll(".profile__edit-button");
const closeModalButtonEdit = modalEdit.querySelector(".popup__close");

modalButtonEdit.forEach((button) => {
  button.addEventListener("click", () =>
    openModalEdit(
      modalEdit,
      profileTitle,
      profileDescription,
      profileName,
      descriptionInput,
      closeModalEsc
    )
  );
});

closeModalButtonEdit.addEventListener("click", () =>
  closeModal(modalEdit, closeModalEsc)
);
modalEdit.addEventListener("click", (evt) =>
  closeModalOverlay(evt, () => closeModal(modalEdit, closeModalEsc))
);

// Модальное окно NewCard
const modalButtonAdd = document.querySelector(".profile__add-button");
const closeModalButtonNewCard = modalNewCard.querySelector(".popup__close");

modalButtonAdd.addEventListener("click", () =>
  openModalNewCard(modalNewCard, closeModalEsc)
);
closeModalButtonNewCard.addEventListener("click", () =>
  closeModal(modalNewCard, closeModalEsc)
);
modalNewCard.addEventListener("click", (evt) =>
  closeModalOverlay(evt, () => closeModal(modalNewCard, closeModalEsc))
);

// Модальное окно Image
const closeModalButtonImage = modalImage.querySelector(".popup__close");

closeModalButtonImage.addEventListener("click", () =>
  closeModal(modalImage, closeModalEsc)
);
modalImage.addEventListener("click", (evt) =>
  closeModalOverlay(evt, () => closeModal(modalImage, closeModalEsc))
);

// Редактирование профиля

const formElement = modalEdit.querySelector(".popup__form");

function handleFormSubmit(evt) {
  evt.preventDefault();
  const nameValue = profileName.value;
  const jobValue = descriptionInput.value;
  profileTitle.textContent = nameValue;
  profileDescription.textContent = jobValue;
  closeModal(modalEdit, closeModalEsc);
}

formElement.addEventListener("submit", handleFormSubmit);

// Добавление карточки

const newPlace = document.forms["new-place"];

function createNewCard(placeName, placeLink) {
  const newCard = createCard({ name: placeName, link: placeLink }, deleteCard);
  places.prepend(newCard);
}

function handleNewPlaceSubmit(evt) {
  evt.preventDefault();
  const placeName = newPlace.elements["place-name"].value;
  const placeLink = newPlace.elements["link"].value;
  createNewCard(placeName, placeLink);
  closeModal(modalNewCard, closeModalEsc);
  newPlace.reset();
}

newPlace.addEventListener("submit", handleNewPlaceSubmit);