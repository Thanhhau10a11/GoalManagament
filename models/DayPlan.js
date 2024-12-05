const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DayPlan = sequelize.define('DayPlan', {
    DayPlanID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    GoalID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Title: {  // Thêm trường "Tên DayPlan"
        type: DataTypes.STRING,
        allowNull: false,  // Bắt buộc nhập tên DayPlan
    },
    Date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    Notes: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    Status: {
        type: DataTypes.ENUM('not-started', 'in-progress', 'completed'),
        defaultValue: 'not-started',
    },
    Progress: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
    },
}, {
    timestamps: true,
});

module.exports = DayPlan;
