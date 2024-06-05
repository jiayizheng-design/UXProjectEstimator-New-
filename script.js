
        document.addEventListener('DOMContentLoaded', () => {
            const taskOptions = {
                'User Research': ['Internal Research', 'External Research', 'Analyzing results'],
                'Journey Map': ['Journey Map'],
                'User flow diagrams': ['User flow diagrams'],
                'Wireframes': ['Wireframes'],
                'Prototype': ['Prototype'],
                'Concept testing meeting': ['ICV review 1', 'Implementation Review 1'],
                'Usability testing': ['Preparing user testing scenarios', 'Conducting user testing sessions', 'Analyzing result'],
                'Refine': ['ICV review 2', 'Implementation Review 2', 'Making design adjustments based on feedback', 'Design Specs', 'Sign off meeting']
            };

            const taskCategory = document.getElementById('task-category');
            const taskOptionsDropdown = document.getElementById('task-options');
            const sizeLevels = document.getElementById('size-levels');
            const calculateBtn = document.getElementById('calculate-btn');
            const resultDiv = document.getElementById('result');
            const projectNameDisplay = document.getElementById('project-name-display');
            const selectedTasksDisplay = document.getElementById('selected-tasks');
            const totalDaysDisplay = document.getElementById('total-days');
            const projectSizeDisplay = document.getElementById('project-size');

            taskCategory.addEventListener('change', (e) => {
                const selectedCategory = e.target.value;
                const options = taskOptions[selectedCategory] || [];
                taskOptionsDropdown.innerHTML = options.map(option => `<option value="${option}">${option}</option>`).join('');
                sizeLevels.classList.add('hidden');
                taskOptionsDropdown.classList.remove('hidden');
            });

            taskOptionsDropdown.addEventListener('change', () => {
                sizeLevels.classList.remove('hidden');
            });

            calculateBtn.addEventListener('click', () => {
                const projectName = document.getElementById('project-name').value;
                const selectedTask = taskOptionsDropdown.value;
                const sizeLevel = document.querySelector('input[name="size-level"]:checked')?.value;
                const concurrentWorks = parseInt(document.getElementById('concurrent-works').value) || 0;
                const meetingHours = parseInt(document.getElementById('meeting-hours').value) || 0;

                if (!selectedTask || !sizeLevel) {
                    alert('Please select a task and size level.');
                    return;
                }

                let totalDays = parseFloat(sizeLevel) + (concurrentWorks * 1.5);
                const weeks = Math.ceil(totalDays / 7);
                const meetingDays = (weeks * meetingHours) / 8; // Assuming 8 working hours in a day
                totalDays += meetingDays;

                let projectSize = 'Small Project';
                if (totalDays > 42) {
                    projectSize = 'Large Project';
                } else if (totalDays > 21) {
                    projectSize = 'Medium Project';
                }

                resultDiv.classList.remove('hidden');
                projectNameDisplay.textContent = `Project Name: ${projectName}`;
                selectedTasksDisplay.textContent = `Selected Task: ${selectedTask}`;
                totalDaysDisplay.textContent = `Total Estimated Days: ${totalDays.toFixed(1)}`;
                projectSizeDisplay.textContent = `Project Size: ${projectSize}`;
            });
        });
