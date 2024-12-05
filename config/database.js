const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

// Load các biến môi trường từ file .env
dotenv.config();

// Khởi tạo kết nối Sequelize
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        port: process.env.DB_PORT,
        logging: false // Tắt log SQL để giảm thiểu thông tin trên console
    }
);

// Đồng bộ hóa cơ sở dữ liệu
const syncDatabase = async () => {
    try {
        // Đồng bộ hóa cơ sở dữ liệu
        await sequelize.sync({ alter: true, force: false });
        console.log('Database synchronized successfully.');

        // Nếu bạn muốn xóa và tạo lại tất cả các bảng, dùng `force: true`
        // await sequelize.sync({ force: true });
        // console.log('All tables dropped and recreated.');
    } catch (error) {
        console.error('Error synchronizing database:', error);
    }
};

// Gọi hàm đồng bộ cơ sở dữ liệu
syncDatabase();

module.exports = sequelize;
