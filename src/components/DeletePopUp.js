import React from "react";
import { useDispatch } from "react-redux";
import "../styles/deletePopUp.css";

import { deleteComment, deleteReply } from "../features/commentSlice";

function DeletePopUp({ deleteRef, commentDeletion }) {
  const dispatch = useDispatch();
  console.log(commentDeletion);
  const yesDelete = () => {
    if (commentDeletion.type === "comment") {
      dispatch(deleteComment({ id: commentDeletion.id }));
      deleteRef.current.classList.add("overley-display");
    }

    if (commentDeletion.type === "reply") {
      dispatch(
        deleteReply({
          commentId: commentDeletion.commentId,
          id: commentDeletion.id,
        })
      );
      deleteRef.current.classList.add("overley-display");
    }
  };

  return (
    <div ref={deleteRef} className='overley overley-display'>
      <div className='deletePopUp'>
        <h1>Delete Comment</h1>
        <p>
          Are you sure you want to delete this comment? this will remove the
          comment and can't be undone
        </p>
        <div className='btns'>
          <button
            onClick={() => {
              deleteRef.current.classList.add("overley-display");
            }}
          >
            NO, CANCEL
          </button>
          <button
            onClick={() => {
              yesDelete();
            }}
          >
            YES, DELETE
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletePopUp;
