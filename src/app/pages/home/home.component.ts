import { Component, OnInit } from '@angular/core';
import { TaskService } from "../../services/task-service.service";
import { Task } from "../../types/task";
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  userHasNoData: boolean = false;
  tasks: Task[] = [];

  constructor(
    private taskService: TaskService,
    private snackBar: MatSnackBar
  ) { }

  async ngOnInit() {
    await this.loadTasks();
  }

  async loadTasks() {
    this.taskService.getTasks().pipe(
      catchError(error => {
        console.log(error);
        return of([]);
      }),
      map(data => {
        this.tasks = data;
        if(this.tasks && this.tasks.length <= 0) {
          this.userHasNoData = true;
        }
      })
    ).subscribe();
  }

  deleteTask(id: number | undefined) {
    const snackMsg = this.snackBar.open('Removing the task...')

    this.taskService.deleteTask(id).pipe(
      catchError(error => {
        console.log(error);
        return of([]);
      })
    ).subscribe({
      next: () => {
        snackMsg.dismiss();
        this.snackBar.open('Task removed Successfully!', '', {
          duration: 3000
        });
      },
      error: () => {
        snackMsg.dismiss();
        this.snackBar.open('Error removing the task!', '', {
          duration: 3000
        });
      }
    });

    const index = this.tasks.findIndex(task => task.id == id);
    this.tasks.splice(index, 1);
  }

  sortTasks(a:any, b:any) {
    if (a.status !== 'done' && b.status === 'done') {
      return -1;
    } else {
      return 1;
    }
  }

  async changeStatus(task: Task, status: string){
    const snackMsg = this.snackBar.open('Changing the status...')

    task.status = status;
    this.taskService.editTask(task).pipe(
      catchError(error => {
        console.log(error);
        return of([]);
      })
    ).subscribe({
      next: () => {
        snackMsg.dismiss();
        this.snackBar.open('Task status changed Successfully!', '', {
          duration: 3000
        });
      },
      error: () => {
        snackMsg.dismiss();
        this.snackBar.open('Error changing the status!', '', {
          duration: 3000
        });
      }
    });
  }

}
