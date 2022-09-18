import { createSlice } from "@reduxjs/toolkit";
import { isFocusable } from "@testing-library/user-event/dist/utils";
import { data } from "../data";

const initialState = data;

const commentSlice = createSlice({
  name: "comment",
  initialState: { comments: data },
  reducers: {
    addComment: (state, actions) => {
      state.comments.comments.push(actions.payload);
    },
    editComment: (state, actions) => {
      const { id, content } = actions.payload;
      state.comments.comments.map((c) => {
        if (c.id === id) {
          c.content = content;
        }
      });
    },
    deleteComment: (state, actions) => {
      const { id } = actions.payload;
      state.comments.comments = state.comments.comments.filter(
        (c) => c.id !== id
      );
    },
    addReply: (state, actions) => {
      const { id, reply } = actions.payload;
      state.comments.comments.map((c) => {
        if (c.id === id) {
          c.replies.push(reply);
        }
      });
    },
    editReply: (state, actions) => {
      const { commentId, id, content } = actions.payload;
      state.comments.comments.map((c) => {
        if (c.id === commentId) {
          c.replies.map((r) => {
            if (r.id === id) {
              r.content = content;
            }
          });
        }
      });
    },
    deleteReply: (state, actions) => {
      const { commentId, id } = actions.payload;
      state.comments.comments.map((c) => {
        if (c.id === commentId) {
          c.replies = c.replies.filter((r) => r.id !== id);
        }
      });
    },
    upVote: (state, actions) => {
      const { id } = actions.payload;

      state.comments.comments.map((c) => {
        if (c.id === id) {
          c.score += 1;
        }
      });
    },
    downVote: (state, actions) => {
      const { id } = actions.payload;
      state.comments.comments.map((c) => {
        if (c.id === id) {
          if (c.score > 0) {
            c.score -= 1;
          }
        }
      });
    },
    replyUpVote: (state, actions) => {
      const { id, commentId } = actions.payload;

      state.comments.comments.map((c) => {
        if (c.id === commentId) {
          c.replies.map((r) => {
            if (r.id === id) {
              r.score += 1;
            }
          });
        }
      });
    },
    replyDownVote: (state, actions) => {
      const { id, commentId } = actions.payload;

      state.comments.comments.map((c) => {
        if (c.id === commentId) {
          c.replies.map((r) => {
            if (r.id === id) {
              if (r.score > 0) {
                r.score -= 1;
              }
            }
          });
        }
      });
    },
  },
});

export const {
  addComment,
  editComment,
  deleteComment,
  addReply,
  editReply,
  deleteReply,
  upVote,
  downVote,
  replyUpVote,
  replyDownVote,
} = commentSlice.actions;

export default commentSlice.reducer;
