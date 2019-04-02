const express = require("express");
const dbRoutes = require("./routes");

const server = express();

server.use("/api/posts", dbRoutes);

module.exports = server;
