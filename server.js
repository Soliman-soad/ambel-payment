require("dotenv").config();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const http = require("http");
//uncaught handler
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! Shutting down...");
  console.log(err.name, err.message);
  console.log(err);
  // process.exit(1);
});

dotenv.config({ path: ".env" });

const port = 8000;
mongoose
  // @ts-ignore
  .connect("mongodb+srv://innovexit:innovexit@cluster0.toq8y.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    // useCreateIndex: true,
    //useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((cons) => {
    
    console.log("MongoDb connected successfully");
  })
  .catch((err) => {
    console.log("Database connection unsuccessful!", err);
  });


const app = require("./app.js");


// process.setMaxListeners(0);

const ioServer = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(ioServer);

app.set("socketIo", io);
// console.log("app in server,js", app);
// io.on("connection", chatController.joinSocket);


process.on("unhandledRejection", (err) => {

  console.log("UNHANDLED REJECTION!");
  // @ts-ignore
  console.log(err.name, err.message);
  console.log(err);
});

process.on("SIGTERM", (err) => {
  console.log("SIGTERM! DETECTED");
})
const server = ioServer.listen(port, (error) => {
  console.log(`App running on ${port}..`);

});

module.exports = server;
