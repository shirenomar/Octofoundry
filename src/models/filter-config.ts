import { Employee } from "./employee";

export class FilterConfig {
    field: keyof Employee;
    value: string;
}