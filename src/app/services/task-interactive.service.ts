// import { Injectable, EventEmitter } from '@angular/core';
// import {BehaviorSubject, Observable} from 'rxjs';
// import {Task} from "./task";
//
// @Injectable({
//   providedIn: 'root'
// })
// export class TaskInteractionService {
//   private addTaskEmitter: EventEmitter<Task> = new EventEmitter<Task>();
//   private updateTaskEmitter: EventEmitter<Task> = new EventEmitter<Task>();
//   private onClickEmitter: EventEmitter<string> = new EventEmitter<string>();
//
//   onClick(status: string) {
//     this.onClickEmitter.emit(status);
//   }
//
//   addTask(task: Task) {
//     this.addTaskEmitter.emit(task);
//   }
//
//   updateTask(task: Task) {
//     this.updateTaskEmitter.emit(task);
//   }
//
//   onClickStatus(): Observable<string> {
//     return this.onClickEmitter.asObservable();
//   }
//
//   onAddTask(): Observable<Task | null> {
//     return this.addTaskEmitter.asObservable();
//   }
//
//   onUpdateTask(): Observable<Task> {
//     return this.updateTaskEmitter.asObservable();
//   }
// }


import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Task } from "./task";

@Injectable({
  providedIn: 'root'
})
export class TaskInteractionService {
  private addTaskEmitter: ReplaySubject<Task> = new ReplaySubject<Task>(1);
  private updateTaskEmitter: ReplaySubject<Task> = new ReplaySubject<Task>(1);
  private onClickEmitter: ReplaySubject<string> = new ReplaySubject<string>(1);

  onClick(status: string) {
    this.onClickEmitter.next(status);
  }

  addTask(task: Task) {
    this.addTaskEmitter.next(task);
  }

  updateTask(task: Task) {
    this.updateTaskEmitter.next(task);
  }

  onClickStatus() {
    return this.onClickEmitter.asObservable();
  }

  onAddTask() {
    return this.addTaskEmitter.asObservable();
  }

  onUpdateTask() {
    return this.updateTaskEmitter.asObservable();
  }
}
