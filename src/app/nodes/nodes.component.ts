import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';  
import { INode } from 'src/app/types/nodes.model';
import { NodesService } from 'src/app/services/nodes.service';

@Component({
  selector: 'app-nodes',
  templateUrl: './nodes.component.html',
  styleUrls: ['./nodes.component.css']
})
export class NodesComponent implements OnInit {
  workFlowName: any = '';
  userID = 'user1';
  allNodesForWorkFlow: Array<INode> = [];

  constructor(
    private route: ActivatedRoute,
    private nodesService: NodesService
  ) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => this.workFlowName = params.get('workFlowName'));
    this.nodesService.getAllNodes.subscribe((allNodes) => {
      this.allNodesForWorkFlow = allNodes.filter(node => node.userID === this.userID && node.workFlow === this.workFlowName);
      console.log(this.allNodesForWorkFlow);
    })
  }

  saveButtonPressed(event: Event): void {
    this.nodesService.removeTheseNodes(this.allNodesForWorkFlow);
    this.allNodesForWorkFlow.forEach((node, index) => {
      const newName = (<HTMLInputElement>document.getElementById(`node_${node.title}`)).value;
      const newContent = (<HTMLInputElement>document.getElementById(`content_${node.title}`)).value;
      this.allNodesForWorkFlow[index].title = newName;
    });
    this.nodesService.saveNewValues(this.allNodesForWorkFlow, this.workFlowName, event as unknown as string, this.userID);
    this.workFlowName = event;
  }

  deleteButtonPressed(): void {
    const node = this.allNodesForWorkFlow[this.allNodesForWorkFlow.length-1];
    this.nodesService.removeLastNode(node);
  }
}
