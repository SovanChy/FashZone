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
          <textarea
            style={{ textDecoration: "none", outline: "none" }}
            className="comment"
            type="text"
            required
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
            placeholder="add new comment..."
          />
        </label>
        <button className="ms-auto" type="submit">Submit</button>
      </form>

      <h4>Comment</h4>
      <ul className="comment-list">
        {input.comment.length > 0 &&
          input.comment.map((comment) => {
            return (
              <li key={comment.id}>
                <div className="d-flex align-items-center">
                  <img
                    src={comment.photoURL}
                    alt="User Avatar"
                    className="rounded-circle me-2"
                    style={{
                      width: "40px",
                      height: "40px",
                      cursor: "pointer",
                      objectFit: "cover",
                    }}
                  />
                  <p className="mb-0">{comment.displayName}</p>
                </div>
                <div>
                </div>
                <div>
                  <p className="mt-2">{comment.content}</p>
                </div>
                <p className="mb-2">{formatTimestamp(comment.createdAt)}</p>
                <hr/>

              </li>
            );
          })}
      </ul>
    </div>
  );
}
