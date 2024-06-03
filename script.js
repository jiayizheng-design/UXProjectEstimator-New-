
        function updateSubtasks(subtaskDivId, checkbox) {
            var subtaskDiv = document.getElementById(subtaskDivId);
            subtaskDiv.style.display = checkbox.checked ? 'block' : 'none';
        }

        function calculateProjectSize() {
            var totalDays = 0;
            var selectedTasks = [];

            var tasks = document.getElementsByName('task');
            for (var i = 0; i < tasks.length; i++) {
                if (tasks[i].checked) {
                    selectedTasks.push(tasks[i].value);
                    var subtasks = document.getElementsByName('subtask');
                    for (var j = 0; j < subtasks.length; j++) {
                        if (subtasks[j].checked && subtasks[j].id.startsWith(tasks[i].id)) {
                            selectedTasks.push(tasks[i].value + ' - ' + subtasks[j].value);
                        }
                    }
                }
            }

            var sizeLevel = document.querySelector('input[name="sizeLevel"]:checked');
            if (sizeLevel) {
                totalDays += parseFloat(sizeLevel.value);
            }

            var concurrentWorks = parseInt(document.getElementById('concurrentWorks').value) || 0;
            totalDays += concurrentWorks * 1.5;

            var weeklyMeetingHours = parseInt(document.getElementById('weeklyMeetingHours').value) || 0;
            var projectWeeks = totalDays / 5;
            var totalMeetingDays = (weeklyMeetingHours * projectWeeks) / 8;
            totalDays += totalMeetingDays;

            var projectSize = '';
            if (totalDays <= 21) {
                projectSize = 'Small Project';
            } else if (totalDays <= 42) {
                projectSize = 'Medium Project';
            } else {
                projectSize = 'Large Project';
            }

            var projectName = document.getElementById('projectName').value;

            document.getElementById('resultText').innerText = `Project Name: ${projectName}\nEstimated Total Days: ${totalDays.toFixed(2)}\nSelected Tasks: ${selectedTasks.join(', ')}\nProject Size: ${projectSize}`;
        }
