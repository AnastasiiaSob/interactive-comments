import { Reply } from "./reply.js";

export class CurrentUserComment{
    currentUser;

    constructor(currentUser){
        this.currentUser = currentUser
    }

    writeCommentSection(){
        const writeCommentBox = document.createElement('div')
        writeCommentBox.className = 'write-comment-field'
        document.body.append(writeCommentBox)
    
        const writeComment = document.createElement('div')
        writeComment.className = 'write-comment'
        writeCommentBox.append(writeComment)
    
        const userImage = document.createElement('img')
        userImage.className = "user-image-write-comment"
        userImage.setAttribute('src', this.image.png)
        writeComment.appendChild(userImage)
    
        const textArea = document.createElement('textarea')
        textArea.className = 'comment-input'
        textArea.placeholder = "Add a comment..."
        textArea.setAttribute('id', 'comment-textarea')
        writeComment.appendChild(textArea)
    
        const sendButton = document.createElement('button')
        sendButton.innerHTML = 'SEND'
        sendButton.className = "standard-filled"
        sendButton.onclick = function() {
            const message = document.getElementById('comment-textarea').value
            if(message){
            const comment = new Comment({
                id: Math.floor(Math.floor(Math.random() * 1000)), content: message, createdAt: "now", score: 0,
                user: this, replies: []
            })
            console.log("New comment created: ", comment)
            const globalField = document.querySelector(".comments-field");
            comment.createMainComment(globalField, currentUser)
            document.getElementById('comment-textarea').value = ''        }
        }
        writeComment.appendChild(sendButton)
    }

    createFieldForReply(obj) {
		const mainC = document.getElementById(obj.id).parentElement;
		const replyBox = document.createElement("div");
		replyBox.className = "write-reply-field";
		mainC.appendChild(replyBox);
		const writeComment = document.createElement("div");
		writeComment.className = "write-comment";
		replyBox.appendChild(writeComment);

		const userImage = document.createElement("img");
		userImage.className = "user-image-write-comment";
		userImage.setAttribute('src', this.currentUser.image.png)
		writeComment.appendChild(userImage);

		const textArea = document.createElement("textarea");
		textArea.className = "comment-input";
		textArea.placeholder = "Add a comment...";
		textArea.setAttribute("id", "comment-textarea");
		writeComment.appendChild(textArea);

		const sendButton = document.createElement("button");
		sendButton.innerHTML = "SEND";
		sendButton.className = "standard-filled";
		sendButton.addEventListener =
			("click",
			() => {
				const message = document.getElementById("comment-textarea").value;
				if (message) {
					const reply = new Reply({});
					// const comment = new Comment({
					//     id: Math.floor(Math.floor(Math.random() * 1000)), content: message, createdAt: "now", score: 0,
					//     user: currentUser, replies: []
					// })
					console.log("New comment created: ", reply);
					const globalField = document.querySelector(".comments-field");
					comment.createMainComment(globalField, true);
					document.getElementById("comment-textarea").value = "";
				}
			});

		writeComment.appendChild(sendButton);
	}

}