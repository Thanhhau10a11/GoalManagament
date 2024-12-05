const Task = require('../models/Task');

// Lấy tất cả nhiệm vụ theo kế hoạch ngày
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll({ where: { DayPlanID: req.params.dayPlanId } });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy nhiệm vụ theo ID
exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Tạo nhiệm vụ mới
exports.createTask = async (req, res) => {
    try {
        const { DayPlanID, Title, Description, Priority, Status, Progress, StartTime, EndTime } = req.body;
        const task = await Task.create({ DayPlanID, Title, Description, Priority, Status, Progress, StartTime, EndTime });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Cập nhật nhiệm vụ
exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        const { Title, Description, Priority, Status, Progress, StartTime, EndTime } = req.body;
        task.Title = Title || task.Title;
        task.Description = Description || task.Description;
        task.Priority = Priority || task.Priority;
        task.Status = Status || task.Status;
        task.Progress = Progress || task.Progress;
        task.StartTime = StartTime || task.StartTime;
        task.EndTime = EndTime || task.EndTime;
        await task.save();

        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Xóa nhiệm vụ
exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        await task.destroy();
        res.status(204).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
