import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

interface ForumThreadCommentStorage {
  forum_thread_id: any;
  id: number;
  body: string;
  author: string;
  user_id: number;
  created_at: string;
}

const EditForumThreadComment = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [forumThreadComment, setForumThreadComment] =
    useState<ForumThreadCommentStorage>();

  const stripHtmlEntities = (str) => {
    return String(str)
      .replace(/\n/g, "<br> <br>")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  };

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFunction: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setFunction(event.target.value);
  };

  useEffect(() => {
    const url = `${process.env.REACT_APP_BACKEND_API_URL}/api/v1/forum_thread_comments/show/${params.id}`;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => {
        setForumThreadComment(response);
        console.log(forumThreadComment, "forumThreadComment");
      })
      .catch();
  }, [forumThreadComment, params.id]);

  const handleChange = (e: React.ChangeEvent<any>) => {
    setForumThreadComment({
      ...forumThreadComment,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const url = `${process.env.REACT_APP_BACKEND_API_URL}/api/v1/forum_thread_comments/update/${params.id}`;
    if (forumThreadComment.body.length === 0) return;
    const forumThreadCommentContent = {
      body: stripHtmlEntities(forumThreadComment.body),
    };
    const token = (
      document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement
    ).content;
    fetch(url, {
      method: "PUT",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(forumThreadCommentContent),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() =>
        navigate(`/forumThread/${forumThreadComment.forum_thread_id}`)
      )
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="font-weight-normal mb-5">Edit Comments</h1>
          <form onSubmit={onSubmit}>
            <label htmlFor="body">Body </label>
            <textarea
              value={forumThreadComment.body}
              className="form-control"
              id="body"
              name="body"
              rows={5}
              required
              onChange={handleChange}
            />
            <button type="submit" className="btn btn-dark mt-3">
              Save Edit
            </button>
            <Link
              to={`/forumThread/${forumThreadComment.forum_thread_id}`}
              className="btn btn-dark mt-3"
            >
              Back to Thread
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditForumThreadComment;
