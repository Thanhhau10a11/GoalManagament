// Seed data script (seeds.js)

const  User  = require('./models/User');
const  Goal  = require('./models/Goal');
const  DayPlan  = require('./models/DayPlan');
const  Task  = require('./models/Task');
const  Follower  = require('./models/Follower');    

async function createTestData() {
  // Tạo user
  const user = await User.create({
    Name: 'John Doe',
    Email: 'john.doe@example.com',
    Password: 'hashed_password',
    Role: 'user'
  });

  // Tạo goal
  const goal = await Goal.create({
    UserID: user.UserID,
    GoalTitle: 'Learn Node.js',
    Description: 'Complete a Node.js course and build an API.',
    TargetDate: new Date('2024-12-31'),
    Visibility: 'public',
    Status: 'in-progress',
    Progress: 30
  });

  // Tạo day plan
  const dayPlan = await DayPlan.create({
    GoalID: goal.GoalID,
    Date: new Date('2024-12-01'),
    Notes: 'Focus on learning Express.js framework.',
    Status: 'in-progress',
    Progress: 50
  });

  // Tạo task
  await Task.create({
    DayPlanID: dayPlan.DayPlanID,
    Title: 'Complete Express.js tutorial',
    Description: 'Complete the first part of the tutorial.',
    Priority: 'high',
    Status: 'in-progress',
    Progress: 60,
    StartTime: new Date('2024-12-01T09:00:00'),
    EndTime: new Date('2024-12-01T12:00:00')
  });

  // Tạo follower
  await Follower.create({
    GoalID: goal.GoalID,
    UserID: user.UserID
  });

  console.log('Test data has been successfully inserted.');
}

createTestData();
