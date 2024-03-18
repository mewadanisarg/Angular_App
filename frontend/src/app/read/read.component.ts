import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiserviceService } from '../apiservice.service';
@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrl: './read.component.css',
})
export class ReadComponent {
  constructor(private apiservice: ApiserviceService) {}
  readData: any;
  successmsg: String = '';
  ngOnInit(): void {
    this.getAllData();
  }
  // delete function
  deleteID(id: any) {
    this.apiservice.deleteUser(id).subscribe((res) => {
      console.log(res, 'res ==> User Deleted');
      this.successmsg = res.message;
      this.getAllData();
    });
  }

  getAllData() {
    this.apiservice.getAllUsersData().subscribe((res) => {
      console.log(res, 'res ==> Frontend');
      this.readData = res.data;
    });
  }
}
