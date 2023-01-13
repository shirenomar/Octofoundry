import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { Employee } from 'src/models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeesServiceService {

  constructor(private http: HttpClient) { }

  getEmployeesList(): Observable<Employee[]> {
    return this.http.get<any>("./assets/employees.json").pipe(map((respons) => respons.data.employees));
  }

  getCountries(): Observable<any> {
    return this.http.get<any>(`https://api.covid19api.com/countries`).pipe(tap(response => console.log(response)))
  }
}
