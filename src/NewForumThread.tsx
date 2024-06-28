import React, { useState, useContext, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./App";

const NewForumThread = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("Barter");
  const [body, setBody] = useState<string>("");
  const { user, setUser } = useContext(UserContext);

  const stripHtmlEntities = (str: string) => {
    return String(str)
      .replace(/\n/g, "<br> <br>")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  };

  const onChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    setFunction: React.Dispatch<React.SetStateAction<string>>
  ): void => {
    setFunction(event.target.value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!user) {
      alert("You must be logged in to create a new thread");
      return;
    }

    const url = `${process.env.REACT_APP_BACKEND_API_URL}/api/v1/forum_thread/create`;
    if ((title.length === 0 || body.length === 0, category.length === 0))
      return;

    const forumThreadContent = {
      title,
      category,
      body: stripHtmlEntities(body),
      author: user.username,
      user_id: user.id,
    };

    // const token = document.querySelector<HTMLMetaElement>(
    //   'meta[name="csrf-token"]'
    // )?.content;
    // if (!token) {
    //   console.error("CSRF token not found");
    //   return;
    // }

    fetch(url, {
      method: "POST",
      headers: {
        // "X-CSRF-Token": token,
        "Author":"dwwd",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(forumThreadContent),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => navigate(`/forumThread/${response.id}`))
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="font-weight-normal mb-5">Add a new Thread</h1>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="title">Thread Title</label>
              <input
                type="text"
                name="title"
                id="title"
                className="form-control"
                required
                onChange={(event) => onChange(event, setTitle)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                name="category"
                id="category"
                className="form-control"
                required
                onChange={(event) => onChange(event, setCategory)}
                defaultValue="Barter"
              >
                <option value="Barter">Barter</option>
                <option value="Buy with AvoCurve Coin">
                  Buy with AvoCurve Coin
                </option>
                <option value="Off-Advice">Off-Advice</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="body"> body</label>
              <textarea
                className="form-control"
                id="body"
                name="body"
                rows={5}
                required
                onChange={(event) => onChange(event, setBody)}
              />
            </div>
            <button type="submit" className="btn btn-dark mt-3">
              Create Thread
            </button>

            <Link to="/forumThreads" className="btn btn-dark mt-3 ">
              Back to threads
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewForumThread;
