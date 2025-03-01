
import express from "express";
import { createUser, getAllUsers, getUser, loginUser } from "../Controllers/UserControllers";


const router = express.Router();

router.post("/register", createUser);


router.post("/login", loginUser);
router.get("/user/:id", getUser);
router.get("/users", getAllUsers);

export { router as UserRoute };