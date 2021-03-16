import { Store } from '@ngrx/store';
import { AFormatComic } from './../../util/arrayFormComic';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilterComic } from 'src/app/modules/core/interfaces/filter-comic.interface';
import * as comicActions from 'src/app/modules/core/store/actions/comic.action';

@Component({
  selector: 'app-filter-comic',
  templateUrl: './filter-comic.component.html',
  styleUrls: ['./filter-comic.component.scss'],
})
export class FilterComicComponent implements OnInit {
  filterForm!: FormGroup;
  formatsComic = AFormatComic;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      titleStartsWith: [''],
      format: [''],
      issueNumber: [null],
    });
  }

  onReset() {
    this.filterForm.reset();
  }

  onSubmit() {
    this.store.dispatch(
      comicActions.filterComics({
        filter: { ...(this.filterForm.value as FilterComic) },
      })
    );
  }

  cleanInputTitle() {
    this.filterForm.get('titleStartsWith')?.setValue('');
  }

  cleanInputIssueNumber() {
    this.filterForm.get('issueNumber')?.setValue(null);
  }
}
