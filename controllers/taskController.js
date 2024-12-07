// const Task = require('../models/Task');
const { Task, DayPlan, Goal } = require('../models'); // Giả sử bạn đã định nghĩa các model này

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
// exports.updateTask = async (req, res) => {
//     try {
//         const task = await Task.findByPk(req.params.id);
//         if (!task) {
//             return res.status(404).json({ message: 'Task not found' });
//         }

//         const { Title, Description, Priority, Status, Progress, StartTime, EndTime } = req.body;
//         task.Title = Title || task.Title;
//         task.Description = Description || task.Description;
//         task.Priority = Priority || task.Priority;
//         task.Status = Status || task.Status;
//         task.Progress = Progress || task.Progress;
//         task.StartTime = StartTime || task.StartTime;
//         task.EndTime = EndTime || task.EndTime;
//         await task.save();

//         res.json(task);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// exports.updateTask = async (req, res) => {
//     try {
//         console.log("Received update request:", req.params.id, req.body);

//         // Lấy Task cần cập nhật
//         const task = await Task.findByPk(req.params.id);
//         if (!task) {
//             console.log("Task not found:", req.params.id);
//             return res.status(404).json({ message: 'Task not found' });
//         }
//         console.log("Task found:", task);

//         // Cập nhật thông tin Task
//         const { Title, Description, Priority, Status, Progress, StartTime, EndTime } = req.body;
//         task.Title = Title || task.Title;
//         task.Description = Description || task.Description;
//         task.Priority = Priority || task.Priority;
//         task.Status = Status || task.Status;
//         task.Progress = Progress || task.Progress;
//         task.StartTime = StartTime || task.StartTime;
//         task.EndTime = EndTime || task.EndTime;
//         await task.save();
//         console.log("Task updated:", task);

//         // Tính lại % hoàn thành của DayPlan chứa Task này
//         const dayPlan = await DayPlan.findByPk(task.DayPlanID, {
//             include: [{ model: Task }], // Include tất cả các Task thuộc DayPlan
//         });

//         if (!dayPlan) {
//             console.log("DayPlan not found for Task:", task.DayPlanID);
//             return res.status(404).json({ message: 'DayPlan not found' });
//         }

//         console.log("DayPlan found:", dayPlan);

//         const totalTasks = dayPlan.Tasks.length;
//         const totalProgress = dayPlan.Tasks.reduce((sum, t) => sum + t.Progress, 0);
//         dayPlan.Progress = totalTasks > 0 ? totalProgress / totalTasks : 0;
//         await dayPlan.save();
//         console.log("DayPlan updated:", dayPlan);

//         // Tính lại % hoàn thành của Goal chứa DayPlan này
//         const goal = await Goal.findByPk(dayPlan.GoalID, {
//             include: [{ model: DayPlan }], // Include tất cả các DayPlan thuộc Goal
//         });

//         if (!goal) {
//             console.log("Goal not found for DayPlan:", dayPlan.GoalID);
//             return res.status(404).json({ message: 'Goal not found' });
//         }

//         console.log("Goal found:", goal);

//         const totalDayPlans = goal.DayPlans.length;
//         const totalDayPlanProgress = goal.DayPlans.reduce((sum, dp) => sum + dp.Progress, 0);
//         goal.Progress = totalDayPlans > 0 ? totalDayPlanProgress / totalDayPlans : 0;
//         await goal.save();
//         console.log("Goal updated:", goal);

//         // Trả về kết quả cập nhật
//         res.json({ task, dayPlan, goal });
//     } catch (error) {
//         console.error("Error in updateTask:", error);
//         res.status(500).json({ message: error.message });
//     }
// };

exports.updateTask = async (req, res) => {
    try {
        console.log("Received update request:", req.params.id, req.body);

        // Lấy Task cần cập nhật
        const task = await Task.findByPk(req.params.id);
        if (!task) {
            console.log("Task not found:", req.params.id);
            return res.status(404).json({ message: 'Task not found' });
        }
        console.log("Task found:", task);

        // Cập nhật thông tin Task
        const { Title, Description, Priority, Status, Progress, StartTime, EndTime } = req.body;
        task.Title = Title || task.Title;
        task.Description = Description || task.Description;
        task.Priority = Priority || task.Priority;
        task.Status = Status || task.Status;
        task.Progress = Progress || task.Progress;
        task.StartTime = StartTime || task.StartTime;
        task.EndTime = EndTime || task.EndTime;
        await task.save();
        console.log("Task updated:", task);

        // Lấy DayPlan chứa Task này
        const dayPlan = await DayPlan.findByPk(task.DayPlanID, {
            include: [{ model: Task }], // Include tất cả các Task thuộc DayPlan
        });

        if (!dayPlan) {
            console.log("DayPlan not found for Task:", task.DayPlanID);
            return res.status(404).json({ message: 'DayPlan not found' });
        }

        console.log("DayPlan found:", dayPlan);

        // Tính lại Progress của DayPlan
        const totalTasks = dayPlan.Tasks.length;
        const completedTasks = dayPlan.Tasks.filter((t) => t.Status === 'completed').length;
        dayPlan.Progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
        await dayPlan.save();
        console.log(`DayPlan updated: ${dayPlan.DayPlanID}, Progress: ${dayPlan.Progress}%`);

        // Lấy Goal chứa DayPlan này
        const goal = await Goal.findByPk(dayPlan.GoalID, {
            include: [{ model: DayPlan }], // Include tất cả các DayPlan thuộc Goal
        });

        if (!goal) {
            console.log("Goal not found for DayPlan:", dayPlan.GoalID);
            return res.status(404).json({ message: 'Goal not found' });
        }

        console.log("Goal found:", goal);

        // Tính lại Progress của Goal
        const totalDayPlans = goal.DayPlans.length;
        const totalDayPlanProgress = goal.DayPlans.reduce((sum, dp) => sum + dp.Progress, 0);
        goal.Progress = totalDayPlans > 0 ? totalDayPlanProgress / totalDayPlans : 0;
        await goal.save();
        console.log(`Goal updated: ${goal.GoalID}, Progress: ${goal.Progress}%`);

        // Trả về kết quả cập nhật
        res.json({ task, dayPlan, goal });
    } catch (error) {
        console.error("Error in updateTask:", error);
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
