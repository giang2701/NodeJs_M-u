//get all
import SingUp from "./../validation/auth.js";
import { User } from "./../models/Users.js";
import bcryptjs from "bcryptjs";

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
