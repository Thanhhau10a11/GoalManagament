const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Goal = sequelize.define('Goal', {
    GoalID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    UserID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    GoalTitle: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    TargetDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    Visibility: {
        type: DataTypes.ENUM('private', 'public'),
        defaultValue: 'private',
    },
    Status: {
        type: DataTypes.ENUM('not-started', 'in-progress', 'achieved'),
        defaultValue: 'not-started',
    },
    Progress: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
    },
}, {
    timestamps: true,
});

module.exports = Goal;
