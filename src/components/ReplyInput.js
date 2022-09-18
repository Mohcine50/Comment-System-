import React, { useState } from "react";
import "../styles/replyInput.css";
import { addReply } from "../features/commentSlice";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { useDispatch } from "react-redux";

function ReplyInput({ currentUser, refer, commentId, username }) {
  const [reply, setReply] = useState("");
  const dispatch = useDispatch();
  const handleReplySubmit = (e) => {
    e.preventDefault();
    sendReply();
    setReply("");
    refer.current.classList.add("display-reply");
  };
  const handleReplyChange = (e) => {
    setReply(e.target.value);
  };

  const sendReply = () => {
    dispatch(
      addReply({
        id: commentId,
        reply: {
          id: uuidv4(),
          content: reply,
          createdAt: moment(new Date()).fromNow(),
          score: 0,
          replyingTo: username,
          user: {
            image: {
              png: currentUser.image.png,
              webp: currentUser.image.webp,
            },
            username: currentUser.username,
          },
        },
      })
    );
  };

  return (
    <div className='replyInput display-reply' ref={refer}>
      <form id='comment-form' onSubmit={handleReplySubmit}>
        <img src={currentUser.image.png} alt='avatar' />
        {/* <input type='text' placeholder='Add comment ...' /> */}
        <textarea
          form='comment-form'
          value={reply}
          onChange={handleReplyChange}
          placeholder='Add Reply ...'
        />
        <button type='submit'>REPLY</button>
      </form>
    </div>
  );
}

export default ReplyInput;
