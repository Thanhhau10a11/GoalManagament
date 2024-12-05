const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const goalRoutes = require('./routes/goalRoutes');
const dayPlanRoutes = require('./routes/dayPlanRoutes');
const taskRoutes = require('./routes/taskRoutes');
const followerRoutes = require('./routes/followerRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();
const app = express();
app.use(morgan('dev')); 

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Test database connection
sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.error('Error:', err));

// Routes
app.use('/api', userRoutes);
app.use('/api', goalRoutes);
app.use('/api', dayPlanRoutes);
app.use('/api', taskRoutes); 
app.use('/api', followerRoutes); 
app.use('/api/auth', authRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
