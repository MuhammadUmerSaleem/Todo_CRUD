import { Component, OnInit } from '@angular/core';
import { TaskService } from '../shared/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  constructor(public taskService: TaskService) {}
  submitted: boolean;
  showSuccessMessage: boolean;
  formControls = this.taskService.form.controls;

  ngOnInit(): void {}

  onSubmit() {
    this.submitted = true;
    if (this.taskService.form.valid) {
      if (this.taskService.form.get('$key').value == null) {
        this.taskService.insertTask(this.taskService.form.value);
      } else {
        this.taskService.updateTask(this.taskService.form.value);
      }
      this.showSuccessMessage = true;
      setTimeout(() => (this.showSuccessMessage = false), 3000);

      this.submitted = false;
      this.taskService.form.reset();
    }
  }
}
