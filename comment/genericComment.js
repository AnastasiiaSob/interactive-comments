import { currentUserReplyHandler } from "../main.js";
import { openDeleteModal } from "../modal.js";

export class GenericComment {
    id;
	content;
	createdAt;
	score;
	user;
	replies;
	currentUser;

    constructor(data){
		this.id = data.id;
		this.content = data.content;
		this.createdAt = data.createdAt;
		this.score = data.score;
		this.user = data.user;
		this.replies = data.replies;
    }

    editComment() {
		const newText = this.getNewText();
		const updateCommentButton = this.createUpdateButton();
		updateCommentButton.addEventListener("click", () => {
			this.updateCommentText(updateCommentButton, newText)
		});
		document
			.getElementById(this.id)
			.appendChild(updateCommentButton)
			.scrollIntoView();
		document.getElementById(this.id).classList.add("editMode" + this.id);
	}

	getNewText(){
		const textToBeEdited = document
			.getElementById(this.id)
			.querySelector(".user-comment-info").lastChild;
		const newTextArea = document.createElement("textarea");
		newTextArea.value = textToBeEdited.textContent;
		newTextArea.placeholder = "Add a comment...";
		newTextArea.className = "edit-comment";
		textToBeEdited.replaceWith(newTextArea);
		return newTextArea;
	}

	updateCommentText(updateButton, newText){
		const updatedBox = document.createElement("div");
		updatedBox.innerHTML = newText.value;
		updatedBox.className = "comment-text";
		newText.replaceWith(updatedBox);
		updateButton.style.display = "none";
		document.getElementById(this.id).classList.remove("editMode" + this.id);
	}

	createUpdateButton(){
		const updateCommentButton = document.createElement("button");
		updateCommentButton.className = "standard-filled update";
		updateCommentButton.innerText = "UPDATE";
		return updateCommentButton;
	}

	createScoreSection(parentElement) {
		const scoreElement = document.createElement("div");
		scoreElement.className = "comment-score";
		parentElement.appendChild(scoreElement);

		this.createUpVoteButton(scoreElement);

		const voteNumber = document.createElement("p");
		voteNumber.className = "vote-number";
		voteNumber.setAttribute("id", "score-" + this.id);
		voteNumber.innerText = this.score;
		scoreElement.appendChild(voteNumber);

		this.createDownVoteButton(scoreElement);
	}

	createUpVoteButton(scoreElement){
		const upVoteButton = document.createElement("button");
		upVoteButton.innerHTML = '<img src="../images/icon-plus.svg" />';
		upVoteButton.className = "vote-button";
		upVoteButton.addEventListener("click", () => {
			this.score += 1;
			document.getElementById("score-" + this.id).innerHTML = this.score;
		});
		scoreElement.appendChild(upVoteButton);
	}

	createDownVoteButton(commentScore){
		const downVoteButton = document.createElement("button");
		downVoteButton.innerHTML = '<img src="../images/icon-minus.svg" />';
		downVoteButton.className = "vote-button";
		downVoteButton.onclick = () => {
			this.score -= 1;
			document.getElementById("score-" + this.id).innerHTML = this.score;
		};
		commentScore.appendChild(downVoteButton);
	}

	createUserimage(parentElement){
		const userImage = document.createElement("img");
		userImage.className = "user-image";
		userImage.setAttribute("src", this.user.image.png);
		parentElement.appendChild(userImage);
	}

	createUsername(parentElement){
		const userName = document.createElement("p");
		userName.className = "username";
		userName.innerText = this.user.username;
		parentElement.appendChild(userName);
	}

	createDateOfComment(parentElement){
		const dateOfComment = document.createElement("p");
		dateOfComment.className = "date-of-comment";
		dateOfComment.innerText = this.createdAt;
		parentElement.appendChild(dateOfComment);
	}

	createReplyButton(parentElement){
		const replyButton = document.createElement("button");
		replyButton.innerHTML = '<img src="../images/icon-reply.svg" /> Reply';
		replyButton.className = "standard-transparent";
		replyButton.addEventListener("click", () => currentUserReplyHandler(this.id));
		parentElement.appendChild(replyButton);
	}

	createBadgeForCurrentUser(parentElement){
		const youBadge = document.createElement("div");
		youBadge.className = "you-badge";
		youBadge.innerText = "you";
		parentElement.appendChild(youBadge);
	}

	createDeleteButton(parentElement){
		const deleteButton = document.createElement("button");
		deleteButton.innerHTML = '<img src="../images/icon-delete.svg" /> Delete';
		deleteButton.className = "delete-transparent";
		deleteButton.addEventListener("click", () => openDeleteModal(this.id));
		parentElement.appendChild(deleteButton);
	}

	createEditButton(parentElement){
		const editButton = document.createElement("button");
		editButton.innerHTML = '<img src="../images/icon-edit.svg" /> Edit';
		editButton.className = "standard-transparent";
		editButton.onclick = () => {
			if (!document.querySelector(".editMode" + this.id)) 
				this.editComment(this.id);
		};
		parentElement.appendChild(editButton);
	}
	
	createCommentAndUserInfo(parentElement, isCurrentUser) {
		this.createUserimage(parentElement);
		this.createUsername(parentElement);

		if (isCurrentUser) {
			this.createBadgeForCurrentUser(parentElement)
		}

		this.createDateOfComment(parentElement)

		if (isCurrentUser) {	
			this.createDeleteButton(parentElement);
			this.createEditButton(parentElement)	
		} else {
			this.createReplyButton(parentElement)
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

	setDataForNewComment(id, score, content, createdAt, user, replyingTo){
		this.id = id;
		this.score = score;
		this.content = content;
		this.createdAt = createdAt;
		this.user = user;
		this.replyingTo = replyingTo;
	}

	createComment(parentElement, id, score, content, createdAt, user , replyingTo = null, isCurrentUser = false) {
		this.setDataForNewComment(id, score, content, createdAt, user, replyingTo)
		const mainComment = this.createCommentBox(parentElement)

		this.createScoreSection(mainComment);

		const commentInfo = document.createElement("div");
		commentInfo.className = "user-comment-info";
		mainComment.appendChild(commentInfo);

		const commentHeading = document.createElement("div");

		if (isCurrentUser) {
			commentHeading.className = "heading-current-user";
		} else {
			commentHeading.className = "comment-heading";
		}
		mainComment.setAttribute("id", id);
		commentInfo.appendChild(commentHeading);

		this.createCommentAndUserInfo(commentHeading, isCurrentUser);
		this.createCommentText(commentInfo);

		if (isCurrentUser) 
			mainComment.scrollIntoView();	
	}

	createCommentBox(parentElement){
		const commentBox = document.createElement("div");
		const mainComment = document.createElement("div");
		mainComment.className = "main-comment";
		commentBox.appendChild(mainComment);
		parentElement.appendChild(commentBox);
		return mainComment;
	}
}