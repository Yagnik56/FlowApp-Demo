import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IWorkflow, STATUS } from '../types/workflow.model';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  allWorkflows: Array<IWorkflow> = [
    {
      name: 'WorkFlow-1',
      status: STATUS.COMPLETED,
      isChangable: true,
      userID: 'user1'
    },
    {
      name: 'WorkFlow-2',
      status: STATUS.PENDING,
      isChangable: false,
      userID: 'user1'
    },{
      name: 'WorkFlow-3',
      status: STATUS.COMPLETED,
      isChangable: false,
      userID: 'user1'
    },
    {
      name: 'WorkFlow-4',
      status: STATUS.PENDING,
      isChangable: true,
      userID: 'user1'
    },{
      name: 'WorkFlow-5',
      status: STATUS.COMPLETED,
      isChangable: true,
      userID: 'user1'
    },
    {
      name: 'WorkFlow-6',
      status: STATUS.PENDING,
      isChangable: true,
      userID: 'user2'
    },{
      name: 'WorkFlow-7',
      status: STATUS.COMPLETED,
      isChangable: true,
      userID: 'user2'
    }
  ];

  //subject of all data
  private workFlowSubject = new BehaviorSubject(this.allWorkflows);
  //subject as Observable to subscribe in children
  getAllWorkFlows = this.workFlowSubject.asObservable();

  constructor() { }
  
  updateStatus(name: string, status: STATUS, userID: string): void {
    const index = this.allWorkflows.findIndex(wflow => wflow.name === name);
    if (index > -1 && this.allWorkflows[index].userID === userID) {
      if (this.allWorkflows[index].isChangable) {
        this.allWorkflows[index].status = status;
        console.log('updated status of', name,' = ', this.allWorkflows[index]);
        return;
      } else {
        console.log('Can not update this workFlow as all of its node are not completed.');
        return;
      }
    }
    console.log('Can not find this workFlow to update.');
  }

  deleteWorkFlow(name: string, userID: string): void {
    const index = this.allWorkflows.findIndex(wflow => wflow.name === name && wflow.userID === userID);
    console.log('index = ', index);
    this.allWorkflows.splice(index, 1);
    this.workFlowSubject.next(this.allWorkflows);
    console.log('WorkFlow', name, ' is deleted Successfully.', this.allWorkflows);
  }

  addWorkFlow(name: string,userID:string): void {
    const index = this.allWorkflows.findIndex(wflow => wflow.name === name && wflow.userID === userID);
    if (index === -1) {
      this.allWorkflows.push({name: name, status: STATUS.PENDING, isChangable: false, userID: userID});
      this.workFlowSubject.next(this.allWorkflows);
      console.log('WorkFlow', name,' is created successfully.', this.allWorkflows);
      return;
    }
    console.log('Can not save this workflow, There is already one with the same name.');
  }

  updateWorkFlowName(oldName: string, newName: string, usreID: string): void {
    console.log('Here ', oldName, newName);
    const index = this.allWorkflows.findIndex(workFlow => workFlow.userID === usreID && workFlow.name === oldName);
    this.allWorkflows[index].name = newName;
    this.workFlowSubject.next(this.allWorkflows);
  }
}
