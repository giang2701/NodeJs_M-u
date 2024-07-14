import Products from "../models/Product.js";
import { ProductValid } from "../validation/product.js";
//get all
export const getAll = async (req, res) => {
    try {
        const Pro = await Products.find();
        if (!Pro) {
            return res.status(404).json({
                message: "Khong Tim Thay San Pham",
            });
        }
        return res.status(200).json({
            message: " Tim Thay San Pham",
            datas: Pro,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Loi server",
        });
    }
};
// detail Product
export const getDetail = async (req, res) => {
    try {
        const Pro = await Products.findById(req.params.id);
        if (!Pro) {
            return res.status(404).json({
                message: "Khong Tim Thay San Pham",
            });
        }
        return res.status(200).json({
            message: " Tim Thay San Pham",
            datas: Pro,
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};
// Add pro
export const create = async (req, res) => {
    try {
        const { error } = ProductValid.validate(req.body, {
            abortEarly: false, //abortEarly: bao nhieeu loi tra ra het
        });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors,
            });
        }
        const product = await Products.create(req.body);
        if (!product) {
            return res.status(404).json({
                message: "Them san pham that bai",
            });
        }
        return res.status(200).json({
            message: "Them san pham thanh cong",
            datas: product,
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};
// Update
export const update = async (req, res) => {
    try {
        const { error } = ProductValid.validate(req.body, {
            abortEarly: false, //abortEarly: bao nhieeu loi tra ra het
        });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors,
            });
        }
        const product = await Products.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
            }
        );
        if (!product) {
            return res.status(404).json({
                message: "Cap nhat san pham that bai",
            });
        }
        return res.status(200).json({
            message: "Cap nhat san pham thanh cong",
            datas: product,
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};
// delete
export const deletepro = async (req, res) => {
    try {
        const product = await Products.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({
                message: "Xoa san pham that bai",
            });
        }
        return res.status(200).json({
            message: "Xoa san pham thanh cong",
            datas: product,
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};
