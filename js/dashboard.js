// JavaScript for the dashboard page

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const userData = JSON.parse(localStorage.getItem('habitHubUser') || '{}');
    if (!userData.isLoggedIn) {
        // Redirect to login page if not logged in
        window.location.href = 'login.html';
        return;
    }

    // Set user name in the dashboard
    const userNameElement = document.getElementById('user-name');
    const welcomeNameElement = document.getElementById('welcome-name');
    if (userNameElement && userData.name) {
        userNameElement.textContent = userData.name;
    }
    if (welcomeNameElement && userData.name) {
        welcomeNameElement.textContent = userData.name.split(' ')[0]; // First name only
    }

    // Set current date
    const currentDateElement = document.getElementById('current-date');
    if (currentDateElement) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const currentDate = new Date().toLocaleDateString('en-US', options);
        currentDateElement.textContent = currentDate;
    }

    // Handle logout
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Clear user data
            localStorage.removeItem('habitHubUser');
            
            // Redirect to login page
            window.location.href = 'index.html';
        });
    }

    // Toggle between weekly and monthly view
    const viewToggleBtns = document.querySelectorAll('.view-toggle .toggle-btn');
    if (viewToggleBtns.length) {
        viewToggleBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                viewToggleBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get the view type
                const viewType = this.getAttribute('data-view');
                
                // Update the habit cards to show the selected view
                updateHabitView(viewType);
            });
        });
    }

    // Function to update habit view (weekly/monthly)
    function updateHabitView(viewType) {
        const habitCards = document.querySelectorAll('.habit-card');
        
        habitCards.forEach(card => {
            const weeklyTracker = card.querySelector('.weekly-tracker');
            
            if (viewType === 'monthly') {
                // Replace weekly tracker with monthly tracker
                if (weeklyTracker) {
                    const monthlyTracker = createMonthlyTracker();
                    weeklyTracker.parentNode.replaceChild(monthlyTracker, weeklyTracker);
                }
            } else {
                // Replace monthly tracker with weekly tracker
                const monthlyTracker = card.querySelector('.monthly-tracker');
                if (monthlyTracker) {
                    const weeklyTracker = createWeeklyTracker();
                    monthlyTracker.parentNode.replaceChild(weeklyTracker, monthlyTracker);
                }
            }
        });
    }

    // Function to create a monthly tracker
    function createMonthlyTracker() {
        const monthlyTracker = document.createElement('div');
        monthlyTracker.classList.add('monthly-tracker');
        
        // Get current month days
        const now = new Date();
        const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
        
        // Create grid for days
        monthlyTracker.style.display = 'grid';
        monthlyTracker.style.gridTemplateColumns = 'repeat(7, 1fr)';
        monthlyTracker.style.gap = '5px';
        
        // Add day headers (Mon, Tue, etc.)
        const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        dayNames.forEach(dayName => {
            const dayHeader = document.createElement('div');
            dayHeader.classList.add('day-header');
            dayHeader.textContent = dayName;
            dayHeader.style.fontSize = '0.7rem';
            dayHeader.style.textAlign = 'center';
            dayHeader.style.fontWeight = 'bold';
            dayHeader.style.color = 'var(--gray-600)';
            monthlyTracker.appendChild(dayHeader);
        });
        
        // Calculate first day of month offset
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getDay();
        const offset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; // Adjust for Monday start
        
        // Add empty cells for offset
        for (let i = 0; i < offset; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.style.height = '25px';
            monthlyTracker.appendChild(emptyDay);
        }
        
        // Add days of month
        for (let i = 1; i <= daysInMonth; i++) {
            const day = document.createElement('div');
            day.classList.add('day');
            
            const dayStatus = document.createElement('div');
            dayStatus.classList.add('day-status');
            dayStatus.style.width = '25px';
            dayStatus.style.height = '25px';
            dayStatus.style.display = 'flex';
            dayStatus.style.alignItems = 'center';
            dayStatus.style.justifyContent = 'center';
            dayStatus.style.margin = '0 auto';
            dayStatus.style.borderRadius = '50%';
            dayStatus.style.backgroundColor = 'white';
            dayStatus.style.boxShadow = 'var(--shadow-sm)';
            dayStatus.style.fontSize = '0.8rem';
            
            // Randomly mark some days as completed for demo
            if (Math.random() > 0.4 && i <= now.getDate()) {
                day.classList.add('completed');
                dayStatus.style.backgroundColor = 'var(--success-color)';
                dayStatus.innerHTML = '<i class="fas fa-check" style="color: white;"></i>';
            } else {
                dayStatus.textContent = i;
            }
            
            day.appendChild(dayStatus);
            monthlyTracker.appendChild(day);
        }
        
        return monthlyTracker;
    }

    // Function to create a weekly tracker
    function createWeeklyTracker() {
        const weeklyTracker = document.createElement('div');
        weeklyTracker.classList.add('weekly-tracker');
        weeklyTracker.style.display = 'flex';
        weeklyTracker.style.justifyContent = 'space-between';
        
        const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        
        dayNames.forEach((dayName, index) => {
            const day = document.createElement('div');
            day.classList.add('day');
            
            // Randomly mark some days as completed for demo
            if (Math.random() > 0.3 && index < 5) {
                day.classList.add('completed');
            }
            
            const dayLabel = document.createElement('span');
            dayLabel.classList.add('day-label');
            dayLabel.textContent = dayName;
            
            const dayStatus = document.createElement('span');
            dayStatus.classList.add('day-status');
            
            if (day.classList.contains('completed')) {
                dayStatus.innerHTML = '<i class="fas fa-check"></i>';
            } else {
                dayStatus.innerHTML = '<i class="fas fa-circle"></i>';
            }
            
            day.appendChild(dayLabel);
            day.appendChild(dayStatus);
            weeklyTracker.appendChild(day);
        });
        
        return weeklyTracker;
    }

    // Handle Add Habit modal
    const addHabitBtn = document.getElementById('add-habit-btn');
    const addHabitModal = document.getElementById('add-habit-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const cancelBtn = document.querySelector('.cancel-btn');
    
    if (addHabitBtn && addHabitModal) {
        // Open modal
        addHabitBtn.addEventListener('click', function() {
            addHabitModal.classList.add('active');
        });
        
        // Close modal
        const closeModal = () => {
            addHabitModal.classList.remove('active');
        };
        
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', closeModal);
        }
        
        if (cancelBtn) {
            cancelBtn.addEventListener('click', closeModal);
        }
        
        // Close when clicking outside the modal
        window.addEventListener('click', function(e) {
            if (e.target === addHabitModal) {
                closeModal();
            }
        });
    }

    // Handle icon selection in Add Habit form
    const iconOptions = document.querySelectorAll('.icon-option');
    if (iconOptions.length) {
        iconOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Remove selected class from all options
                iconOptions.forEach(opt => opt.classList.remove('selected'));
                
                // Add selected class to clicked option
                this.classList.add('selected');
            });
        });
    }

    // Handle color selection in Add Habit form
    const colorOptions = document.querySelectorAll('.color-option');
    if (colorOptions.length) {
        colorOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Remove selected class from all options
                colorOptions.forEach(opt => opt.classList.remove('selected'));
                
                // Add selected class to clicked option
                this.classList.add('selected');
            });
        });
    }

    // Handle tracking period toggle in Add Habit form
    const trackingToggleBtns = document.querySelectorAll('.tracking-toggle .toggle-btn');
    if (trackingToggleBtns.length) {
        trackingToggleBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                trackingToggleBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
            });
        });
    }

    // Handle Add Habit form submission
    const addHabitForm = document.getElementById('add-habit-form');
    if (addHabitForm) {
        addHabitForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const habitName = document.getElementById('habit-name').value;
            const habitDescription = document.getElementById('habit-description').value || '';
            const selectedIcon = document.querySelector('.icon-option.selected')?.getAttribute('data-icon') || 'fas fa-check';
            const selectedColor = document.querySelector('.color-option.selected')?.getAttribute('data-color') || '#4CAF50';
            const trackingPeriod = document.querySelector('.tracking-toggle .toggle-btn.active')?.getAttribute('data-tracking') || 'weekly';
            
            // Get selected days
            const selectedDays = [];
            document.querySelectorAll('input[name="frequency"]:checked').forEach(checkbox => {
                selectedDays.push(checkbox.value);
            });
            
            // Validate form
            if (!habitName) {
                showNotification('Please enter a habit name', 'error');
                return;
            }
            
            if (selectedDays.length === 0) {
                showNotification('Please select at least one day for your habit', 'error');
                return;
            }
            
            // Create new habit card
            const newHabit = createHabitCard(habitName, habitDescription, selectedIcon, selectedColor, trackingPeriod);
            
            // Add to habits container
            const habitsContainer = document.getElementById('habits-container');
            if (habitsContainer) {
                habitsContainer.prepend(newHabit);
            }
            
            // Update stats
            updateStats();
            
            // Show success message
            showNotification('Habit added successfully!', 'success');
            
            // Close modal and reset form
            addHabitModal.classList.remove('active');
            addHabitForm.reset();
            
            // Reset selected options
            document.querySelector('.icon-option').classList.add('selected');
            document.querySelectorAll('.icon-option:not(:first-child)').forEach(opt => opt.classList.remove('selected'));
            
            document.querySelector('.color-option').classList.add('selected');
            document.querySelectorAll('.color-option:not(:first-child)').forEach(opt => opt.classList.remove('selected'));
            
            document.querySelector('.tracking-toggle .toggle-btn').classList.add('active');
            document.querySelectorAll('.tracking-toggle .toggle-btn:not(:first-child)').forEach(btn => btn.classList.remove('active'));
        });
    }

    // Function to create a new habit card
    function createHabitCard(name, description, icon, color, trackingPeriod) {
        const habitCard = document.createElement('div');
        habitCard.classList.add('habit-card');
        
        // Create habit header
        const habitHeader = document.createElement('div');
        habitHeader.classList.add('habit-header');
        
        const habitIcon = document.createElement('div');
        habitIcon.classList.add('habit-icon');
        habitIcon.style.backgroundColor = color;
        habitIcon.innerHTML = `<i class="${icon}"></i>`;
        
        const habitInfo = document.createElement('div');
        habitInfo.classList.add('habit-info');
        habitInfo.innerHTML = `
            <h3>${name}</h3>
            <p>${description}</p>
        `;
        
        const habitActions = document.createElement('div');
        habitActions.classList.add('habit-actions');
        habitActions.innerHTML = `
            <button class="habit-action-btn"><i class="fas fa-ellipsis-v"></i></button>
        `;
        
        habitHeader.appendChild(habitIcon);
        habitHeader.appendChild(habitInfo);
        habitHeader.appendChild(habitActions);
        
        // Create habit progress
        const habitProgress = document.createElement('div');
        habitProgress.classList.add('habit-progress');
        
        const progressHeader = document.createElement('div');
        progressHeader.classList.add('progress-header');
        
        // For demo, randomly generate progress
        const total = trackingPeriod === 'weekly' ? 7 : 30;
        const completed = Math.floor(Math.random() * (total + 1));
        const streak = Math.floor(Math.random() * 10) + 1;
        
        progressHeader.innerHTML = `
            <span>Progress: ${completed}/${total} days</span>
            <span>Streak: ${streak} days</span>
        `;
        
        habitProgress.appendChild(progressHeader);
        
        // Create tracker based on tracking period
        if (trackingPeriod === 'weekly') {
            habitProgress.appendChild(createWeeklyTracker());
        } else {
            habitProgress.appendChild(createMonthlyTracker());
        }
        
        // Assemble habit card
        habitCard.appendChild(habitHeader);
        habitCard.appendChild(habitProgress);
        
        // Add event listener for completing habits
        const dayStatuses = habitCard.querySelectorAll('.day-status');
        dayStatuses.forEach(status => {
            status.addEventListener('click', function() {
                const day = this.closest('.day');
                if (day) {
                    if (day.classList.contains('completed')) {
                        day.classList.remove('completed');
                        if (trackingPeriod === 'weekly') {
                            this.innerHTML = '<i class="fas fa-circle"></i>';
                        } else {
                            const dayNumber = this.textContent;
                            this.style.backgroundColor = 'white';
                            this.innerHTML = dayNumber;
                        }
                    } else {
                        day.classList.add('completed');
                        this.style.backgroundColor = 'var(--success-color)';
                        this.innerHTML = '<i class="fas fa-check" style="color: white;"></i>';
                    }
                    
                    // Update progress
                    updateHabitProgress(habitCard);
                    
                    // Update stats
                    updateStats();
                    
                    // Check for achievements
                    checkForAchievements();
                }
            });
        });
        
        return habitCard;
    }

    // Function to update habit progress
    function updateHabitProgress(habitCard) {
        const days = habitCard.querySelectorAll('.day');
        const completedDays = habitCard.querySelectorAll('.day.completed');
        
        const progressSpan = habitCard.querySelector('.progress-header span:first-child');
        if (progressSpan) {
            progressSpan.textContent = `Progress: ${completedDays.length}/${days.length} days`;
        }
        
        // Update streak (for demo, just increment by 1 if all days are completed)
        const streakSpan = habitCard.querySelector('.progress-header span:last-child');
        if (streakSpan && completedDays.length === days.length) {
            const currentStreak = parseInt(streakSpan.textContent.match(/\d+/)[0]);
            streakSpan.textContent = `Streak: ${currentStreak + 1} days`;
        }
    }

    // Function to update dashboard stats
    function updateStats() {
        const habitCards = document.querySelectorAll('.habit-card');
        const totalHabits = habitCards.length;
        
        // Count completed habits
        let completedHabits = 0;
        habitCards.forEach(card => {
            const days = card.querySelectorAll('.day');
            const completedDays = card.querySelectorAll('.day.completed');
            if (completedDays.length > 0) {
                completedHabits++;
            }
        });
        
        // Calculate completion rate
        const completionRate = totalHabits > 0 ? Math.round((completedHabits / totalHabits) * 100) : 0;
        
        // Update stats in the dashboard
        const statCards = document.querySelectorAll('.stat-card');
        if (statCards.length >= 4) {
            // Active Habits
            statCards[0].querySelector('h3').textContent = totalHabits;
            
            // Current Streak (for demo, use a random number)
            const currentStreak = Math.floor(Math.random() * 20) + 1;
            statCards[1].querySelector('h3').textContent = currentStreak;
            
            // Achievements (for demo, use a random number)
            const achievements = Math.floor(Math.random() * 10) + 1;
            statCards[2].querySelector('h3').textContent = achievements;
            
            // Completion Rate
            statCards[3].querySelector('h3').textContent = `${completionRate}%`;
        }
    }

    // Function to check for achievements
    function checkForAchievements() {
        // In a real app, this would check for various achievement conditions
        // For demo, we'll just randomly show an achievement notification
        if (Math.random() > 0.7) {
            const achievements = [
                'Habit Starter: Created your first habit',
                '3-Day Streak: Completed a habit for 3 days in a row',
                'Consistency King: Completed all habits for a day',
                'Week Warrior: Maintained a 7-day streak'
            ];
            
            const randomAchievement = achievements[Math.floor(Math.random() * achievements.length)];
            showNotification(`Achievement Unlocked: ${randomAchievement}`, 'success');
        }
    }

    // Helper function to show notifications
    function showNotification(message, type = 'info') {
        // Check if notification container exists, if not create it
        let notificationContainer = document.querySelector('.notification-container');
        if (!notificationContainer) {
            notificationContainer = document.createElement('div');
            notificationContainer.classList.add('notification-container');
            document.body.appendChild(notificationContainer);
            
            // Add styles for the notification container
            notificationContainer.style.position = 'fixed';
            notificationContainer.style.top = '20px';
            notificationContainer.style.right = '20px';
            notificationContainer.style.zIndex = '1000';
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.classList.add('notification', `notification-${type}`);
        notification.textContent = message;
        
        // Style the notification
        notification.style.backgroundColor = type === 'success' ? '#4CAF50' : 
                                           type === 'error' ? '#F44336' : 
                                           type === 'warning' ? '#FF9800' : '#2196F3';
        notification.style.color = 'white';
        notification.style.padding = '12px 20px';
        notification.style.marginBottom = '10px';
        notification.style.borderRadius = '4px';
        notification.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(50px)';
        notification.style.transition = 'opacity 0.3s, transform 0.3s';
        
        // Add to container
        notificationContainer.appendChild(notification);
        
        // Trigger animation
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Remove after delay
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(50px)';
            
            // Remove from DOM after animation completes
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Initialize dashboard
    updateStats();
});
