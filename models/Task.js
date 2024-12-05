const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Task = sequelize.define('Task', {
    TaskID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    DayPlanID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    Priority: {
        type: DataTypes.ENUM('low', 'medium', 'high'),
        defaultValue: 'medium',
    },
    Status: {
        type: DataTypes.ENUM('pending', 'in-progress', 'completed', 'overdue'),
        defaultValue: 'pending',
    },
    Progress: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
    },
    StartTime: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    EndTime: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    timestamps: true,
});

module.exports = Task;
