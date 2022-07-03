import { Component,Input,Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nodes-header',
  templateUrl: './nodes-header.component.html',
  styleUrls: ['./nodes-header.component.css']
})
export class NodesHeaderComponent implements OnInit {
  @Input() workFlowName = '';
  @Output() saveButtonPressed = new EventEmitter();
  @Output() deleteButtonPressed = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }

  saveClicked(newWorkFlowName: string): void {
    console.log('Save button event gave me ', newWorkFlowName);
    
    this.saveButtonPressed.emit(newWorkFlowName);
  }

  deleteClicked(): void {
    this.deleteButtonPressed.emit();
  }
}
