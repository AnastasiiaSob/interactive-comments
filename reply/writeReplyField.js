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
    const content = document.getElementById("comment-textarea").value;
    if (content) {
      const id = Math.floor(Math.floor(Math.random() * 1000));
      const reply = new Reply({
        id: id,
        content: content,
        createdAt: "now",
        score: 0,
        user: this.currentUser,
        replyingTo: replyingTo,
      });
      const repliesList = document.getElementById("replies-" + commentId);
      if (isSmallReply) {
        reply.createReply(mainComment, true);
      } else {
        reply.createReply(repliesList, true);
      }
    }
  }

  createSendButton() {
    const sendButton = document.createElement("button");
    sendButton.innerHTML = "SEND";
    sendButton.className = "standard-filled";
    return sendButton;
  }

  createNewReplyWithArea(mainComment, commentId, replyingTo) {
    const content = document.getElementById("comment-textarea").value;
    if (content) {
      const id = Math.floor(Math.floor(Math.random() * 1000));
      const reply = new Reply({
        id: id,
        content: content,
        createdAt: "now",
        score: 0,
        user: this.currentUser,
        replyingTo: replyingTo,
      });
      reply.createRepliesArea(mainComment, commentId);
      const repliesList = document.getElementById("replies-" + commentId);
      reply.createReply(repliesList, true);
    }
  }

  deleteInputField(commentId, isSmallReply) {
    if (isSmallReply) {
      document.getElementById("write-field-small-" + commentId).remove();
    } else {
      document.getElementById("write-field-" + commentId).remove();
    }
  }

  createFieldForReply(commentId, replyingTo, isSmallReply = false) {
    const mainComment = document.getElementById(commentId).parentElement;
    const writeComment = document.createElement("div");
    if (isSmallReply) {
      writeComment.className = "small-reply";
      writeComment.setAttribute("id", "write-field-small-" + commentId);
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
          isSmallReply,
          replyingTo
        );
      } else {
        this.createNewReplyWithArea(mainComment, commentId, replyingTo);
      }
      this.deleteInputField(commentId, isSmallReply);
      document.getElementById("comment-textarea").value = "";
    };
    writeComment.appendChild(sendButton);
  //  writeComment.scrollIntoView();
  }
}
