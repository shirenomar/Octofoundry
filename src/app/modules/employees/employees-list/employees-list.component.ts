import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Employee } from 'src/models/employee';
import { FilterConfig } from 'src/models/filter-config';
import { EmployeesServiceService } from 'src/services/employees-service.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit {

  employeesList$: Observable<Employee[]>
  searchKey: string;
  queryParams: string;
  columns = ['id', 'name', 'email', 'date', 'phone', 'country', 'company'];
  constructor(private employeesServiceService: EmployeesServiceService) { }

  ngOnInit(): void {
    this.employeesList$ = this.employeesServiceService.getEmployeesList();
  }


  onFilterChanged($event: any) {
    const filterconfig = $event as FilterConfig[];
    this.employeesList$ = this.employeesServiceService.getEmployeesList().pipe(
      map(employees => {
        let updatedEmpList = employees;
        for (let filter of filterconfig) {
          if (filter.value) {
            updatedEmpList = updatedEmpList.filter((emp) => (emp[filter.field]?.toLowerCase() || '').includes(filter.value.toLowerCase()));
          }
        }
        return updatedEmpList;
      }))
  }

}
