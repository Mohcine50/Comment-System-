import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/comment.css";
import Reply from "./Reply";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextareaAutosize from "react-textarea-autosize";
import ReplyInput from "./ReplyInput";
import {
  faPlus,
  faMinus,
  faReply,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { editComment, upVote, downVote } from "../features/commentSlice";

function Comment({ comment, currentUser, deleteRef, setCommentDeletion }) {
  const fontAwesomeStyle = { color: "#c3c4ef", cursor: "pointer" };
  const { user, replies } = comment;
  const [content, setContent] = useState(comment.content);
  const dispatch = useDispatch();
  const replyRef = useRef();
  const updateRef = useRef();
  const replyInputRef = useRef();

  const edit = () => {
    replyRef.current.classList.add("comment-p-reply");
    replyRef.current.disabled = false;
    updateRef.current.classList.remove("display");
  };

  const reply = () => {
    if (replyInputRef.current.className === "replyInput display-reply") {
      replyInputRef.current.classList.remove("display-reply");
    } else {
      replyInputRef.current.classList.add("display-reply");
    }
  };

  const update = () => {
    dispatch(editComment({ id: comment.id, content: content }));
    replyRef.current.classList.remove("comment-p-reply");
    replyRef.current.disabled = true;
    updateRef.current.classList.add("display");
  };
  const [voted, setVoted] = useState(null);
  const vote = (type) => {
    if (type === "UP") {
      if (voted !== "UP") {
        dispatch(upVote({ id: comment.id }));
        setVoted("UP");
      } else {
        dispatch(downVote({ id: comment.id }));
        setVoted(null);
      }
    } else if (type === "DOWN") {
      if (voted !== "DOWN") {
        dispatch(downVote({ id: comment.id }));
        setVoted("DOWN");
      } else {
        dispatch(upVote({ id: comment.id }));
        setVoted(null);
      }
    }
  };

  const deleteComment_ = () => {
    deleteRef.current.classList.remove("overley-display");
    setCommentDeletion({ type: "comment", id: comment.id });
  };

  return (
    <div>
      <div className='comment'>
        <div className='upvote'>
          <FontAwesomeIcon
            style={fontAwesomeStyle}
            icon={faPlus}
            onClick={() => {
              vote("UP");
            }}
          />
          <span>{comment.score}</span>
          <FontAwesomeIcon
            style={fontAwesomeStyle}
            icon={faMinus}
            onClick={() => {
              vote("DOWN");
            }}
          />
        </div>
        <div className='details'>
          <div className='more-infos'>
            <div className='user-info'>
              <img src={user.image.png} alt='avatar' />
              <h1 className='username'>
                {user.username}
                {currentUser.username === user.username && <span>you</span>}
              </h1>
              <p>{comment.createdAt}</p>
            </div>
            <div>
              {currentUser.username === user.username && (
                <button
                  className='delete'
                  onClick={() => {
                    deleteComment_();
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                  <span>Delete</span>
                </button>
              )}
              {currentUser.username === user.username && (
                <button
                  className='edit'
                  onClick={() => {
                    edit();
                  }}
                >
                  <FontAwesomeIcon icon={faEdit} />
                  <span>Edit</span>
                </button>
              )}
              {currentUser.username !== user.username && (
                <button
                  onClick={() => {
                    reply();
                  }}
                >
                  <FontAwesomeIcon icon={faReply} />
                  <span>Replay</span>
                </button>
              )}
            </div>
          </div>
          <div className='update '>
            <TextareaAutosize
              className='comment-p'
              ref={replyRef}
              form='comment-form'
              value={content}
              disabled={true}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
            <button
              onClick={() => {
                update();
              }}
              ref={updateRef}
              className='edit display'
            >
              UPDATE
            </button>
          </div>
        </div>
      </div>
      <ReplyInput
        currentUser={currentUser}
        refer={replyInputRef}
        commentId={comment.id}
        username={user.username}
      />
      <div className='reply-container'>
        {replies.length > 0 &&
          replies.map((reply, key) => {
            return (
              <Reply
                setCommentDeletion={setCommentDeletion}
                deleteRef={deleteRef}
                reply={reply}
                currentUser={currentUser}
                key={key}
                commentId={comment.id}
              />
            );
          })}
      </div>
    </div>
  );
}

export default Comment;
