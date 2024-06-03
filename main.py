import tkinter as tk
from tkinter import messagebox

class UXProjectEstimator:
    def __init__(self, root):
        self.root = root
        self.root.title("UX Project Estimator")

        self.task_options = {
            "User Research": ["Internal", "External", "Analyzing results"],
            "Journey Map": [],
            "User flow diagrams": [],
            "Wireframes": [],
            "Prototype": [],
            "Concept testing meeting": ["ICV review 1", "Implementation Review 1"],
            "Usability testing": ["Preparing user testing scenarios", "Conducting user testing sessions", "Analyzing result"],
            "Refine": ["ICV review 2", "Implementation Review 2", "Making design adjustments based on feedback", "Design Specs", "Sign off meeting"]
        }

        self.size_levels = {
            "Take a few hours": 0.5,
            "Take 1-2 days": 1.5,
            "Take several days to a week": 7,
            "Take 1-2 weeks": 14
        }

        self.selected_tasks = {}
        self.selected_size_levels = {}
        self.create_widgets()

    def create_widgets(self):
        tk.Label(self.root, text="Project Name:").pack()
        self.project_name_entry = tk.Entry(self.root)
        self.project_name_entry.pack()

        self.task_vars = {}
        for task, subtasks in self.task_options.items():
            var = tk.IntVar()
            self.task_vars[task] = var
            cb = tk.Checkbutton(self.root, text=task, variable=var, command=self.update_tasks)
            cb.pack(anchor='w')
            if subtasks:
                self.task_vars[task + "_sub"] = {}
                for subtask in subtasks:
                    sub_var = tk.IntVar()
                    self.task_vars[task + "_sub"][subtask] = sub_var
                    sub_cb = tk.Checkbutton(self.root, text="  " + subtask, variable=sub_var, command=self.update_tasks)
                    sub_cb.pack(anchor='w')
        
        self.size_var = tk.StringVar()
        self.size_radios = []
        for size, days in self.size_levels.items():
            rb = tk.Radiobutton(self.root, text=size, variable=self.size_var, value=size)
            self.size_radios.append(rb)

        tk.Label(self.root, text="Number of Concurrent Works:").pack()
        self.concurrent_works_entry = tk.Entry(self.root)
        self.concurrent_works_entry.pack()

        tk.Label(self.root, text="Regular Weekly Meeting Hours:").pack()
        self.weekly_meeting_hours_entry = tk.Entry(self.root)
        self.weekly_meeting_hours_entry.pack()

        self.calc_button = tk.Button(self.root, text="Calculate Project Size", command=self.calculate_project_size)
        self.calc_button.pack()

    def update_tasks(self):
        for rb in self.size_radios:
            rb.pack_forget()

        for task, var in self.task_vars.items():
            if "_sub" in task:
                continue
            if var.get():
                subtasks = self.task_options.get(task, [])
                if not subtasks:
                    for rb in self.size_radios:
                        rb.pack(anchor='w')
                else:
                    for subtask in self.task_vars[task + "_sub"].values():
                        if subtask.get():
                            for rb in self.size_radios:
                                rb.pack(anchor='w')

    def calculate_project_size(self):
        total_days = 0
        selected_tasks = []

        for task, var in self.task_vars.items():
            if "_sub" in task:
                continue
            if var.get():
                subtasks = self.task_options.get(task, [])
                if not subtasks:
                    size_days = self.size_levels.get(self.size_var.get(), 0)
                    total_days += size_days
                    selected_tasks.append(task)
                else:
                    for subtask, sub_var in self.task_vars[task + "_sub"].items():
                        if sub_var.get():
                            size_days = self.size_levels.get(self.size_var.get(), 0)
                            total_days += size_days
                            selected_tasks.append(f"{task} - {subtask}")

        concurrent_works = int(self.concurrent_works_entry.get() or 0)
        total_days += concurrent_works * 1.5

        weekly_meeting_hours = int(self.weekly_meeting_hours_entry.get() or 0)
        project_weeks = total_days / 5  # Assuming 5 working days per week
        total_meeting_days = (weekly_meeting_hours * project_weeks) / 8  # Assuming 8 working hours per day
        total_days += total_meeting_days

        if total_days <= 21:
            project_size = "Small Project"
        elif total_days <= 42:
            project_size = "Medium Project"
        else:
            project_size = "Large Project"

        project_name = self.project_name_entry.get()

        messagebox.showinfo("Project Size Estimation", f"Project Name: {project_name}\nEstimated Total Days: {total_days:.2f}\nSelected Tasks: {', '.join(selected_tasks)}\nProject Size: {project_size}")

if __name__ == "__main__":
    root = tk.Tk()
    app = UXProjectEstimator(root)
    root.mainloop()
