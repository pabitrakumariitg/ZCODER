const express = require("express");
const cors = require("cors");
const { connectToMongoDB } = require("./connect");

// Import routers
const SignUpRouter = require("./routes/SignUp");
const LoginRouter = require("./routes/Login");
const GetExploreRouter = require("./routes/Explore");
// const UploadedQuestionRouter = require("./routes/UploadQuestion");
// const EditProfileRouter = require("./routes/EditProfile");
// const GetProfileRouter = require("./routes/Profile");
// const GetRecentQuestionRouter = require("./routes/FetchRecentQuestions");
// const GetMyStackRouter = require("./routes/MyStack");
// const UpdateQuestionRouter = require("./routes/UpdateQuestion");
// const CodeLiveRouter = require("./routes/CodeLive");

const app = express();
const PORT = 8000;

//MongoDB connection setup
const mongoURI =
  "mongodb+srv://pabitraKumar:Pabitra@cluster0.bqxhvj3.mongodb.net/goFood?retryWrites=true&w=majority&appName=Cluster0";
connectToMongoDB(mongoURI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit the process or handle the error as needed
  });

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// CORS Configuration
const allowedOrigins = ["http://localhost:5173", "https://zcoder-client.vercel.app"];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// Middleware to simulate getting the current username (for demonstration purposes)
app.use((req, res, next) => {
  req.currentUsername = "currentUsername"; // Replace with actual logic to get the username
  next();
});

// Routes
app.use("/signup", SignUpRouter);
app.use("/login", LoginRouter);
app.use("/explore", GetExploreRouter);
// app.use("/:username/edit-profile", EditProfileRouter);
// app.use("/home", GetProfileRouter);
// app.use("/", UploadedQuestionRouter);
// app.use("/getRecentQuestion", GetRecentQuestionRouter);
// app.use("/:username/mystack", GetMyStackRouter);
// app.use("/updateQuestion", UpdateQuestionRouter);
// app.use("/run-cpp", CodeLiveRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is started at PORT:${PORT}`);
});










