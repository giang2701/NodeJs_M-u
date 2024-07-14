import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/Users.js";
dotenv.config();
const { SECRET_CODE } = process.env;

export const checkPermission = async (req, res, next) => {
    try {
        // Bước 1: Người dùng đăng nhập hay chưa ?
        const token = req.headers.authorization?.split(" ")[1];
        // Bước 2: Kiểm tra token
        if (!token) {
            return res.status(400).json({
                messages: "Ban chua dang nhap!",
            });
        }
        // Bước 3: Kiểm tra quyền người dùng ?
        const decoded = jwt.verify(token, SECRET_CODE);
        const user = await User.findById(decoded._id);
        if (!user) {
            return res.status(403).json({
                messages: "Token Loi!!",
            });
        }
        if (user.role !== "admin") {
            return res.status(403).json({
                messages: "Ban khong co quyen truy cap",
            });
        }
        // Bước 4: Next
        next();
    } catch (error) {
        return res.json({
            name: error.name,
            messages: error.messages,
        });
    }
};
