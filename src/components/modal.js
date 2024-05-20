// Функции закрытия модального окна

function closeModal(modal, closeModalEsc) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeModalEsc);
}

function closeModalOverlay(evt, closeModal) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}

function closeModalEsc(evt, closeModal) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".popup_is-opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

// Функции открывания модального окна

function openModalEdit(
  modalEdit,
  profileTitle,
  profileDescription,
  profileName,
  descriptionInput,
  closeModalEsc
) {
  profileName.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  modalEdit.classList.add("popup_is-animated");
  setTimeout(() => {
    modalEdit.classList.add("popup_is-opened");
  }, 10);
  document.addEventListener("keydown", (evt) =>
    closeModalEsc(evt, () => closeModal(modalEdit, closeModalEsc))
  );
}

function openModalNewCard(modalNewCard, closeModalEsc) {
  modalNewCard.classList.add("popup_is-animated");
  setTimeout(() => {
    modalNewCard.classList.add("popup_is-opened");
  }, 10);
  document.addEventListener("keydown", (evt) =>
    closeModalEsc(evt, () => closeModal(modalNewCard, closeModalEsc))
  );
}

function openImageModal(
  modalImage,
  imageElement,
  popupImage,
  popupCaption,
  closeModalEsc
) {
  popupImage.src = imageElement.src;
  popupImage.alt = imageElement.alt;
  popupCaption.textContent = imageElement.alt;
  modalImage.classList.add("popup_is-animated");
  setTimeout(() => {
    modalImage.classList.add("popup_is-opened");
  }, 10);
  document.addEventListener("keydown", (evt) =>
    closeModalEsc(evt, () => closeModal(modalImage, closeModalEsc))
  );
}

export {
  openModalEdit,
  openModalNewCard,
  openImageModal,
  closeModal,
  closeModalOverlay,
  closeModalEsc,
};
