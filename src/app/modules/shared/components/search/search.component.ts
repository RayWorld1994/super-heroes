import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Output() search = new EventEmitter();
  @Input() whatSearch!: string;
  @Input() placeholder!: string;

  searchForm = this.fb.group({
    name: [''],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  onSubmit() {
    this.search.next(this.searchForm.value);
  }
}
