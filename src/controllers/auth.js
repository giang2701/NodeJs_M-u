//get all
import bcryptjs from "bcryptjs";
import { User } from "./../models/Users.js";
import { SingIn, SingUp } from "./../validation/auth.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const { SECRET_CODE } = process.env;

export const singUp = async (req, res) => {
    try {
        // Bước 1: Validate dữ liệu người dùng.
        const { error } = SingUp.validate(req.body, { abortEarly: false }); //luu y : them {} khi khai bao error(const { error })
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors,
            });
        }
        // Bước 2: Kiểm tra xem email đã tồn tại hay chưa?
        const useExists = await User.findOne({ email: req.body.email });
        if (useExists) {
            return res.status(400).json({
                message: "Email da duoc dang ki,ban co muon dang nhap khong",
            });
        }
        // Bước 3: Mã hóa password.
        const hanshedPass = await bcryptjs.hash(req.body.password, 10);
        // Bước 4: Khởi tap users trong db.
        const user = await User.create({
            ...req.body,
            password: hanshedPass,
        });
        // Bước 5: Thông báo cho người dùng đăng kí thành công.
        //Xoa mat khau ik
        user.password = undefined;
        return res.status(200).json({
            message: "Dang ki thanh cong!",
            data: user,
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};

export const singIn = async (req, res) => {
    try {
        // Bước 1: Validate data từ phía client
        const { error } = SingIn.validate(res.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors,
            });
        }
        // Bước 2: Kiểm tra email đã tồn tại hay chưa
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({
                message: "Email nay chua dang ky,bn co muon dang ki khong!",
            });
        }
        // Bước 3: Kiểm tra password
        const isMatch = await bcryptjs.compare(
            req.body.password,
            user.password
        ); // kiem tra password o form ng dung vs tren database
        if (!isMatch) {
            return res.status(400).json({
                message: "Mat khau khong dung",
            });
        }
        // Bước 4: Tạo JWT
        const accesstoken = await jwt.sign({ _id: user._id }, SECRET_CODE, {
            expiresIn: "1d",
        });
        // Bước 5: Trả thông báo cho người dùng đăng nhập thành công
        user.password = undefined;
        return res.status(200).json({
            message: "Dang nhap thanh cong!",
            data: user,
            accesstoken,
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};
