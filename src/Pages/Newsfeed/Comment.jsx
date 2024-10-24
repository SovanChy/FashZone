import React from "react";
import { useState } from "react";
import { timestamp } from "../../firebase/config";
import { useAuthContext } from "../../Hook/useAuthContext";
import useTimestampFormat from "../../Hook/useTimeStampFormat";
import { useFirestore } from "../../Hook/useFirestore";

//css styling
import "./Comment.scss";

export default function Comment({ input }) {
  const { updateDocument, response } = useFirestore("MediaPost");
  const { formatTimestamp } = useTimestampFormat();
  const [newComment, setNewComment] = useState("");
  const { user } = useAuthContext();

  const handleComment = async (e) => {
    e.preventDefault();
    const commentInput = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      createdAt: timestamp.fromDate(new Date()),
      id: Math.random(),
    };
    await updateDocument(input.id, {
      comment: [...input.comment, commentInput],
    });
    if (!response.error) {
      setNewComment("");
    }
  };

  return (
    <div>
      <form onSubmit={handleComment}>
        <label>
          <input
            className="comment"
            type="text"
            required
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
            placeholder="add new comment..."
          />
        </label>
        <button></button>
      </form>
      <h4>Comment</h4>
      <ul>
        {input.comment.length > 0 &&
          input.comment.map((comment) => {
            return (
              <li key={comment.id}>
                <div className="d-flex ">
                  <img
                    src={comment.photoURL}
                    alt="User Avatar"
                    style={{
                      width: "40px",
                      height: "40px",
                      cursor: "pointer",
                      objectFit: "cover",
                    }}
                  />
                  <p>{comment.displayName}</p>
                </div>
                <div>
                  <p>{formatTimestamp(comment.createdAt)}</p>
                </div>
                <div>
                  <p>{comment.content}</p>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
