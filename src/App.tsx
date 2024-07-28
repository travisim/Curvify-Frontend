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
import About from "./About";
import Settings from "./Settings";
import './App.css'


// Defining the User interface for TypeScript type checking
interface UserStorage {
  name: string;
  id: number;
  username: string;
  email: string;
  created_at: string;
  updated_at: string;
  avatar: string;
  password: string;
}
// Creating a context for user state to be accessible throughout the component tree
export const UserContext = createContext<null | {
  user: UserStorage;
  setUser: React.Dispatch<React.SetStateAction<UserStorage>>;
}>(null);

const App = () => {
  // State hook for managing user state
  const [user, setUser] = useState<UserStorage | any>(null);



 

  


  // Main return statement rendering the app structure with routing
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
            <Route path="/about" element={<About />} />

            <Route path="/forumThread/:id" element={<ForumThread />} />
            <Route path="/EditForumThread/:id" element={<EditForumThread />} />
            <Route
              path="/EditForumThreadComment/:id"
              element={<EditForumThreadComment />}
            />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </UserContext.Provider>
      </Router>
    </div>
  );
};

export default App;