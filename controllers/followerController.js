// controllers/followerController.js
const Follower = require('../models/Follower');
const User = require('../models/User');
const Goal = require('../models/Goals');

// Lấy danh sách các followers của một mục tiêu
exports.getFollowersByGoal = async (req, res) => {
  try {
    const goalId = req.params.goalId;
    const followers = await Follower.findAll({
      where: { GoalID: goalId },
      include: [{
        model: User,
        as: 'user',
        attributes: ['UserID', 'Name', 'Email'], // Chỉ lấy thông tin người dùng
      }]
    });
    res.status(200).json(followers);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving followers", error });
  }
};

// Theo dõi một mục tiêu
exports.followGoal = async (req, res) => {
  try {
    const { goalId } = req.params;
    const { userId } = req.body; // ID của người dùng muốn theo dõi

    // Kiểm tra nếu người dùng đã theo dõi mục tiêu này rồi
    const existingFollow = await Follower.findOne({
      where: {
        GoalID: goalId,
        UserID: userId
      }
    });

    if (existingFollow) {
      return res.status(400).json({ message: "User is already following this goal" });
    }

    // Tạo mới một follower
    const newFollower = await Follower.create({
      GoalID: goalId,
      UserID: userId,
      FollowedAt: new Date()
    });

    res.status(201).json(newFollower);
  } catch (error) {
    res.status(500).json({ message: "Error following the goal", error });
  }
};

// Hủy theo dõi mục tiêu
exports.unfollowGoal = async (req, res) => {
  try {
    const { goalId, userId } = req.params;

    const follow = await Follower.findOne({
      where: {
        GoalID: goalId,
        UserID: userId
      }
    });

    if (!follow) {
      return res.status(404).json({ message: "Follow record not found" });
    }

    // Xóa follow
    await follow.destroy();
    res.status(200).json({ message: "Unfollowed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error unfollowing the goal", error });
  }
};
