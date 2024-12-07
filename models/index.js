// models/index.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql://username:password@localhost:3306/database_name');

const User = require('./User');
const Goal = require('./Goals');
const DayPlan = require('./DayPlan');
const Task = require('./Task');
const Follower = require('./Follower');

// const User = require('./User')(sequelize, DataTypes);
// const Goal = require('./Goal')(sequelize, DataTypes);
// const DayPlan = require('./DayPlan')(sequelize, DataTypes);
// const Task = require('./Task')(sequelize, DataTypes);
// const Follower = require('./Follower')(sequelize, DataTypes);

// Quan hệ
User.hasMany(Goal, { foreignKey: 'UserID' });
Goal.belongsTo(User, { foreignKey: 'UserID' });

Goal.hasMany(DayPlan, { foreignKey: 'GoalID' });
DayPlan.belongsTo(Goal, { foreignKey: 'GoalID' });

DayPlan.hasMany(Task, { foreignKey: 'DayPlanID' });
Task.belongsTo(DayPlan, { foreignKey: 'DayPlanID' });

Goal.hasMany(Follower, { foreignKey: 'GoalID' });
Follower.belongsTo(Goal, { foreignKey: 'GoalID' });

User.hasMany(Follower, { foreignKey: 'UserID' });
Follower.belongsTo(User, { foreignKey: 'UserID' });

module.exports = {
  User,
  Goal,
  DayPlan,
  Task,
  Follower
};
