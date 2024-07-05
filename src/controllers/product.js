import Products from "../models/product.js";

export const getAll = async (req, res) => {
    try {
        const Pro = await Products.find();
        if (Pro.length === 0) {
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
        if (Pro.length === 0) {
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
