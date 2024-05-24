// Функция открывания модального окна

function openModal(popup) {
  setTimeout(() => {
    popup.classList.add('popup_is-opened');
  }, 10);
}

// Функции закрытия модального окна

function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
}

function closeModalOverlay(evt, closeModal) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');    
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

export { openModal, closeModal, closeModalOverlay, closeByEscape };