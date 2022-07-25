import { openDeleteModal } from "./modal.js";
import { blablaReply } from "./main.js"

export class Comment {
	id;
	content;
	createdAt;
	score;
	user;
	replies;
    currentUser;

	constructor(data) {
    	this.id = data.id;
		this.content = data.content;
		this.createdAt = data.createdAt;
		this.score = data.score;
		this.user = data.user;
		this.replies = data.replies;
	}

	// get id(){
	//     return this.id
	// }

	// /**
	//  * @param {string} id
	//  */
	// set id(id){
	//     if(id === ''){
	//         throw new Error("id can't be empty")
	//     }
	//     this.id = id;
	// }

	// get content(){
	//     return this.content
	// }

	// /**
	//  * @param {string} content
	//  */
	// set content(content){
	//     if(content === ''){
	//         throw new Error("content can't be empty")
	//     }
	//     this.content = content;
	// }

	// get createdAt(){
	//     return this.createdAt
	// }

	// /**
	//  * @param {string} createdAt
	//  */
	// set createdAt(createdAt){
	//     if(createdAt === ''){
	//         throw new Error("createdAt can't be empty")
	//     }
	//     this.createdAt = createdAt;
	// }

	// get score(){
	//     return this.score
	// }

	// /**
	//  * @param {number} score
	//  */
	// set score(score){
	//     if(score === ''){
	//         throw new Error("score can't be empty")
	//     }
	//     this.score = score;
	// }

	// get user(){
	//     return this.user
	// }

	// /**
	//  * @param {Object} user
	//  */
	// set user(user){
	//     if(user === ''){
	//         throw new Error("user can't be empty")
	//     }
	//     this.user = user;
	// }

	// get replies(){
	//     return this.replies
	// }

	// /**
	//  * @param {Array} replies
	//  */
	// set replies(replies){
	//     if(replies === ''){
	//         throw new Error("replies can't be empty")
	//     }
	//     this.replies = replies;
	// }

	editComment() {
		if (!document.querySelector(".editMode" + this.id)) {
			const textToBeEdited = document
				.getElementById(this.id)
				.querySelector(".user-comment-info").lastChild;
			const newTextArea = document.createElement("textarea");
			newTextArea.value = textToBeEdited.textContent;
			newTextArea.placeholder = "Add a comment...";
			newTextArea.className = "edit-comment";
			textToBeEdited.replaceWith(newTextArea);
			const applyNewText = document.createElement("button");
			applyNewText.className = "standard-filled update";
			applyNewText.innerText = "UPDATE";
			applyNewText.addEventListener("click", () => {
				const editedText = document
					.getElementById(this.id)
					.querySelector(".user-comment-info").lastChild;
				const updatedBox = document.createElement("div");
				updatedBox.innerHTML = editedText.value;
				updatedBox.className = "comment-text";
				editedText.replaceWith(updatedBox);
				applyNewText.style.display = "none";
				document.getElementById(this.id).classList.remove("editMode" + this.id);
			});
			document
				.getElementById(this.id)
				.appendChild(applyNewText)
				.scrollIntoView();
			document.getElementById(this.id).classList.add("editMode" + this.id);
		}
	}

	createScoreSection(parentElement) {
		const commentScore = document.createElement("div");
		commentScore.className = "comment-score";
		parentElement.appendChild(commentScore);
		const upVoteButton = document.createElement("button");
		upVoteButton.innerHTML = '<img src="../images/icon-plus.svg" />';
		upVoteButton.className = "vote-button";
		upVoteButton.addEventListener("click", () => {
			this.score += 1;
			document.getElementById("score-" + this.id).innerHTML = this.score;
		});
		commentScore.appendChild(upVoteButton);
		const voteNumber = document.createElement("p");
		voteNumber.className = "vote-number";
		voteNumber.setAttribute("id", "score-" + this.id);
		voteNumber.innerText = this.score;
		commentScore.appendChild(voteNumber);
		const downVoteButton = document.createElement("button");
		downVoteButton.innerHTML = '<img src="../images/icon-minus.svg" />';
		downVoteButton.className = "vote-button";
		downVoteButton.onclick = () => {
			this.score -= 1;
			document.getElementById("score-" + this.id).innerHTML = this.score;
		};
		commentScore.appendChild(downVoteButton);
	}

	
	createCommentAndUserInfo(parentElement, currentUser) {
		const userImage = document.createElement("img");
		userImage.className = "user-image";
		userImage.setAttribute("src", this.user.image.png);
		parentElement.appendChild(userImage);

		const userName = document.createElement("p");
		userName.className = "username";
		userName.innerText = this.user.username;
		parentElement.appendChild(userName);

		if (Object.keys(currentUser).length) {
			const youBadge = document.createElement("div");
			youBadge.className = "you-badge";
			youBadge.innerText = "you";
			parentElement.appendChild(youBadge);
		}

		const dateOfComment = document.createElement("p");
		dateOfComment.className = "date-of-comment";
		dateOfComment.innerText = this.createdAt;
		parentElement.appendChild(dateOfComment);

		if (Object.keys(currentUser).length) {
			const deleteButton = document.createElement("button");
			deleteButton.innerHTML = '<img src="../images/icon-delete.svg" /> Delete';
			deleteButton.className = "delete-transparent";
			deleteButton.addEventListener("click", () => {
				openDeleteModal(this);
			});
			parentElement.appendChild(deleteButton);

			const editButton = document.createElement("button");
			editButton.innerHTML = '<img src="../images/icon-edit.svg" /> Edit';
			editButton.className = "standard-transparent";
			editButton.onclick = () => {
				this.editComment();
			};
			parentElement.appendChild(editButton);
		} else {
			const replyButton = document.createElement("button");
			replyButton.innerHTML = '<img src="../images/icon-reply.svg" /> Reply';
			replyButton.className = "standard-transparent";
			replyButton.addEventListener("click", () => {
                console.log("Current user un click: ", currentUser)
                blablaReply(this)
				// this.createFieldForReply(currentUser);
			});
			parentElement.appendChild(replyButton);
		}
	}

	createCommentText(parentElement) {
		const commentText = document.createElement("div");
		commentText.className = "comment-text";
		if (this.replyingTo) {
			commentText.innerHTML = `@${this.replyingTo} `;
		}
		commentText.innerText += this.content;
		parentElement.appendChild(commentText);
	}

	createMainComment(parentElement, currentUser = {}) {
		const commentBox = document.createElement("div");
		const mainComment = document.createElement("div");
		mainComment.className = "main-comment";
		commentBox.appendChild(mainComment);
		parentElement.appendChild(commentBox);

		this.createScoreSection(mainComment);

		const commentInfo = document.createElement("div");
		commentInfo.className = "user-comment-info";
		mainComment.appendChild(commentInfo);

		const commentHeading = document.createElement("div");
		if (Object.keys(currentUser).length) {
			commentHeading.className = "heading-current-user";
            this.currentUser = this.user;
            console.log("This current user: ", this.currentUser)
            console.log("And this: ", this)
		} else {
			commentHeading.className = "comment-heading";
		}
		mainComment.setAttribute("id", this.id);
		commentInfo.appendChild(commentHeading);

		this.createCommentAndUserInfo(commentHeading, currentUser);
		this.createCommentText(commentInfo);
		if (Object.keys(currentUser).length) {
			mainComment.scrollIntoView();
		}
	}
}
