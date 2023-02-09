import { GenericComment } from '../utils/genericComment.js'

export class Comment extends GenericComment {
  id
  content
  createdAt
  score
  user
  replies

  constructor(data) {
    super(data)
    this.id = data.id
    this.content = data.content
    this.createdAt = data.createdAt
    this.score = data.score
    this.user = data.user
    this.replies = data.replies
  }

  createMainComment(parentElement, currentUser = false) {
    super.createComment(parentElement, this.id, currentUser)
  }
}
