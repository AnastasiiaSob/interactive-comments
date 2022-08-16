import { openDeleteModal } from "../modal.js";
import { currentUserReplyHandler } from "../main.js"
import { GenericComment } from "./genericComment.js";

export class Comment extends GenericComment {
	id;
	content;
	createdAt;
	score;
	user;
	replies;
	currentUser;

	constructor(data) {
		super(data);
    	this.id = data.id;
		this.content = data.content;
		this.createdAt = data.createdAt;
		this.score = data.score;
		this.user = data.user;
		this.replies = data.replies;
	}

	
	createMainComment(parentElement) {

		super.createComment(parentElement, this.id, this.score, this.content, this.createdAt, this.user)	
	}


}
