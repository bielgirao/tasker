import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TaskService} from "../../services/task-service.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Task} from "../../services/task";
import {catchError, first, map} from "rxjs/operators";
import {lastValueFrom, of} from "rxjs";

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit{
  id!: number;
  taskData!: Task;

  editTaskForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private form: FormBuilder,
    private taskService: TaskService,
    private snackBar: MatSnackBar,
  ) {
    this.editTaskForm = this.form.group({
      name: ['', [Validators.required, Validators.maxLength(25)]],
      status: ['', Validators.required],
      description: ['', Validators.maxLength(200)],
      deadline: ['', Validators.required],
    })
  }

  async ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    await this.loadTaskData();
  }

  async loadTaskData() {
    try {
      this.taskData = await lastValueFrom(this.taskService.getTaskById(this.id))
    } catch(error) {
      console.log(error)
    }

    this.editTaskForm.setValue({
      name: this.taskData.name,
      status: this.taskData.status,
      description: this.taskData.description,
      deadline: new Date(this.taskData.deadline)
    });
  }


  async submitForm() {
    const snackMsg = this.snackBar.open('Adding the task...')

    const task: Task = {
      id: this.id,
      name: this.editTaskForm.get('name')?.value,
      status: this.editTaskForm.get('status')?.value,
      description: this.editTaskForm.get('description')?.value,
      deadline: new Date(this.editTaskForm.get('deadline')?.value).toISOString(),
    };

    this.taskService.editTask(task).pipe(
      first()
    ).subscribe({
      next: () => {
        snackMsg.dismiss();
        this.snackBar.open('Task edited Successfully!', '', {
          duration: 3000
        });
        this.router.navigate(['/'])
      },
      error: () => {
        snackMsg.dismiss();
        this.snackBar.open('Error editing the task!', '', {
          duration: 3000
        });
      }
    });
  }

}
