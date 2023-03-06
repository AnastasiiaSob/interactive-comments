import { currentUserReplyHandler } from '../main.js'
import { openDeleteModal } from '../modal.js'

export class GenericComment {
  id
  content
  createdAt
  score
  user
  replyingTo
  replies

  constructor(data) {
    this.id = data.id
    this.content = data.content
    this.createdAt = data.createdAt
    this.score = data.score
    this.user = data.user
    this.replies = data.replies
    this.replyingTo = data.replyingTo
  }

  editComment() {
    const newText = this.getNewText()
    const updateCommentButton = this.createUpdateButton()
    updateCommentButton.addEventListener('click', () => {
      this.updateCommentText(updateCommentButton, newText)
    })
    document
      .getElementById(this.id)
      .appendChild(updateCommentButton)
      .scrollIntoView()
    document.getElementById(this.id).classList.add('editMode' + this.id)
  }

  getNewText() {
    const textToBeEdited = document
      .getElementById(this.id)
      .querySelector('.user-comment-info').lastChild
    const newTextArea = document.createElement('textarea')
    newTextArea.value = textToBeEdited.textContent
    newTextArea.placeholder = 'Add a comment...'
    newTextArea.classList.add('edit-comment')
    textToBeEdited.replaceWith(newTextArea)
    return newTextArea
  }

  updateCommentText(updateButton, newText) {
    const updatedBox = document.createElement('div')
    updatedBox.innerHTML = newText.value
    updatedBox.classList.add('comment-text')
    newText.replaceWith(updatedBox)
    updateButton.style.display = 'none'
    document.getElementById(this.id).classList.remove('editMode' + this.id)
  }

  createUpdateButton() {
    const updateCommentButton = document.createElement('button')
    updateCommentButton.classList.add('standard-filled update')
    updateCommentButton.innerText = 'UPDATE'
    return updateCommentButton
  }

  createScoreSection(parentElement) {
    const scoreElement = document.createElement('div')
    scoreElement.classList.add('comment-score')
    parentElement.appendChild(scoreElement)

    this.createUpVoteButton(scoreElement)

    const voteNumber = document.createElement('p')
    voteNumber.classList.add('vote-number')
    voteNumber.setAttribute('id', 'score-' + this.id)
    voteNumber.innerText = this.score
    scoreElement.appendChild(voteNumber)

    this.createDownVoteButton(scoreElement)
  }

  createUpVoteButton(scoreElement) {
    const upVoteButton = document.createElement('button')
    upVoteButton.innerHTML =
      '<svg class= "vote-icon" width="14" height="13" xmlns="http://www.w3.org/2000/svg"> <path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"/> <svg/>'
    upVoteButton.classList.add('vote-button')
    upVoteButton.addEventListener('click', () => {
      this.score += 1
      document.getElementById('score-' + this.id).innerHTML = this.score
    })
    scoreElement.appendChild(upVoteButton)
  }

  createDownVoteButton(commentScore) {
    const downVoteButton = document.createElement('button')
    downVoteButton.innerHTML =
      '<svg class= "vote-icon" width="11" height="3" xmlns="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg"> <path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"/> <svg/>'
    downVoteButton.classList.add('vote-button')
    downVoteButton.onclick = () => {
      this.score -= 1
      document.getElementById('score-' + this.id).innerHTML = this.score
    }
    commentScore.appendChild(downVoteButton)
  }

  createUserimage(parentElement) {
    const userImage = document.createElement('img')
    userImage.classList.add('user-image')
    userImage.setAttribute('src', this.user.image.png)
    parentElement.appendChild(userImage)
  }

  createUsername(parentElement) {
    const userName = document.createElement('p')
    userName.classList.add('username')
    userName.innerText = this.user.username
    parentElement.appendChild(userName)
  }

  createDateOfComment(parentElement) {
    const dateOfComment = document.createElement('p')
    dateOfComment.classList.add('date-of-comment')
    dateOfComment.innerText = this.createdAt
    parentElement.appendChild(dateOfComment)
  }

