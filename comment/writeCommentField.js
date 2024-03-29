import { GenericComment } from "../utils/genericComment.js";
import { Comment } from "./comment.js";

export class CurrentUserComment extends GenericComment {
  currentUser;

  constructor(currentUser) {
    super(currentUser);
    this.currentUser = currentUser;
  }

  createUserImageForWriteComment(parentElement) {
    const userImage = document.createElement("img");
    userImage.className = "user-image-write-comment";
    userImage.setAttribute("src", this.currentUser.image.png);
    parentElement.appendChild(userImage);
  }

  createCommentInputField(parentElement) {
    const textArea = document.createElement("textarea");
    textArea.className = "comment-input";
    textArea.placeholder = "Add a comment...";
    textArea.setAttribute("id", "comment-textarea");
    parentElement.appendChild(textArea);
  }

  deligateCreatingNewComment() {
    const message = document.getElementById("comment-textarea").value.trim();
    if (!message) {
      return;
    }
    const globalField = document.querySelector(".comments-area");
    const id = Math.floor(Math.random() * 1000);
    const commentData = {
      id,
      content: message,
      createdAt: "now",
      score: 0,
      user: this.currentUser,
      replies: [],
    };
    const comment = new Comment(commentData);
    comment.createMainComment(globalField, true);
    document.getElementById("comment-textarea").value = "";
  }

}
