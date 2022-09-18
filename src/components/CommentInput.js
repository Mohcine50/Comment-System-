import React, { useState } from "react";
import "../styles/commentInput.css";
import { useDispatch } from "react-redux";
import { addComment } from "../features/commentSlice";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

function CommentInput({ currentUser }) {
  const dispatch = useDispatch();

  const date = new Date();

  const [comment, setComment] = useState("");
  const handleCommentChnage = (e) => {
    setComment(e.target.value);
  };

  const handelCommentSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addComment({
        id: uuidv4(),
        content: comment,
        createdAt: moment(date).fromNow(),
        score: 0,
        user: {
          image: {
            png: currentUser.image.png,
            webp: currentUser.image.webp,
          },
          username: currentUser.username,
        },
        replies: [],
      })
    );
    setComment("");
  };

  return (
    <div className='commentInput'>
      <form id='comment-form' onSubmit={handelCommentSubmit}>
        <img src={currentUser.image.png} alt='avatar' />
        {/* <input type='text' placeholder='Add comment ...' /> */}
        <textarea
          form='comment-form'
          value={comment}
          onChange={handleCommentChnage}
          placeholder='Add comment ...'
        />
        <button type='submit'>Send</button>
      </form>
    </div>
  );
}

export default CommentInput;
