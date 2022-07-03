import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { INode, NODE_STATUS } from '../types/nodes.model';
import { MainService } from './main.service';

@Injectable({
  providedIn: 'root'
})
export class NodesService {

  //main database
  allNodes: Array<INode> = [
    {
      title: 'Task3',
      content: 'This is the task 3',
      position: 2,
      workFlow: 'WorkFlow-1',
      userID: 'user1',
      status: NODE_STATUS.PENDING
    },
    {
      title: 'Task1',
      content: 'This is the task 1',
      position: 0,
      workFlow: 'WorkFlow-1',
      userID: 'user1',
      status: NODE_STATUS.COMPLETED
    },
    {
      title: 'Task2',
      content: 'This is the task 2',
      position: 1,
      workFlow: 'WorkFlow-1',
      userID: 'user1',
      status: NODE_STATUS.IN_PROGRESS
    },
    {
      title: 'Task1',
      content: 'This is the task 1',
      position: 1,
      workFlow: 'WorkFlow-2',
      userID: 'user1',
      status: NODE_STATUS.COMPLETED
    }
  ];
  //subject of all data
  private nodesSubject = new BehaviorSubject(this.allNodes);
  //subject as Observable to subscribe in children
  getAllNodes = this.nodesSubject.asObservable();

  constructor(private mainService: MainService) { }

  saveNewValues(newNodes: Array<INode>, oldWorkFlowName: string, newWorkFlowName: string, userID: string): void {
    newNodes.forEach(node => {
      const newNode: INode = {
        title: node.title,
        content: node.content,
        position: node.position,
        status: node.status,
        userID: userID,
        workFlow: newWorkFlowName
      }
      this.allNodes.push(newNode);
    });
    this.mainService.updateWorkFlowName(oldWorkFlowName, newWorkFlowName, userID);
    console.log('after saving new node : ', this.allNodes);
  }

  removeTheseNodes(nodes: Array<INode>): void {
    nodes.forEach(node => {
      const index = this.allNodes.findIndex(n => n.userID === node.userID && n.workFlow === node.workFlow);
      console.log(this.allNodes[index]);
      this.allNodes.splice(index, 1);
    });
  }

  removeLastNode(node: INode): void {
    const index = this.allNodes.findIndex(n => n.title === node.title && n.userID === node.userID && n.workFlow === node.workFlow);
    this.allNodes.splice(index, 1);
    this.nodesSubject.next(this.allNodes);
  }

}

