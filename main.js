import { Comment } from "./comment/comment.js";
import { CurrentUserComment } from "./comment/writeCommentField.js";
import { Reply } from "./reply/reply.js";
import { CurrentUserReply } from "./reply/writeReplyField.js";


export async function currentUserReplyHandler(commentId, replyingTo) {
  const response = await fetch("./data.json");
  const { currentUser } = await response.json();

  const newReply = new CurrentUserReply(currentUser);
  const rootComment = document.getElementById(commentId);

  const isReply = rootComment.classList.contains("reply");
  newReply.createFieldForReply(commentId, replyingTo, isReply);
}

function getData() {
  fetch("./data.json")
    .then((response) => response.json())
    .then((data) => {
      const globalField = document.querySelector(".comments-area");

      data.comments.forEach((commentData) => {
        const mainComment = new Comment(commentData);
        if (data.currentUser.username === commentData.user.username) {
          mainComment.createMainComment(globalField, true);
        } else {
          mainComment.createMainComment(globalField);
        }

        if (commentData.replies.length !== 0) {
          const parentComment = document.getElementById(
            commentData.id
          ).parentElement;

          const repliesArea = document.createElement("div");
          repliesArea.className = "replies-area";
          repliesArea.setAttribute("id", "ra-" + commentData.id);
          parentComment.appendChild(repliesArea);

          const repliesLine = document.createElement("div");
          repliesLine.className = "reply-line";
          repliesArea.appendChild(repliesLine);

          const replies = document.createElement("div");
          replies.className = "replies";
          replies.setAttribute("id", "replies-" + commentData.id);
          repliesArea.appendChild(replies);

          commentData.replies.forEach((reply) => {
            const rep = new Reply(reply);
            if (data.currentUser.username === reply.user.username) {
              rep.createReply(replies, true);
            } else {
              rep.createReply(replies);
            }
          });
        }
      });

      const cuc = new CurrentUserComment(data.currentUser);
      cuc.writeCommentSection();
    });
}

getData();
