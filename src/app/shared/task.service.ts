import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private firebase: AngularFireDatabase) {}
  taskList: AngularFireList<any>;

  form = new FormGroup({
    $key: new FormControl(null),
    Task_Todo: new FormControl('', Validators.required),
    Task_Description: new FormControl(''),
    Start: new FormControl(''),
    Due: new FormControl('', Validators.required),
  });

  getTasks() {
    this.taskList = this.firebase.list('tasks');
    return this.taskList.snapshotChanges();
  }

  insertTask(task) {
    this.taskList.push({
      Task_Todo: task.Task_Todo,
      Task_Description: task.Task_Description,
      Start: task.Start,
      Due: task.Due,
    });
  }

  populateForm(task) {
    this.form.setValue(task);
  }

  updateTask(task) {
    this.taskList.update(task.$key, {
      Task_Todo: task.Task_Todo,
      Task_Description: task.Task_Description,
      Start: task.Start,
      Due: task.Due,
    });
  }

  deleteTask($key: string) {
    this.taskList.remove($key);
  }
}
