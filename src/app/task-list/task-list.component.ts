import { Component, OnInit } from '@angular/core';
import { TaskService } from '../shared/task.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  constructor(public taskService: TaskService) {}
  taskArray = [];
  showDeletedMessage: boolean;
  searchText: string = '';

  ngOnInit() {
    this.taskService.getTasks().subscribe((list) => {
      this.taskArray = list.map((item) => {
        return {
          $key: item.key,
          ...item.payload.val(),
        };
      });
    });
  }

  onDelete($key) {
    if (confirm('Are you sure to delete this record')) {
      this.taskService.deleteTask($key);
      this.showDeletedMessage = true;
      setTimeout(() => (this.showDeletedMessage = false), 3000);
    }
  }

  filterCondition(task) {
    return (
      task.Task_Todo.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1
    );
  }
}
