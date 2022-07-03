import { Component, OnInit } from '@angular/core';
import { IWorkflow, STATUS } from 'src/app/types/workflow.model';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.css']
})
export class WorkflowComponent implements OnInit {
  allWorkFlowsOfThisUser: Array<IWorkflow> = [];
  showWorkFlows: Array<IWorkflow> = [];
  userID = 'user1';

  constructor(private mainService: MainService) { }

  ngOnInit(): void {
    this.mainService.getAllWorkFlows.subscribe((allWorkFlows) => {
      this.allWorkFlowsOfThisUser = allWorkFlows.filter((workFlow) => workFlow.userID === this.userID );
      this.showWorkFlows = this.allWorkFlowsOfThisUser;
    })
  }

  makeItPending(name: string): void {
    this.mainService.updateStatus(name, STATUS.PENDING, this.userID);
  }

  makeItComplete(name: string): void {
    this.mainService.updateStatus(name, STATUS.COMPLETED, this.userID);
  }

  removeIt(name: string): void {
    this.mainService.deleteWorkFlow(name, this.userID);
  }

  addWorkFlow(name: string): void {
    this.mainService.addWorkFlow(name, this.userID);
    this.filterWorkFlows('All');
  }

  filterWorkFlows(filterType: string): void {
    switch (filterType) {
      case 'All':
        this.showWorkFlows = this.allWorkFlowsOfThisUser;
        break;
      case 'Completed':
        this.showWorkFlows = this.allWorkFlowsOfThisUser.filter((flow) => flow.status === STATUS.COMPLETED);
        break;
      case 'Pending':
        this.showWorkFlows = this.allWorkFlowsOfThisUser.filter((flow) => flow.status === STATUS.PENDING);
        break;
    }
  }

  searchWorkFlow(name: string): void {
    this.showWorkFlows = this.allWorkFlowsOfThisUser.filter((flow) => flow.name === name);
  }
}
