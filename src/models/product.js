import mongoose from "mongoose";
// tao model san pham
const productSchema = new mongoose.Schema(
    {
        Name: String,
        Price: Number,
    },
    {
        timestamps: true, // thoi gian khoi tao
        versionKey: false,
    }
);
const Products = mongoose.model("Products", productSchema);
//....Products:tự đặt tên......."Products":nên trùng với tên bảng
export default Products;
