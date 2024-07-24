import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

// Defining the structure of a forum thread for TypeScript
interface ForumThread {
  title: string;
  category: string;
  body: string;
}

const EditForumThread: React.FC = () => {
  // Hooks for navigating and accessing URL parameters
  const params = useParams();
  const navigate = useNavigate();
  // State for storing and updating the forum thread
  const [forumThread, setForumThread] = useState<ForumThread>({
    title: "",
    category: "",
    body: "",
  });

  // Function to strip HTML entities to prevent XSS attacks
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

  // Effect hook to fetch forum thread data based on URL parameter (thread ID)
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

  // Handler for form input changes, updating the forum thread state
  const handleChange = (e: React.ChangeEvent<any>): void => {
    setForumThread({
      ...forumThread,
      [e.target.name]: e.target.value,
    });
  };

  // Handler for form submission, including data validation and API call for updating the thread
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

  // Rendering the form for editing a forum thread
  return (
    <Box
      justifyContent="center"
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
      }}
    >
      <Box width={{ xs: "100%", lg: "50%" }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          color="text.primary"
        >
          Edit Thread
        </Typography>
        <form onSubmit={onSubmit}>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Thread Name"
              type="text"
              name="title"
              id="title"
              required
              defaultValue={forumThread.title}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="category-label">Category name</InputLabel>
            <Select
              labelId="category-label"
              name="category"
              id="category"
              required
              value={forumThread.category}
              onChange={handleChange}
            >
              <MenuItem value="Trade">Trade</MenuItem>
              <MenuItem value="Buy with AvoCurve Coin">
                Buy with AvoCurve Coin
              </MenuItem>
              <MenuItem value="Donations">Donations</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
          {/* ["Trade", "Buy with AvoCurve Coin", "Donations", "Other"] */}

          <FormControl fullWidth margin="normal">
            <TextField
              label="Body"
              id="body"
              name="body"
              multiline
              rows={5}
              required
              value={forumThread.body}
              onChange={handleChange}
            />
          </FormControl>
          <Box mt={3}>
            <Button type="submit" variant="contained" color="primary">
              Edit Thread
            </Button>
            <Button
              component={Link}
              to="/forumThreads"
              variant="outlined"
              color="primary"
              sx={{ ml: 2 }}
            >
              Back to threads
            </Button>
          </Box>
        </form>
      </Box>
    </Box>

    // <div className="container mt-5">
    //   <div className="row">
    //     <div className="col-sm-12 col-lg-6 offset-lg-3">
    //       <h1 className="font-weight-normal mb-5">Edit Thread</h1>
    //       <form onSubmit={onSubmit}>
    //         <div className="form-group">
    //           <label htmlFor="title">Thread Name</label>
    //           <input
    //             type="text"
    //             name="title"
    //             id="title"
    //             className="form-control"
    //             required
    //             defaultValue={forumThread.title}
    //             onChange={handleChange}
    //           />
    //         </div>
    //         <div className="form-group">
    //           <label htmlFor="category">
    //             Category name
    //             <select
    //               name="category"
    //               id="category"
    //               className="form-control"
    //               required
    //               value={forumThread.category}
    //               onChange={handleChange}
    //               // defaultValue="Barter"
    //             >
    //               <option value="Barter">Trade</option>
    //               <option value="Buy with AvoCurve Coin">
    //                 Buy with AvoCurve Coin
    //               </option>
    //               <option value="Giveaway">Giveaway</option>
    //               <option value="Other">Other</option>
    //             </select>
    //           </label>
    //         </div>
    //         <div className="form-group">
    //           <label htmlFor="body">Body</label>
    //           <textarea
    //             className="form-control"
    //             id="body"
    //             name="body"
    //             rows={5}
    //             required
    //             value={forumThread.body}
    //             onChange={handleChange}
    //           />
    //         </div>
    //         <button type="submit" className="btn btn-dark mt-3">
    //           Edit Thread
    //         </button>
    //         <Link to="/forumThreads" className="btn btn-dark mt-3 ">
    //           Back to threads
    //         </Link>
    //       </form>
    //     </div>
    //   </div>
    // </div>
  );
};

export default EditForumThread;
