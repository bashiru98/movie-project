const path = require("path");
const express = require("express");
const app = express();

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("frontend/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
