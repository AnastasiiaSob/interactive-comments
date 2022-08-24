import { openDeleteModal } from "../modal.js";
import { Comment } from "../comment/comment.js";
import { GenericComment } from "../comment/genericComment.js";
import { currentUserReplyHandler } from "../main.js";

export class Reply extends GenericComment {
  id;
  content;
  createdAt;
  score;
  user;
  replyingTo;

  constructor(data) {
    super(data);
    this.replyingTo = data.replyingTo;
    this.id = data.id;
    this.content = data.content;
    this.score = data.score;
    this.user = data.user;
    this.createdAt = data.createdAt;
  }

  createInfoHeadingForReply(parentElement) {
    super.createUserimage(parentElement, this.user);
    super.createUsername(parentElement, this.user);
    super.createDateOfComment(parentElement, this.createdAt);
    super.createReplyButton(parentElement, this.id);
  }

  createRepliesArea(mainComment, commentId) {
    const repliesArea = document.createElement("div");
    repliesArea.className = "replies-area";
    repliesArea.setAttribute("id", "ra-" + commentId);
    mainComment.appendChild(repliesArea);

    const repliesLine = document.createElement("div");
    repliesLine.className = "reply-line";
    repliesArea.appendChild(repliesLine);

    const replies = document.createElement("div");
    replies.className = "replies";
    replies.setAttribute("id", "replies-" + commentId);
    repliesArea.appendChild(replies);
  }

  createReply(parentElement, currentUser = false) {
    const commentBox = document.createElement("div");

    const replyElement = document.createElement("div");
    replyElement.className = "reply";
    replyElement.setAttribute("id", this.id);
    commentBox.appendChild(replyElement);

    parentElement.appendChild(commentBox);

    super.createScoreSection(replyElement, this.id, this.score);

    const commentInfo = document.createElement("div");
    commentInfo.className = "user-comment-info";
    replyElement.appendChild(commentInfo);

    const replyHeading = document.createElement("div");

    if (currentUser) {
      replyHeading.className = "heading-current-user";
      commentInfo.appendChild(replyHeading);

      super.createUserimage(replyHeading, this.user);
      super.createUsername(replyHeading, this.user);
      super.createBadgeForCurrentUser(replyHeading);

      super.createDateOfComment(replyHeading, this.createdAt);

      super.createDeleteButton(replyHeading, this.id);

      super.createEditButton(replyHeading, this.id);
    } else {
      replyHeading.className = "reply-heading";
      commentInfo.appendChild(replyHeading);
      this.createInfoHeadingForReply(replyHeading);
    }
    super.createCommentText(commentInfo, this.replyingTo, this.content);
  }
}
