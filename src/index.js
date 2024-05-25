import "./pages/index.css";
import { initialCards, createCard,  deleteCard } from "./components/cards.js";
import { openModal, closeModal, closeByEscape } from "./components/modal.js";

// DOM узлы
const places = document.querySelector(".places__list");
const modalEdit = document.querySelector(".popup_type_edit");
const modalNewCard = document.querySelector(".popup_type_new-card");
const modalImage = document.querySelector(".popup_type_image");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileName = modalEdit.querySelector(".popup__input_type_name");
const descriptionInput = modalEdit.querySelector(".popup__input_type_description");
const popupImage = modalImage.querySelector(".popup__image");
const popupCaption = modalImage.querySelector(".popup__caption");

// Вывести карточки на страницу
initialCards.forEach(function (cardData) {
  places.append(
    createCard(cardData, deleteCard, handleLike, (img) => {
      openModal(modalImage); 
      openImageModal(modalImage, img, popupImage, popupCaption, closeByEscape);
    })
  );
});

// Функция обработки лайка
function handleLike(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}

// Открытие и закрытие модального окна

// Закрытие окон по крестику и оверлею
const popups = document.querySelectorAll('.popup')

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_is-opened')) {
            closeModal(popup)
        }
        if (evt.target.classList.contains('popup__close')) {
          closeModal(popup)
        };
    })
})

// Модальное окно Edit
const modalButtonEdit = document.querySelector(".profile__edit-button");

function openModalEdit(modalEdit, profileTitle,  profileDescription, profileName, descriptionInput) {
  profileName.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
}

modalButtonEdit.addEventListener("click", () => {
  openModal(modalEdit);  
  openModalEdit(modalEdit, profileTitle, profileDescription, profileName, descriptionInput);
});

// Модальное окно NewCard
const modalButtonAdd = document.querySelector(".profile__add-button");

modalButtonAdd.addEventListener("click", () => {
  openModal(modalNewCard); 
});

// Модальное окно Image
function openImageModal(modalImage, imageElement, popupImage, popupCaption) {
  popupImage.src = imageElement.src;
  popupImage.alt = imageElement.alt;
  popupCaption.textContent = imageElement.alt;
}

// Редактирование профиля

const formElement = modalEdit.querySelector(".popup__form");

function  handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const nameValue = profileName.value;
  const jobValue = descriptionInput.value;
  profileTitle.textContent = nameValue;
  profileDescription.textContent = jobValue;
  closeModal(modalEdit, closeByEscape);
}

formElement.addEventListener("submit", handleProfileFormSubmit);

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
  closeModal(modalNewCard, closeByEscape);
  newPlace.reset();
}

newPlace.addEventListener("submit", handleNewPlaceSubmit);