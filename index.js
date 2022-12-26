const { config } = require("./config");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
const userRouter = require("./routes/user.router");
const authRouter = require("./routes/auth.router");
const postRouter = require("./routes/post.router");
const exportRouter = require("./routes/export.router");

app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/exports", exportRouter);

const {
  errorHandler,
  boomErrorHandler,
  logErrors,
} = require("./middleware/error.handler");
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

const port = config.port;
app.listen(port, () => console.log(`Server running in port ${port}`));
