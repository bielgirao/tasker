import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Task} from '../../services/task';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TaskService} from "../../services/task-service.service";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  addTaskForm: FormGroup;

  constructor(
    private form: FormBuilder,
    private taskService: TaskService,
    private snackBar: MatSnackBar,
  ) {
    this.addTaskForm = this.form.group({
      name: ['', [Validators.required, Validators.maxLength(25)]],
      status: ['', Validators.required],
      description: ['', Validators.maxLength(200)],
      deadline: ['', Validators.required],
    })
  }

  ngOnInit() { }

  async submitForm() {
    const snackMsg = this.snackBar.open('Adding the task...')

    const task: Task = {
      name: this.addTaskForm.get('name')?.value,
      status: this.addTaskForm.get('status')?.value,
      description: this.addTaskForm.get('description')?.value,
      deadline: new Date(this.addTaskForm.get('deadline')?.value).toISOString(),
    };

    let timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    this.taskService.addTask(task).pipe(
      first()
    ).subscribe({
      next: () => {
        snackMsg.dismiss();
        this.resetForm();
        this.snackBar.open('Task added Successfully!', '', {
          duration: 3000
        });
      },
      error: () => {
        snackMsg.dismiss();
        this.snackBar.open('Error adding task!', '', {
          duration: 3000
        });
      }
    });
  }

  resetForm() {
    this.addTaskForm.reset();

    Object.keys(this.addTaskForm.controls).forEach(key => {
      this.addTaskForm.controls[key].setErrors(null)
    });
  }
}
