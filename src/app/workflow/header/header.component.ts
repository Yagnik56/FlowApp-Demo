import { EventEmitter,Component, OnInit,Output } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() filterType = new EventEmitter<string>();
  @Output() searchName = new EventEmitter<string>();
  userID = 'user1';

  constructor(private mainService: MainService) { }

  ngOnInit(): void {
  }

  newFlowCreated(newName: string): void {
    console.log('new value is : ', newName);
    this.mainService.addWorkFlow(newName,this.userID);
  }

  sendFilter(filter: string): void {
    this.filterType.emit(filter);
  }

  sendSearch(name: string): void {
    this.searchName.emit(name);
  }
}
