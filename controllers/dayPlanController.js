const DayPlan = require('../models/DayPlan');

// Lấy tất cả kế hoạch theo ngày của mục tiêu
exports.getDayPlans = async (req, res) => {
    try {
        const dayPlans = await DayPlan.findAll({ where: { GoalID: req.params.goalId } });
        res.json(dayPlans);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy kế hoạch theo ngày theo ID
exports.getDayPlanById = async (req, res) => {
    try {
        const dayPlan = await DayPlan.findByPk(req.params.id);
        if (!dayPlan) {
            return res.status(404).json({ message: 'Day Plan not found' });
        }
        res.json(dayPlan);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Tạo kế hoạch theo ngày mới
exports.createDayPlan = async (req, res) => {
    try {
        const { GoalID,Title, Date, Notes, Status, Progress } = req.body;
        const dayPlan = await DayPlan.create({ GoalID,  Title,Date, Notes, Status, Progress });
        res.status(201).json(dayPlan);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Cập nhật kế hoạch theo ngày
exports.updateDayPlan = async (req, res) => {
    try {
        const dayPlan = await DayPlan.findByPk(req.params.id);
        if (!dayPlan) {
            return res.status(404).json({ message: 'Day Plan not found' });
        }

        const { Date, Notes, Status, Progress } = req.body;
        dayPlan.Date = Date || dayPlan.Date;
        dayPlan.Notes = Notes || dayPlan.Notes;
        dayPlan.Status = Status || dayPlan.Status;
        dayPlan.Progress = Progress || dayPlan.Progress;
        await dayPlan.save();

        res.json(dayPlan);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Xóa kế hoạch theo ngày
exports.deleteDayPlan = async (req, res) => {
    try {
        const dayPlan = await DayPlan.findByPk(req.params.id);
        if (!dayPlan) {
            return res.status(404).json({ message: 'Day Plan not found' });
        }
        await dayPlan.destroy();
        res.status(204).json({ message: 'Day Plan deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Lay theo GoalID
exports.getDayPlanByGoalID = async (req, res) => {
    const { goalID } = req.params;
    try {
        const dayPlans = await DayPlan.findAll({
            where: { GoalID: goalID },
        });
        if (!dayPlans.length) {
            return res.status(404).json({ message: 'No DayPlans found for this GoalID' });
        }
        res.status(200).json(dayPlans);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching DayPlans', error });
    }
};
