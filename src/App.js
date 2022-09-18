import { useSelector } from "react-redux";
import "./styles/App.css";
import Comment from "./components/Comment";
import CommentInput from "./components/CommentInput";
import { useEffect, useRef, useState } from "react";
import DeletePopUp from "./components/DeletePopUp";
function App() {
  //Selector of the comments data
  const data = useSelector((state) => state.comments.comments);
  const comments = data.comments;
  const currentUser = data.currentUser;
  //sort a coppy of the comments Array and store it in new array
  const sortedComments = [...comments].sort((a, b) => b.score - a.score);
  const [commentDeletion, setCommentDeletion] = useState({});
  const deleteRef = useRef();

  return (
    <div className='App'>
      <div className='container'>
        {sortedComments.map((comment, key) => {
          return (
            <Comment
              comment={comment}
              currentUser={currentUser}
              key={key}
              deleteRef={deleteRef}
              setCommentDeletion={setCommentDeletion}
            />
          );
        })}
        <CommentInput currentUser={currentUser} />
        <DeletePopUp deleteRef={deleteRef}  commentDeletion={commentDeletion}/>
      </div>
    </div>
  );
}

export default App;
