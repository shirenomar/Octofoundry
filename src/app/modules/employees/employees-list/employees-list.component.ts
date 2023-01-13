import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Employee } from 'src/models/employee';
import { EmployeesServiceService } from 'src/services/employees-service.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit {

  employeesList$: Observable<Employee[]>
  columns = ['id', 'name', 'email', 'date', 'phone', 'country', 'company'];
  constructor(private employeesServiceService: EmployeesServiceService) { }

  ngOnInit(): void {
    this.employeesList$ = this.employeesServiceService.getEmployeesList().pipe(tap((r) => console.log(r)));
  }

}
