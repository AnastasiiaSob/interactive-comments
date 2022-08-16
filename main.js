import { Comment } from "./comment/comment.js"
import { GenericComment } from "./comment/genericComment.js"
import { CurrentUserComment } from "./comment/currentUserComment.js"
import { Reply } from "./reply/reply.js"


export function currentUserReplyHandler(commentId){
    fetch('./data.json')
    .then(response => response.json())
    .then(data => {
        const cuc = new CurrentUserComment(data.currentUser)
        cuc.createFieldForReply(commentId);
    })
  
}

 function getData(){
    fetch('./data.json')
    .then(response => response.json())
    .then(data => {
    const globalField = document.querySelector(".comments-field");

    data.comments.forEach(commentData => {

        const mainComment = new Comment(commentData);
        mainComment.createMainComment(globalField)

        if(commentData.replies.length !== 0){
            const repliesArea = document.createElement('div')
            repliesArea.className = "replies-area"
            globalField.appendChild(repliesArea)

            const repliesLine = document.createElement('div')
            repliesLine.className = "reply-line"
            repliesArea.appendChild(repliesLine)

            const replies = document.createElement('div')
            replies.className = "replies"
            replies.setAttribute('id',"replies-"+commentData.id)
            repliesArea.appendChild(replies)

            commentData.replies.forEach(reply => {
                const rep = new Reply(reply);
                if(data.currentUser.username === reply.user.username){
                    rep.createReply(replies, true)
                } else {
                    rep.createReply(replies)
                }
            })
        }
    });

    const cuc = new CurrentUserComment(data.currentUser)
    cuc.writeCommentSection()
})
}

getData()


