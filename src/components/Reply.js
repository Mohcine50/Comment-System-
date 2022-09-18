import React, { useRef, useState } from "react";
import "../styles/reply.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import ReplyInput from "./ReplyInput";
import {
  faPlus,
  faMinus,
  faReply,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import {
  editReply,
  replyUpVote,
  replyDownVote,
} from "../features/commentSlice";
import TextareaAutosize from "react-textarea-autosize";

function Reply({
  reply,
  currentUser,
  commentId,
  deleteRef,
  setCommentDeletion,
}) {
  const fontAwesomeStyle = { color: "#c3c4ef", cursor: "pointer" };
  const dispatch = useDispatch();
  const [content, setContent] = useState(reply.content);

  const [voted, setVoted] = useState(null);

  const { user } = reply;

  const deleteReply_ = () => {
    deleteRef.current.classList.remove("overley-display");
    setCommentDeletion({ type: "reply", commentId: commentId, id: reply.id });
  };

  const replyRef = useRef();
  const updateRef = useRef();
  const replyInputRef = useRef();
  const replyButton = useRef();

  const reply_ = () => {
    if (replyInputRef.current.className === "replyInput display-reply") {
      replyInputRef.current.classList.remove("display-reply");
    } else {
      replyInputRef.current.classList.add("display-reply");
    }
  };

  const edit = () => {
    replyRef.current.classList.add("comment-p-reply");
    replyRef.current.disabled = false;
    updateRef.current.classList.remove("display");
  };

  const update = () => {
    dispatch(
      editReply({ commentId: commentId, id: reply.id, content: content })
    );
    replyRef.current.classList.remove("comment-p-reply");
    replyRef.current.disabled = true;
    updateRef.current.classList.add("display");
  };

  const vote = (type) => {
    if (type === "UP") {
      if (voted !== "UP") {
        dispatch(replyUpVote({ id: reply.id, commentId: commentId }));
        setVoted("UP");
      } else {
        dispatch(replyDownVote({ id: reply.id, commentId: commentId }));
        setVoted(null);
      }
    }
    if (type === "DOWN") {
      if (voted !== "DOWN") {
        dispatch(replyDownVote({ id: reply.id, commentId: commentId }));
        setVoted("DOWN");
      } else {
        dispatch(replyUpVote({ id: reply.id, commentId: commentId }));
        setVoted(null);
      }
    }
  };

  return (
    <div>
      <div className='reply'>
        <div className='upvote'>
          <FontAwesomeIcon
            onClick={() => {
              vote("UP");
            }}
            style={fontAwesomeStyle}
            icon={faPlus}
          />
          <span>{reply.score}</span>
          <FontAwesomeIcon
            onClick={() => {
              vote("DOWN");
            }}
            style={fontAwesomeStyle}
            icon={faMinus}
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
              <p>{reply.createdAt}</p>
            </div>
            <div>
              {currentUser.username === user.username && (
                <button
                  onClick={() => {
                    deleteReply_();
                  }}
                  className='delete'
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
                  ref={replyButton}
                  onClick={() => {
                    reply_();
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
              value={content}
              ref={replyRef}
              disabled={true}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            ></TextareaAutosize>
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
        commentId={commentId}
        username={user.username}
      />
    </div>
  );
}

export default Reply;
