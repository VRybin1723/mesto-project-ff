// Функция открывания модального окна

function openModal(popup) {
  setTimeout(() => {
    popup.classList.add('popup_is-opened');
  }, 10);
  document.addEventListener('keydown', closeByEscape);
  popup.classList.add("popup_is-animated");
}

// Функции закрытия модального окна

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');    
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener('keydown', closeByEscape);
}

export { openModal, closeModal, closeByEscape };