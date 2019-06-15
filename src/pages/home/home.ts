import { Component, OnInit } from '@angular/core';
import {
  NavController, Modal, ModalController, ModalOptions,
  AlertController
} from 'ionic-angular';

import { Task } from '../../providers/task.model';
import { TaskServiceProvider } from '../../providers/task-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  public tasks: Array<Task>;
  public filteredTasks: Array<Task>;

  public searchInput = '';

  constructor(
    public navCtrl: NavController,
    private taskService: TaskServiceProvider,
    private modal: ModalController,
    public alertCtrl: AlertController
  ) {
    this.tasks = [];
  }

  ngOnInit() {
    this.taskService.getList().subscribe((data) => {
      this.tasks = data;
      this.updateFilter();
    });
  }

  updateFilter() {
    this.filteredTasks = this.tasks.filter((task) => {
      return this.searchInput == '' ||
        task.text.toLowerCase().indexOf(this.searchInput.toLowerCase()) > -1;
    });
  }

  onItemClick(event: Event, task: Task) {
    task.completed = !task.completed;
    this.taskService.updateTask(task);
  }

  onSearchInput(event: Event) {
    this.updateFilter();
  }

  onAddClick(event: Event) {
    let prompt = this.alertCtrl.create({
      title: 'New task',
      message: '',
      inputs: [{
        name: 'task',
        placeholder: 'Task'
      }],
      buttons: [{
        text: 'Add',
        handler: data => {
          let newTask = new Task(null, data.task, false);
          this.taskService.addTask(newTask).subscribe((task) => {
           this.tasks.push(task);
           this.updateFilter();
          });
        }
      }]
    });
    prompt.present();
  }

  onDeleteClick(task: Task) {
    console.log('onDeleteClick', task);
    this.taskService.deleteTask(task).subscribe(() => {
      this.tasks.splice(this.tasks.indexOf(task), 1);
      this.updateFilter();
    });
  }

}
