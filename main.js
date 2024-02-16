import { Comment } from './comment/comment.js'
import { Reply } from './reply/reply.js'
import { CurrentUserReply } from './reply/writeReplyField.js'

const response = await fetch('./data.json')
const data = await response.json()

const globalField = document.querySelector('.comments-area')

data.comments.forEach((commentData) => {
  const mainComment = new Comment(commentData)
  if (data.currentUser.username === commentData.user.username) {
    mainComment.createMainComment(globalField, true)
  } else {
    mainComment.createMainComment(globalField)
  }

  if (commentData.replies.length !== 0) {
    const parentComment = document.getElementById(commentData.id).parentElement

    const repliesArea = document.createElement('div')
    repliesArea.className = 'replies-area'
    repliesArea.setAttribute('id', 'ra-' + commentData.id)
    parentComment.appendChild(repliesArea)

    const repliesLine = document.createElement('div')
    repliesLine.className = 'reply-line'
    repliesArea.appendChild(repliesLine)

    const replies = document.createElement('div')
    replies.className = 'replies'
    replies.setAttribute('id', 'replies-' + commentData.id)
    repliesArea.appendChild(replies)

    commentData.replies.forEach((reply) => {
      const rep = new Reply(reply)
      if (data.currentUser.username === reply.user.username) {
        rep.createReply(replies, true)
      } else {
        rep.createReply(replies)
      }
    })
  }
})

export function currentUserReplyHandler(commentId, replyingTo) {
  const newReply = new CurrentUserReply(data.currentUser)
  const rootComment = document.getElementById(commentId)
  const isReply = rootComment.classList.contains('reply')
  newReply.createFieldForReply(commentId, replyingTo, isReply)
}


function creatingNewComment() {
  const message = document.getElementById('comment-textarea').value.trim()
  if (!message) {
    return
  }
  const id = Math.floor(Math.random() * 1000)

  const commentData = {
    id,
    content: message,
    createdAt: 'now',
    score: 0,
    user: data.currentUser,
    replies: [],
  }
  const comment = new Comment(commentData)
  comment.createMainComment(globalField, true)
  document.getElementById('comment-textarea').value = ''
}

window.creatingNewComment = creatingNewComment
