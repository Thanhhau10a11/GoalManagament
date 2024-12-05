const  Goal  = require('../models/Goals');

// Lấy tất cả mục tiêu của ứng dụng
exports.getAllGoals = async (req, res) => {
    try {
        const goals = await Goal.findAll();
        res.json(goals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Lấy tất cả mục tiêu của người dùng
exports.getGoals = async (req, res) => {
    try {
        const goals = await Goal.findAll({ where: { UserID: req.params.userId } });
        res.json(goals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy mục tiêu theo ID
exports.getGoalById = async (req, res) => {
    try {
        const goal = await Goal.findByPk(req.params.id);
        if (!goal) {
            return res.status(404).json({ message: 'Goal not found' });
        }
        res.json(goal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Tạo mục tiêu mới
exports.createGoal = async (req, res) => {
    try {
        const { UserID, GoalTitle, Description, TargetDate, Visibility, Status } = req.body;

        console.log(UserID, GoalTitle, Description, TargetDate, Visibility, Status);

        // Kiểm tra nếu có dữ liệu bắt buộc thiếu
        if (!UserID || !GoalTitle || !TargetDate) {
            return res.status(400).json({ message: 'UserID, GoalTitle và TargetDate là bắt buộc!' });
        }

        // Tạo Goal mới
        const goal = await Goal.create({
            UserID,
            GoalTitle,
            Description,
            TargetDate,
            Visibility,
            Status
        });

        // Trả về Goal vừa tạo
        return res.status(201).json({
            message: 'Goal created successfully',
            goal
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Lỗi server khi tạo mục tiêu!' });
    }
};

// Cập nhật mục tiêu
exports.updateGoal = async (req, res) => {
    try {
        const goal = await Goal.findByPk(req.params.id);
        if (!goal) {
            return res.status(404).json({ message: 'Goal not found' });
        }

        const { GoalTitle, Description, TargetDate, Visibility, Status, Progress } = req.body;
        goal.GoalTitle = GoalTitle || goal.GoalTitle;
        goal.Description = Description || goal.Description;
        goal.TargetDate = TargetDate || goal.TargetDate;
        goal.Visibility = Visibility || goal.Visibility;
        goal.Status = Status || goal.Status;
        goal.Progress = Progress || goal.Progress;
        await goal.save();

        res.json(goal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Xóa mục tiêu
exports.deleteGoal = async (req, res) => {
    try {
        const goal = await Goal.findByPk(req.params.id);
        if (!goal) {
            return res.status(404).json({ message: 'Goal not found' });
        }
        await goal.destroy();
        res.status(204).json({ message: 'Goal deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
