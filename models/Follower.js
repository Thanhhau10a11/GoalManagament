const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Follower = sequelize.define('Follower', {
    FollowerID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    GoalID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    UserID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    FollowedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
}, {
    timestamps: false,  // We do not need timestamps for this model
});

module.exports = Follower;
