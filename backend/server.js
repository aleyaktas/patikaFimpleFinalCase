const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");

app.use(cors());

// Socket Settings
const server = require("http").createServer(app);

// Init Middleware
app.use(
  express.json({
    extended: false,
  })
);
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Fimple Final Case Backend Server is running..!");
});

const PORT = process.env.PORT || 5010;

server.listen(PORT, () => console.log(`Server started on port : ${PORT}`));