  createReplyButton(parentElement) {
    const replyButton = document.createElement('button')
    replyButton.innerHTML = `<svg class="reply-icon" 
      width="14" 
      height="13" 
      xmlns="http://www.w3.org/2000/svg" 
      xmlns="http://www.w3.org/2000/svg"> 
      <path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"/> 
      </svg> 
      <span class="label">Reply</span>
       `
    replyButton.className = 'standard-transparent'
    parentElement.appendChild(replyButton)
    replyButton.addEventListener('click', () => {
      if (document.getElementById('write-field-' + this.id) == null) {
        const repTo = this.user.username
        currentUserReplyHandler(this.id, repTo)
      }
    })
  }

  createBadgeForCurrentUser(parentElement) {
    const youBadge = document.createElement('div')
    youBadge.classList.add('you-badge')
    youBadge.innerText = 'you'
    parentElement.appendChild(youBadge)
  }

  createDeleteButton(parentElement) {
    const deleteButton = document.createElement('button')
    deleteButton.innerHTML =
      `<svg class="delete-icon" 
      width="12" 
      height="14" 
      xmlns="http://www.w3.org/2000/svg" 
      xmlns="http://www.w3.org/2000/svg"> 
      <path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"/> 
      </svg> 
      <span class="label">Delete</span>`
    deleteButton.classList.add('delete-transparent')
    deleteButton.addEventListener('click', () => openDeleteModal(this.id))
    parentElement.appendChild(deleteButton)
  }

  createEditButton(parentElement) {
    const editButton = document.createElement('button')
    editButton.innerHTML =
      `<svg class="edit-icon" 
      width="14" 
      height="14" 
      xmlns="http://www.w3.org/2000/svg" 
      xmlns="http://www.w3.org/2000/svg"> 
      <path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z"/> 
      </svg> 
      <span class="label">Edit</span>`
    editButton.classList.add('standard-transparent')
    editButton.onclick = () => {
      if (!document.querySelector('.editMode' + this.id))
        this.editComment(this.id)
    }
    parentElement.appendChild(editButton)
  }

  createCommentAndUserInfo(parentElement, isCurrentUser) {
    this.createUserimage(parentElement)
    this.createUsername(parentElement)

    if (isCurrentUser) {
      this.createBadgeForCurrentUser(parentElement)
    }

    this.createDateOfComment(parentElement)

    if (isCurrentUser) {
      this.createDeleteButton(parentElement)
      this.createEditButton(parentElement)
    } else {
      this.createReplyButton(parentElement)
    }
  }

  createCommentText(parentElement) {
    const commentText = document.createElement('div')
    commentText.className = 'comment-text'
    if (this.replyingTo) {
      commentText.innerHTML = `@${this.replyingTo} `
    }
    commentText.innerText += this.content
    parentElement.appendChild(commentText)
  }

  createComment(parentElement, id, isCurrentUser) {
    const mainComment = this.createCommentBox(parentElement)

    this.createScoreSection(mainComment)

    const commentInfo = document.createElement('div')
    commentInfo.className = 'user-comment-info'
    mainComment.appendChild(commentInfo)

    const commentHeading = document.createElement('div')

    if (isCurrentUser) {
      commentHeading.className = 'heading-current-user'
    } else {
      commentHeading.className = 'comment-heading'
    }
    mainComment.setAttribute('id', id)
    commentInfo.appendChild(commentHeading)

    this.createCommentAndUserInfo(commentHeading, isCurrentUser)
    this.createCommentText(commentInfo)

    if (isCurrentUser) mainComment.scrollIntoView()
  }

  createCommentBox(parentElement) {
    const commentBox = document.createElement('div')
    const mainComment = document.createElement('div')
    mainComment.className = 'main-comment'
    commentBox.appendChild(mainComment)
    parentElement.appendChild(commentBox)
    return mainComment
  }
}
