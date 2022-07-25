import { openDeleteModal } from "./modal.js";
 import { Comment } from "./comment.js";

export class Reply extends Comment {
    replyingTo;

    constructor(data) {
        super(data);
        this.replyingTo = data.replyingTo;
    }

    createCommentAndUserInfo( parentElement){
        const userImage = document.createElement('img')
            userImage.className = "user-image"
            userImage.setAttribute('src', this.user.image.png)
            parentElement.appendChild(userImage)
    
            const userName = document.createElement('p')
            userName.className = "username"
            userName.innerText = this.user.username
            parentElement.appendChild(userName)
    
            const dateOfComment = document.createElement('p')
            dateOfComment.className = "date-of-comment"
            dateOfComment.innerText = this.createdAt
            parentElement.appendChild(dateOfComment)
    
            const replyButton = document.createElement('button')
            replyButton.innerHTML = '<img src="../images/icon-reply.svg" /> Reply'
            replyButton.className ="standard-transparent"
            replyButton.addEventListener("click", () => {
                super.createFieldForReply()
            })
            parentElement.appendChild(replyButton)
    }

    createReply( parentElement, currentUser = false){
        const commentBox = document.createElement('div')
        const replyElement = document.createElement('div')
        replyElement.className = "reply"
        replyElement.setAttribute('id', this.id)
        commentBox.appendChild(replyElement)
        parentElement.appendChild(commentBox)
    
        super.createScoreSection(replyElement)
        const commentInfo = document.createElement('div')
        commentInfo.className = "user-comment-info"
        replyElement.appendChild(commentInfo)
    
        const replyHeading = document.createElement("div")
        if(currentUser){
            replyHeading.className = "heading-current-user"
            commentInfo.appendChild(replyHeading)
    
            const userImage = document.createElement('img')
            userImage.className = "user-image"
            userImage.setAttribute('src', this.user.image.png)
            replyHeading.appendChild(userImage)
    
            const userName = document.createElement('p')
            userName.className = "username"
            userName.innerText = this.user.username
            replyHeading.appendChild(userName)
    
            const youBadge = document.createElement('div')
            youBadge.className = 'you-badge'
            youBadge.innerText = "you"
            replyHeading.appendChild(youBadge)
    
            const dateOfComment = document.createElement('p')
            dateOfComment.className = "date-of-comment"
            dateOfComment.innerText = this.createdAt
            replyHeading.appendChild(dateOfComment)
    
            const deleteButton = document.createElement('button')
            deleteButton.innerHTML = '<img src="../images/icon-delete.svg" /> Delete'
            deleteButton.className = "delete-transparent"
            deleteButton.addEventListener("click", () => {
                openDeleteModal(this) 
            })
            replyHeading.appendChild(deleteButton)
    
            const editButton = document.createElement('button')
            editButton.innerHTML = '<img src="../images/icon-edit.svg" /> Edit'
            editButton.className = "standard-transparent"
            editButton.addEventListener("click", () => {
                super.editComment() 
            })
            replyHeading.appendChild(editButton)
        } else {
            replyHeading.className = "reply-heading"
            commentInfo.appendChild(replyHeading)
            this.createCommentAndUserInfo( replyHeading)
        }
        super.createCommentText( commentInfo)
    
    }


}