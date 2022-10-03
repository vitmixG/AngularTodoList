import { Component, OnInit } from '@angular/core';
import { User } from "../../model/user";
import { CrudService } from "../../service/crud.service";
import { Router } from "@angular/router";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userObj: User = new User();

  userId: number = 0;
  newFullName: string = '';
  newUserName: string = '';
  newEmail: string = '';
  newPhone: string = '';
  newStreet: string = '';
  newSuite: string = '';
  newCity: string = '';
  newZipCode: string = '';
  submitPressed: boolean = false;
  isValidEmail: boolean = true;
  isPhoneChecked: boolean = false;

  constructor(private crudService: CrudService, private router: Router) { }

  ngOnInit(): void {
    this.userObj = new User();
  }
  addUser() {
    this.userObj.id = this.userId + 1;
    this.userObj.name = this.newFullName;
    this.userObj.username= this.newUserName;
    this.userObj.email = this.newEmail;
    this.userObj.phone = this.newPhone;
    this.userObj.address.street = this.newStreet;
    this.userObj.address.suite = this.newSuite;
    this.userObj.address.city = this.newCity;
    this.userObj.address.zipcode = this.newZipCode;

    this.crudService.addUser(this.userObj).subscribe(r => {
      this.ngOnInit();
    }, error => {
      console.log((error))
      })
    this.submitPressed = true;
    this.clearForm()
    this.goToTodo()
  };

  blurPhoneChecked() {
    if (typeof +this.newPhone === "number" ) {
      this.isPhoneChecked = true;
    }
  }

  emailValidation(value: string) {
    this.isValidEmail = false;
    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    if (EMAIL_REGEXP.test(value)) {
      this.isValidEmail = true;
    }
  }

  goToTodo() {
    this.router.navigate(['/todo']);
  }

  clearForm() {
    this.newFullName = '';
    this.newUserName = '';
    this.newEmail = '';
    this.newPhone = '';
    this.newStreet = '';
    this.newSuite = '';
    this.newCity = '';
    this.newZipCode = '';
  }
}
