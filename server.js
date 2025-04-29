import express from "express";
const app = express();
const port = process.env.PORT || 3000;

// ExpressJS app to serve as static server to serve the SPA built.
app.use("/", express.static("build/client"));
app.use("/appswitch", express.static("build/client"));

app.listen(port, () => {
  console.log(`ExpressJS app listening on port ${port}`);
});
