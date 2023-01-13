import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { EmployeesServiceService } from 'src/services/employees-service.service';

@Component({
  selector: 'app-employees-filters',
  templateUrl: './employees-filters.component.html',
  styleUrls: ['./employees-filters.component.scss']
})
export class EmployeesFiltersComponent implements OnInit {

  filterForm!: FormGroup;
  countries$: Observable<any>;
  constructor(private formBuilder: FormBuilder, private employeesServiceService: EmployeesServiceService) { }

  ngOnInit(): void {
    this.countries$ = this.employeesServiceService.getCountries();
    this.filterForm = this.formBuilder.group({
      email: [''],
      phoneNumber: [''],
      company: [''],
      country: [null],
      date: ['']

    });

  }

}
