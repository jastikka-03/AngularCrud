import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeeService } from './service/employee.service';
import { Employee } from './models/employee';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  Employeeary : Employee[] = [];

  Employeeformgroup :FormGroup;

  constructor(private empservice: EmployeeService, private fb:FormBuilder){
    this.Employeeformgroup =this.fb.group({
      id:[""],
      name:[""],
      mobileNo:[""],
      emailID:[""]
    })
  }

  ngOnInit(): void {
    this.getemployeees();
  }

  getemployeees(){
    this.empservice.GetEmployee().subscribe(
      response=>{
        console.log(response);
        this.Employeeary = response;
      }
    )
  }

  onsubmit(){
    console.log(this.Employeeformgroup.value);
    if(this.Employeeformgroup.value.id != null && this.Employeeformgroup.value.id !=""){
      this.empservice.UpdateEmployee(this.Employeeformgroup.value).subscribe(response=>{
        console.log(response);
        this.getemployeees();
        this.Employeeformgroup.setValue({
          id:"",
          name:"",
          mobileNo:"",
          emailID:"",
        })
      })
    }
    else{
      this.empservice.CreateEmployee(this.Employeeformgroup.value).subscribe(response=>{
        console.log(response);
        this.getemployeees();
        this.Employeeformgroup.setValue({
          id:"",
          name:"",
          mobileNo:"",
          emailID:"",
        })
      })
    }
  }

  Fillform(emp:Employee){
    this.Employeeformgroup.setValue({
      id:emp.id,
      name:emp.name,
      mobileNo:emp.mobileNo,
      emailID:emp.emailID,
    })
  }
  
  DeleteEmp(id: string){
    this.empservice.DeleteEmployee(id).subscribe(res=>{
      console.log(res);
      this.getemployeees();
    })
  }
  title = 'AngularCrud';
}
