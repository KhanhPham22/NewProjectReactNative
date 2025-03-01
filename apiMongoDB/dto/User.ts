// dto/User.ts
import mongoose from "mongoose";

// Interface cho User khi tạo mới
export interface UserParams {
    firstName: string;
    email: string;
    password: string;
    mobileNo: string;
    createdAt?: Date;
}

// Interface cho response của User (không bao gồm password)
export interface UserResponse {
    id: string | mongoose.Types.ObjectId;
    firstName: string;
    email: string;
    mobileNo: string;
    createdAt?: Date;
}

// Interface cho việc update User
export interface UpdateUser {
    firstName?: string;
    email?: string;
    password?: string;
    mobileNo?: string;
}

// Interface cho login request
export interface LoginRequest {
    email: string;
    password: string;
}

// Interface cho login response
export interface LoginResponse {
    token: string;
    user: UserResponse;
}