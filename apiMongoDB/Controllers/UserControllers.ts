
import { RequestHandler } from "express";
import { USER } from "../Models/UserModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserParams, UserResponse, LoginRequest, LoginResponse } from "../dto/User";

export const createUser: RequestHandler<{}, any, UserParams> = async (req, res) => {
    try {
        const { firstName, email, password, mobileNo } = req.body;

        if (!firstName || !email || !password || !mobileNo) {
            res.status(400).json({ error: "All fields are required" });
            return;
        }

        const existingUser = await USER.findOne({ email });
        if (existingUser) {
            res.status(400).json({ error: "Email already exists" });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new USER({
            firstName,
            email,
            password: hashedPassword,
            mobileNo,
        });

        await user.save();

        const userResponse: UserResponse = {
            id: user._id,
            firstName: user.firstName,
            email: user.email,
            mobileNo: user.mobileNo,
            createdAt: user.createdAt,
        };

        res.status(201).json({
            message: "User created successfully",
            user: userResponse,
        });
    } catch (error) {
        res.status(500).json({ error: `Failed to create user: ${error}` });
    }
};

export const loginUser: RequestHandler<{}, any, LoginRequest> = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ error: "Email and password are required" });
            return;
        }

        const user = await USER.findOne({ email });
        if (!user) {
            res.status(401).json({ error: "Invalid credentials" });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ error: "Invalid credentials" });
            return;
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET || "your-secret-key",
            { expiresIn: "1h" }
        );

        const userResponse: UserResponse = {
            id: user._id,
            firstName: user.firstName,
            email: user.email,
            mobileNo: user.mobileNo,
            createdAt: user.createdAt,
        };

        const loginResponse: LoginResponse = {
            token,
            user: userResponse,
        };

        res.status(200).json({
            message: "Login successful",
            ...loginResponse,
        });
    } catch (error) {
        res.status(500).json({ error: `Login failed: ${error}` });
    }
};

export const getUser: RequestHandler<{ id: string }, any, any> = async (req, res) => {
    try {
        const user = await USER.findById(req.params.id).select("-password");
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        const userResponse: UserResponse = {
            id: user._id,
            firstName: user.firstName,
            email: user.email,
            mobileNo: user.mobileNo,
            createdAt: user.createdAt,
        };

        res.status(200).json(userResponse);
    } catch (error) {
        res.status(500).json({ error: `Error fetching user: ${error}` });
    }
};

export const getAllUsers: RequestHandler = async (_req, res) => {
    try {
        const users = await USER.find({}).select("-password");
        const usersResponse: UserResponse[] = users.map((user) => ({
            id: user._id,
            firstName: user.firstName,
            email: user.email,
            mobileNo: user.mobileNo,
            createdAt: user.createdAt,
        }));
        res.status(200).json(usersResponse);
    } catch (error) {
        res.status(500).json({ error: `Error fetching users: ${error}` });
    }
};