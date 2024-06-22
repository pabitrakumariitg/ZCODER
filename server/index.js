const express = require("express");
const cors = require("cors");
require('dotenv').config();
const { connectToMongoDB } = require("./connect");

// Import routers
const SignUpRouter = require("./routes/SignUp");
const LoginRouter = require("./routes/Login");
const UploadedQuestionRouter = require("./routes/UploadQuestion");
const EditProfileRouter = require("./routes/EditProfile");
const GetProfileRouter = require("./routes/Profile");
const GetRecentQuestionRouter = require("./routes/FetchRecentQuestions");
const GetMyStackRouter = require("./routes/MyStack");
const UpdateQuestionRouter = require("./routes/UpdateQuestion");
const GetExploreRouter = require("./routes/Explore");
const CodeLiveRouter = require("./routes/CodeLive");

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  cors({
    origin: "https://zcoder-client.vercel.app", // Allow your client app
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

// MongoDB connection setup
const mongoURI = process.env.MONGO_URI;
connectToMongoDB(mongoURI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Routes
app.use("/signUp", SignUpRouter);
app.use("/login", LoginRouter);
app.use("/:userName/edit-profile", EditProfileRouter);
app.use("/home", GetProfileRouter);
app.use("/", UploadedQuestionRouter);
app.use("/getRecentQuestion", GetRecentQuestionRouter);
app.use("/:username/mystack", GetMyStackRouter);
app.use("/updateQuestion", UpdateQuestionRouter);
app.use("/:username/explore", GetExploreRouter);
app.use("/run-cpp", CodeLiveRouter);

// Basic error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is started at PORT:${PORT}`);
});
