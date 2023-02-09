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
    const message = document.getElementById("comment-textarea").value;
    if (message) {
      const globalField = document.querySelector(".comments-field");
      const id = Math.floor(Math.floor(Math.random() * 1000));
      const comment = new Comment({
        id: id,
        content: message,
        createdAt: "now",
        score: 0,
        user: this.currentUser,
        replies: [],
      });
      comment.createMainComment(globalField, true);
      document.getElementById("comment-textarea").value = "";
    }
  }

  createSendButton() {
    const sendButton = document.createElement("button");
    sendButton.innerHTML = "SEND";
    sendButton.className = "standard-filled";
    return sendButton;
  }

  writeCommentSection() {
    const writeCommentBox = document.createElement("div");
    writeCommentBox.className = "write-comment-field";
    document.body.append(writeCommentBox);

    const writeComment = document.createElement("div");
    writeComment.className = "write-comment";
    writeCommentBox.append(writeComment);

    this.createUserImageForWriteComment(writeComment);

    this.createCommentInputField(writeComment);
    const sendButton = this.createSendButton();
    sendButton.onclick = () => {
      this.deligateCreatingNewComment();
    };
    writeComment.appendChild(sendButton);
  }
}
