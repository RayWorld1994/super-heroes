import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import * as characterAction from 'src/app/modules/core/store/actions/character.action';

@Component({
  selector: 'app-search-character',
  templateUrl: './search-character.component.html',
  styleUrls: ['./search-character.component.scss'],
})
export class SearchCharacterComponent implements OnInit {
  searchForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<SearchCharacterComponent>,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      byName: [''],
    });
  }

  onSubmit() {
    if (this.searchForm.valid) {
      console.log(this.searchForm.get('byName')?.value);

      this.store.dispatch(
        characterAction.searchCharacter({
          searchName: this.searchForm.get('byName')?.value,
        })
      );
      this.dialogRef.close();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
