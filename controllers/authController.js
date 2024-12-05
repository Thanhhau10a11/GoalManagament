const User = require('../models/User'); // Import model User

// Đăng ký người dùng mới
exports.register = async (req, res) => {
    const { Name, Email, Password } = req.body; // Không nhận Role nữa

    try {
        // Kiểm tra xem email đã tồn tại chưa
        const existingUser = await User.findOne({ where: { Email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email đã được sử dụng' });
        }

        // Tạo người dùng mới, Role mặc định là 'user'
        const newUser = await User.create({ 
            Name, 
            Email, 
            Password, 
            Role: 'user' // Gán mặc định Role là 'user'
        });

        // Trả về thông tin người dùng mới
        res.status(201).json({
            message: 'Đăng ký thành công',
            user: {
                UserID: newUser.UserID,
                Name: newUser.Name,
                Email: newUser.Email,
                Role: newUser.Role,
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Đã xảy ra lỗi', error: error.message });
    }
};

// Đăng nhập người dùng
exports.login = async (req, res) => {
    const { Email, Password } = req.body;

    console.log(Email, Password )

    try {
        // Tìm người dùng theo email
        const user = await User.findOne({ where: { Email } });
        if (!user) {
            return res.status(404).json({ message: 'Người dùng không tồn tại' });
        }

        // Kiểm tra mật khẩu (so sánh trực tiếp)
        if (user.Password !== Password) {
            return res.status(400).json({ message: 'Mật khẩu không đúng' });
        }

        // Đăng nhập thành công
        res.status(200).json({
            message: 'Đăng nhập thành công',
            user: {
                UserID: user.UserID,
                Name: user.Name,
                Email: user.Email,
                Role: user.Role, // Trả về Role
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Đã xảy ra lỗi', error: error.message });
    }
};
