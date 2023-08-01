import cors from "cors";
import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import { addUserController, deleteUserByIdController, getAllUsersController, getUserByIdController, updateUserController } from "./controllers/User.js";

dotenv.config();

const { PORT, DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env;

const app = express();

app.use(express.json()); // allows express to parse json body requests
app.use(express.urlencoded({ extended: true })); // encoding the parsing better
app.use(cors()); // allows the front to communicate with the backend without a problem (מבחינת אבטחת מידע)

// User routes
app.get("/api/users", getAllUsersController)
app.get("/api/user/:id", getUserByIdController)
app.post("/api/user", addUserController)
app.delete("/api/user/:id", deleteUserByIdController)
app.put("/api/user/:id", updateUserController)

async function main() {
    await mongoose.connect(
      `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`
    );
  } 
  
  main().catch((err) => console.log(err));
  
  app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
  });
  

  //longitude, latitude