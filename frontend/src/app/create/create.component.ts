import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from 'app/apiservice.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateComponent {
  service: any;
  form: any;
  constructor(
    private apiservice: ApiserviceService,
    private router: ActivatedRoute
  ) {}

  errormsg: any;
  successmsg: String = '';
  getparamid: any;
  updatemsg: String = '';

  ngOnInit(): void {
    console.log(this.router.snapshot.paramMap.get('id'), 'getid');
    this.getparamid = this.router.snapshot.paramMap.get('id');
    // To fetch the data from the database
    if (this.getparamid != null) {
      this.apiservice.getSingleUser(this.getparamid).subscribe((res) => {
        console.log(res);
        this.userForm.patchValue({
          fullname: res.data[0].fullname,
          email: res.data[0].email,
          mobile: res.data[0].mobile,
        });
      });
    }
  }

  userForm = new FormGroup({
    fullname: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    mobile: new FormControl('', Validators.required),
  });

  // Submit Function
  userSubmit() {
    if (this.userForm.valid) {
      console.log(this.userForm.value);

      this.apiservice.createUser(this.userForm.value).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err) => {
          console.log(err);
          this.errormsg = err;
        },
        complete: () => {
          this.userForm.reset();
          this.successmsg = 'User Created Successfully';
        },
      });
    } else {
      this.errormsg = 'All fields are required!';
    }
  }

  // Update Function
  userUpdate() {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
      if (this.userForm.valid) {
        this.apiservice
          .updateUser(this.getparamid, this.userForm.value)
          .subscribe({
            next: (data) => {
              console.log(data, 'data updated');
            },
            error: (err) => {
              console.log(err);
              this.errormsg = err;
            },
            complete: () => {
              this.userForm.reset();
              this.updatemsg = 'User Updated Successfully';
            },
          });
      }
    }
  }
}
