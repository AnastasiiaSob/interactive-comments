import { GenericComment } from "../utils/genericComment.js";
import { Reply } from "./reply.js";

export class CurrentUserReply extends GenericComment {
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

  createNewReply(mainComment, commentId, isSmallReply, replyingTo) {
    const content = document.getElementById("comment-textarea").value.trim();
    if (!content) {
      return;
    }
    const id = Math.floor(Math.random() * 1000);
    const replyData = {
      id,
      content,
      createdAt: "now",
      score: 0,
      user: this.currentUser,
      replyingTo,
    };
    const reply = new Reply(replyData);
    const repliesList = document.getElementById("replies-" + commentId);
    reply.createReply(isSmallReply ? mainComment : repliesList, true);
    document.getElementById("comment-textarea").value = "";
  }

  createSendButton() {
    const sendButton = document.createElement("button");
    sendButton.innerHTML = "SEND";
    sendButton.className = "standard-filled";
    return sendButton;
  }

  createNewReplyWithArea(mainComment, commentId, replyingTo) {
    const content = document.getElementById("comment-textarea").value;
    if (!content) return;
  
    const id = Math.floor(Math.random() * 1000);
    const reply = new Reply({
      id,
      content,
      createdAt: "now",
      score: 0,
      user: this.currentUser,
      replyingTo,
    });
  
    reply.createRepliesArea(mainComment, commentId);
    const repliesList = document.getElementById(`replies-${commentId}`);
    reply.createReply(repliesList, true);
  
    document.getElementById("comment-textarea").value = "";
  }
  

  deleteInputField(commentId, isReply) {
    if (isReply) {
      document.getElementById("write-field-reply-" + commentId).remove();
    } else {
      document.getElementById("write-field-" + commentId).remove();
    }
  }

  createFieldForReply(commentId, replyingTo, writingReply = false) {
    const mainComment = document.getElementById(commentId).parentElement;
    const writeComment = document.createElement("div");
    if (writingReply) {
      writeComment.className = "write-reply";
      writeComment.setAttribute("id", "write-field-reply-" + commentId);
    } else {
      writeComment.className = "write-comment";
      writeComment.setAttribute("id", "write-field-" + commentId);
    }
    mainComment.appendChild(writeComment);

    this.createUserImageForWriteComment(writeComment);
    this.createCommentInputField(writeComment);

    const sendButton = this.createSendButton();
    sendButton.onclick = () => {
      if (
        mainComment.parentElement.className == "replies" ||
        document.getElementById("ra-" + commentId) !== null
      ) {
        this.createNewReply(
          mainComment.parentElement,
          commentId,
          writingReply,
          replyingTo
        );
      } else {
        this.createNewReplyWithArea(mainComment, commentId, replyingTo);
      }
      this.deleteInputField(commentId, writingReply);
      document.getElementById("comment-textarea").value = "";
    };
    writeComment.appendChild(sendButton);
   writeComment.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}
