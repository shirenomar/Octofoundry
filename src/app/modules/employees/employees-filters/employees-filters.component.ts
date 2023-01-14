import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Employee } from 'src/models/employee';
import { FilterConfig } from 'src/models/filter-config';
import { EmployeesServiceService } from 'src/services/employees-service.service';

@Component({
  selector: 'app-employees-filters',
  templateUrl: './employees-filters.component.html',
  styleUrls: ['./employees-filters.component.scss']
})
export class EmployeesFiltersComponent implements OnInit {

  filterForm!: FormGroup;
  filterConfig: FilterConfig[] = [];
  employee = new Employee();
  countries$: Observable<any>;
  constructor(private formBuilder: FormBuilder, private employeesServiceService: EmployeesServiceService,
    private datepipe: DatePipe, private router: Router, private activatedRoute: ActivatedRoute) { }

  @Output() onFilterEvent = new EventEmitter<FilterConfig[]>();
  ngOnInit(): void {

    this.employee = this.activatedRoute.snapshot.queryParams as Employee;
    this.countries$ = this.employeesServiceService.getCountries();
    this.filterForm = this.formBuilder.group({
      email: [this.employee.email],
      phoneNumber: [this.employee.phoneNumber],
      company: [this.employee.company],
      country: [this.employee.country],
      date: [this.employee.date]

    });

    if (this.employee) {
      if (this.employee.date) {
        this.filterForm.controls['date'].setValue(new Date(this.employee.date));
      }
      this.onSubmit()
    }


  }

  onSubmit() {

    this.filterConfig = [];
    for (let field in this.filterForm.value) {
      const key = field as keyof Employee;
      if (field == 'date' && this.filterForm.value[field]) {
        this.filterConfig.push({ field: key, value: this.updateDateFormat(field) });
      }
      else {
        this.filterConfig.push({ field: key, value: this.filterForm.value[field] });
      }
    }
    this.onFilterEvent.emit(this.filterConfig)
    this.updateQueryParams();

  }

  updateDateFormat(key: string) {
    return this.datepipe.transform(this.filterForm.value[key], 'dd-MMM-yyyy') || ''
  }

  updateQueryParams() {
    this.router.navigate([], { relativeTo: this.activatedRoute, queryParams: this.filterForm.value, queryParamsHandling: 'merge' });
  }

  onReset() {
    this.onFilterEvent.emit([])
    this.filterForm?.reset();
    this.updateQueryParams();
  }

}
