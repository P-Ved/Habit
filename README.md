# HabitHub - Habit Tracking Website

A modern, responsive habit tracking web application built with HTML, CSS, and JavaScript. This application allows users to track their habits on a weekly or monthly basis, build streaks, and earn achievements.

## Features

- **User Authentication**: Login and signup functionality
- **Dashboard**: Overview of habits, streaks, and achievements
- **Habit Tracking**: Add and track habits on a weekly or monthly basis
- **Progress Visualization**: See your progress with intuitive visual trackers
- **Achievements**: Earn achievements as you build consistent habits
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Pages

1. **Landing Page**: Introduction to the application with features and benefits
2. **Login Page**: User login functionality
3. **Signup Page**: New user registration
4. **Dashboard**: Main interface for tracking habits and viewing progress

## Project Structure

```
Habit Tracker/
├── css/
│   ├── style.css        # Main stylesheet
│   ├── auth.css         # Styles for login/signup pages
│   └── dashboard.css    # Styles for the dashboard
├── js/
│   ├── script.js        # Main JavaScript for landing page
│   ├── auth.js          # Authentication functionality
│   └── dashboard.js     # Dashboard functionality
├── images/              # Image assets
├── index.html           # Landing page
├── login.html           # Login page
├── signup.html          # Signup page
├── dashboard.html       # Dashboard page
└── README.md            # Project documentation
```

## How to Use

1. Open `index.html` in your web browser to view the landing page
2. Click on "Login" or "Sign Up" to access the authentication pages
3. After logging in or signing up, you'll be redirected to the dashboard
4. Use the "New Habit" button to add habits to track
5. Toggle between weekly and monthly views as needed
6. Click on days to mark habits as completed

## Note

This is a front-end only implementation. In a production environment, you would need to:
- Implement a backend server for data persistence
- Add proper authentication with secure password handling
- Set up a database to store user data and habits

## Future Enhancements

- Data persistence using a backend server
- Social sharing functionality
- More detailed analytics and insights
- Mobile app version
- Reminder notifications
