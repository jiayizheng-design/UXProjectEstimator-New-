
const tasks = {
    "User Research": ["Internal Research", "External Research", "Analyzing results"],
    "Journey Map": ["Journey Map"],
    "User flow diagrams": ["User flow diagrams"],
    "Wireframes": ["Wireframes"],
    "Prototype": ["Prototype"],
    "Concept testing meeting": ["ICV review 1", "Implementation Review 1"],
    "Usability testing": ["Preparing user testing scenarios", "Conducting user testing sessions", "Analyzing results"],
    "Refine": ["ICV review 2", "Implementation Review 2", "Making design adjustments based on feedback", "Design Specs", "Sign off meeting"]
};

const sizeLevels = [
    { label: "Take a few hours", days: 0.5 },
    { label: "Take 1-2 days", days: 1.5 },
    { label: "Take several days to a week", days: 7 },
    { label: "Take 1-2 weeks", days: 14 }
];

function createTaskSelector(taskCategory, tasks) {
    const container = document.createElement("div");
    const label = document.createElement("label");
    label.textContent = taskCategory;
    container.appendChild(label);

    tasks.forEach(task => {
        const input = document.createElement("input");
        input.type = "checkbox";
        input.id = task;
        input.name = taskCategory;
        input.value = task;
        container.appendChild(input);

        const label = document.createElement("label");
        label.htmlFor = task;
        label.textContent = task;
        container.appendChild(label);

        const select = document.createElement("select");
        select.id = "size-" + task;
        sizeLevels.forEach(level => {
            const option = document.createElement("option");
            option.value = level.days;
            option.textContent = level.label;
            select.appendChild(option);
        });
        container.appendChild(select);
    });

    document.getElementById("tasksContainer").appendChild(container);
}

Object.keys(tasks).forEach(category => {
    createTaskSelector(category, tasks[category]);
});

function calculateProjectSize() {
    let totalDays = 0;
    Object.keys(tasks).forEach(category => {
        tasks[category].forEach(task => {
            const taskCheckbox = document.getElementById(task);
            if (taskChildCheckbox.checked) {
                const sizeSelect = document.getElementById("size-" + task);
                totalDays += parseFloat(sizeSelect.value);
            }
        });
    });

    const concurrentWorks = parseInt(document.getElementById("concurrentWorks").value);
    const additionalDays = concurrentWorks * 1.5;
    totalDays += additionalDays;

    const weeklyMeetings = parseInt(document.getElementById("weeklyMeetings").value);
    const projectWeeks = Math.ceil(totalDays / 7);
    const meetingDays = (weeklyMeetings * projectWeeks) / 8;  // 8 working hours per day
    totalDays += meetingDays;

    let sizeClassification = "Large Project";
    if (totalDays <= 21) sizeClassification = "Small Project";
    else if (totalDays <= 42) sizeClassification = "Medium Project";

    const projectName = document.getElementById("projectName").value;
    const result = `Project Name: ${projectName}, Total Days: ${totalDays.toFixed(2)}, Project Size: ${sizeClassification}`;
    document.getElementById("result").textContent = result;
}
