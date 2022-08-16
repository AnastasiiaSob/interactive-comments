import { Reply } from "../reply/reply.js";
import { Comment } from "./comment.js";
import { GenericComment } from "./genericComment.js";

export class CurrentUserComment extends GenericComment{
    currentUser;

    constructor(currentUser){
        super(currentUser);
        this.currentUser = currentUser;
    }

    createUserImageForWriteComment(parentElement){
        const userImage = document.createElement('img')
        userImage.className = "user-image-write-comment"
        userImage.setAttribute('src', this.currentUser.image.png)
        parentElement.appendChild(userImage)
    }

    createCommentInputField(parentElement){
        const textArea = document.createElement('textarea')
        textArea.className = 'comment-input'
        textArea.placeholder = "Add a comment..."
        textArea.setAttribute('id', 'comment-textarea')
        parentElement.appendChild(textArea)
    }

    deligateCreatingNewComment(){
        const message = document.getElementById('comment-textarea').value
        if(message){
            const globalField = document.querySelector(".comments-field");
            const id = Math.floor(Math.floor(Math.random() * 1000));
            super.createComment(globalField, id, 0, message, "now", this.currentUser , null, true)
            document.getElementById('comment-textarea').value = '' 
        }
    }

    createNewReply(mainComment, commentId){
        const content = document.getElementById('comment-textarea').value
        if(content){
            const id = Math.floor(Math.floor(Math.random() * 1000));
            const reply = new Reply({id: id, content: content, createdAt: "now", score:0, user:this.currentUser });
           // const mainComment = document.getElementById(commentId).parentElement;
           
            reply.createRepliesArea(mainComment, commentId)
            
            const parentElement = document.getElementById("replies-"+commentId)
            reply.createReply(parentElement, true)
            
            // super.createComment(globalField, true);
            document.getElementById("comment-textarea").value = "";
        }
        
    }

    createSendButton(){
        const sendButton = document.createElement('button')
        sendButton.innerHTML = 'SEND'
        sendButton.className = "standard-filled"
        return sendButton;
    }

    writeCommentSection(){
        const writeCommentBox = document.createElement('div')
        writeCommentBox.className = 'write-comment-field'
        document.body.append(writeCommentBox)
    
        const writeComment = document.createElement('div')
        writeComment.className = 'write-comment'
        writeCommentBox.append(writeComment)
    
        this.createUserImageForWriteComment(writeComment);
    
        this.createCommentInputField(writeComment);
        const sendButton = this.createSendButton();
        sendButton.onclick = () => {
            this.deligateCreatingNewComment()
        }         
        writeComment.appendChild(sendButton)
        
    }

    createFieldForReply(commentId) {
		const mainComment = document.getElementById(commentId).parentElement;
        mainComment.setAttribute('id', "reply-field-"+commentId )

		const replyBox = document.createElement("div");
		replyBox.className = "write-reply-field";
        replyBox.setAttribute("id","write-reply-field-"+commentId)
		mainComment.appendChild(replyBox);

		const writeComment = document.createElement("div");
		writeComment.className = "write-comment";
		replyBox.appendChild(writeComment);

        this.createUserImageForWriteComment(writeComment);
        this.createCommentInputField(writeComment)

        const sendButton = this.createSendButton();
        sendButton.onclick = () => {
            if(mainComment.children.className("replies-area")){
                console.log("There is an area! ")
            } else {
                console.log("There is no area yet")
            }
            this.createNewReply(mainComment, commentId)
            document.getElementById("write-reply-field-"+commentId).remove();

        }
                
        writeComment.appendChild(sendButton)
	}

}