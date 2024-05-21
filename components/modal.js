// modal.js

export function openModal(modal) {
  modal.classList.add("popup_is-animated");
  modal.style.visibility = "visible";
  modal.style.opacity = "1";
  modal.style.pointerEvents = "all";
  document.addEventListener("keydown", handleEscClose);
}

export function closeModal(modal) {
  modal.style.opacity = "0";
  modal.style.pointerEvents = "none";
  document.removeEventListener("keydown", handleEscClose);
}

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(".popup_is-animated");
    closeModal(openModal);
  }
}

//////
