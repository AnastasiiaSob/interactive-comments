export function openDeleteModal(id) {
  const modal = document.getElementById('modal')

  function closeModal() {
    modal.classList.remove('is-visible')
  }

  function confirmDelete() {
    closeModal()
    const element = document.getElementById(id)
    if (element) {
      element.parentElement.remove()
    }
  }

  function handleClick(event) {
    if (event.target === modal) {
      closeModal()
    }
  }

  modal.classList.add('is-visible')
  document.querySelector('.modal-cancel').addEventListener('click', closeModal)
  document
    .querySelector('.modal-confirm')
    .addEventListener('click', confirmDelete)
  document.addEventListener('click', handleClick)
}
