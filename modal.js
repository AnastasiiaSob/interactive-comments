export function openDeleteModal(id) {
  const modal = document.getElementById("modal");
  modal.classList.add("is-visible");

  document.querySelector(".modal-cancel").addEventListener("click", () => {
    modal.classList.remove("is-visible");
  });
  document.querySelector(".modal-confirm").addEventListener("click", () => {
    modal.classList.remove("is-visible");
    if (document.getElementById(id)) {
      document.getElementById(id).remove();
    }
  });
  document.addEventListener("click", (e) => {
    if (e.target === document.querySelector(".modal.is-visible")) {
      modal.classList.remove("is-visible");
    }
  });
}
