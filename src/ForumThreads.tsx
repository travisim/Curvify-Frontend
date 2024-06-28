import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { UserContext } from "./App";
import TimeAgo from "react-timeago";

interface ForumThread {
  id: number;
  title: string;
  category: string;
  author: string;
  created_at: string;
}
const ForumThreads = (): JSX.Element => {
  const navigate = useNavigate();
  const [forumThreads, setForumThreads] = useState<JSX.Element[]>([]);
  const [currentFilter, setCurrentFilter] = useState<string>("All");
  // const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const url = `${process.env.REACT_APP_BACKEND_API_URL}/api/v1/forum_thread/index`;
    function ForumThreadDeterminer(forumThread: ForumThread[]): any {
      if (forumThread.length > 0) {
        return generateForumThreadHTML(forumThread);
      } else {
        return NoForumThreadHTML;
      }
    }

    const NoForumThreadHTML = (
      <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
        <h4>No Posts In This Category yet.</h4>
      </div>
    );

    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => setForumThreads(ForumThreadDeterminer(res)))
      .catch(
        () => setForumThreads([NoForumThreadHTML]) /*navigate("/forumThreads")*/
      ); // should be navigate("/error") but we don't have an error page
  }, []);

  function fetchForumThreadsByCategory(category: string): void {
    const url = `${process.env.REACT_APP_BACKEND_API_URL}/api/v1/forum_thread/showForumThreadsByCategory/${category}`;
    function ForumThreadDeterminer(forumThread: ForumThread[]): any {
      if (forumThread.length > 0) {
        return generateForumThreadHTML(forumThread);
      } else {
        return NoForumThreadHTML;
      }
    }

    const NoForumThreadHTML = (
      <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
        <h4>No Posts In This Category yet.</h4>
      </div>
    );
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => {
        setForumThreads(ForumThreadDeterminer(res));
      })
      .catch();
  }

  function FilterbyCategory(event: React.ChangeEvent<HTMLSelectElement>): void {
    setCurrentFilter(event.target.value);
    fetchForumThreadsByCategory(event.target.value);
  }

  function generateForumThreadHTML(forumThreads: ForumThread[]): JSX.Element[] {
    const allForumThread = forumThreads.map((forumThread, index) => (
      <div key={index} className="col-md-12 col-lg-12">
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">{forumThread.title}</h5>
            <h6 className="card-title">{forumThread.category}</h6>
            <p className="card-subtitle mb-2 text-muted">
              Posted by {forumThread.author}{" "}
              <TimeAgo date={forumThread.created_at} />{" "}
            </p>
            <Link
              to={`/forumThread/${forumThread.id}`}
              className="btn btn-dark"
            >
              View Post
            </Link>
          </div>
        </div>
      </div>
    ));
    return allForumThread;
  }

  const noForumThread = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>
        No post yet. Why not <Link to="/newForumThread">Create One</Link>
      </h4>
    </div>
  );

  return (
    <>
      <section className="jumbotron jumbotron-fluid text-center">
        <div className="container py-5">
          <h1 className="display-4">Latest Posts</h1>
          <p className="lead text-muted">Bartering or using AvoCurve coins</p>
        </div>
      </section>
      <div className="py-5">
        <main className="container">
          <div className="text-end mb-3">
            <Link to="/newForumThread" className="btn btn-dark">
              Create New Thread
            </Link>
          </div>
          <div className=" text-end mb-3">
            <label htmlFor="category">
              Filter by Category
              <select
                name="category"
                id="category"
                className="form-control"
                required
                onChange={FilterbyCategory}
                defaultValue="All"
              >
                <option value="All">All</option>
                <option value="Barter">Barter</option>
                <option value="Buy with AvoCurve Coin">
                  Buy with AvoCurve Coin
                </option>
                <option value="Off-Advice">Off-Advice</option>
                <option value="Other">Other</option>
              </select>
            </label>
          </div>
          <div className="row">{forumThreads}</div>
          <Link to="/" className="btn btn-dark">
            About
          </Link>
        </main>
      </div>
    </>
  );
};

export default ForumThreads;
