import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

interface ForumThread {
  title: string;
  category: string;
  body: string;
}

const EditForumThread: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [forumThread, setForumThread] = useState<ForumThread>({
    title: "",
    category: "",
    body: "",
  });

  const stripHtmlEntities = (str: string): string => {
    return String(str)
      .replace(/\n/g, "<br> <br>")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  };

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFunction: React.Dispatch<React.SetStateAction<string>>
  ): void => {
    setFunction(event.target.value);
  };

  useEffect(() => {
    const url = `${process.env.REACT_APP_BACKEND_API_URL}/api/v1/forum_thread/show/${params.id}`;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => setForumThread(response))
      .catch();
  }, [params.id]);

  const handleChange = (e: React.ChangeEvent<any>): void => {
    setForumThread({
      ...forumThread,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const url = `${process.env.REACT_APP_BACKEND_API_URL}/api/v1/forum_thread/update/${params.id}`;
    if (
      forumThread.title.length === 0 ||
      forumThread.category.length === 0 ||
      forumThread.body.length === 0
    )
      return;
    const forumThreadContent = {
      title: forumThread.title,
      category: forumThread.category,
      body: stripHtmlEntities(forumThread.body),
      // user_id: user.id,
    };
    // const token = (
    //   document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement
    // ).content;
    fetch(url, {
      method: "PUT",
      headers: {
        // "X-CSRF-Token": token,
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
      .then(() => navigate(`/forumThreads`))
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="font-weight-normal mb-5">Edit Thread</h1>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="title">Thread Name</label>
              <input
                type="text"
                name="title"
                id="title"
                className="form-control"
                required
                defaultValue={forumThread.title}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">
                Category name
                <select
                  name="category"
                  id="category"
                  className="form-control"
                  required
                  value={forumThread.category}
                  onChange={handleChange}
                  // defaultValue="Barter"
                >
                  <option value="Barter">Barter</option>
                  <option value="Buy with AvoCurve Coin">
                    Buy with AvoCurve Coin
                  </option>
                  <option value="Off-Advice">Off-Advice</option>
                  <option value="Other">Other</option>
                </select>
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="body">Body</label>
              <textarea
                className="form-control"
                id="body"
                name="body"
                rows={5}
                required
                value={forumThread.body}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-dark mt-3">
              Edit Thread
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

export default EditForumThread;
