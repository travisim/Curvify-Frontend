import React, { useState, useEffect, createContext } from "react";
import 'bootstrap/dist/css/bootstrap.css';
// import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import ForumThreads from "./ForumThreads";
import ForumThread from "./ForumThread";
import NewForumThread from "./NewForumThread";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ResponsiveAppBar from "./ResponsiveAppBar";
import EditForumThreadComment from "./EditForumThreadComment";
import EditForumThread from "./EditForumThread";
import './App.css'
interface User {
  id: number;
  username: string;
  created_at: string;
  updated_at: string;
}
export const UserContext = createContext<null | { user: User, setUser: React.Dispatch<React.SetStateAction<User>> }>(null);

const App = () => {
  const [user, setUser] = useState<User | any>(null);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetch("/login", {
        headers: { Authenticate: localStorage.token },
      })
        .then((response) => response.json())
        .then((user) => {
          setUser(user);
        });
    }
  }, []);

 

  // function handleLogout() {
  //   setUser(null);
  //   localStorage.removeItem("token");
  //   navigate(`/forumThreads`);
  //   console.log("logged out");
  // }

  return (
    <div>
      <Router>
          <UserContext.Provider value={{ user: user, setUser: setUser }}>
              <ResponsiveAppBar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/forumThreads" element={<ForumThreads />} />
                <Route path="/signUp" element={<SignUp />} />
                <Route path="/signIn" element={<SignIn />} />
                <Route path="/newForumThread" element={<NewForumThread />} />
              
                <Route path="/forumThread/:id" element={<ForumThread />} />
                <Route path="/EditForumThread/:id" element={<EditForumThread />} />
                <Route path="/EditForumThreadComment/:id" element={<EditForumThreadComment />} />
                
             
                 
              </Routes>
          </UserContext.Provider>
      </Router>
    </div>
  );
};

export default App;