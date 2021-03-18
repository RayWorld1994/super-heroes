import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { ComicService } from 'src/app/modules/comics/services/comic.service';
import { Comic } from 'src/app/modules/core/interfaces/comic/comic.interface';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs/operators';
import { SelectOneOptionValidator } from '../../validators/select-one-option.validator';
import * as characterActions from 'src/app/modules/core/store/actions/character.action';
@Component({
  selector: 'app-filter-character',
  templateUrl: './filter-character.component.html',
  styleUrls: ['./filter-character.component.scss'],
})
export class FilterCharacterComponent implements OnInit {
  filterForm!: FormGroup;
  comicList!: Observable<Comic[]>;

  constructor(
    private comicService: ComicService,
    private fb: FormBuilder,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.generateForm();
    this.onComicList();
  }

  generateForm() {
    this.filterForm = this.fb.group({
      byName: [''],
      byComic: ['', SelectOneOptionValidator()],
      byStory: [''],
    });
  }

  onComicList() {
    this.comicList = this.filterForm.get('byComic')?.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((comicName: string | Comic) => {
        if (typeof comicName === 'string') {
          if (comicName.trim() !== '') {
            return this.comicService.comicsAutoComplete(comicName);
          }
        }
        return of([]);
      }),
    ) as Observable<Comic[]>;
  }

  displayTitle(comic: Comic) {
    if (comic) {
      return comic.title;
    }
    return '';
  }

  onSubmit() {
    if (this.filterForm.valid) {
      this.store.dispatch(
        characterActions.filterCharacters({
          filter: {
            byComic: this.byComicControl?.value
              ? (this.byComicControl.value as Comic).id.toString()
              : '',
            byName: this.byNameControl?.value,
            byStory: this.byStoryControl?.value,
          },
        })
      );
    }
  }

  onReset() {
    this.filterForm.reset();
  }

  get byComicControl() {
    return this.filterForm.get('byComic');
  }
  get byNameControl() {
    return this.filterForm.get('byName');
  }
  get byStoryControl() {
    return this.filterForm.get('byStory');
  }

  cleanInputComic() {
    this.byComicControl?.setValue('');
  }
  cleanInputName() {
    this.byNameControl?.setValue('');
  }
  cleanInputStory() {
    this.byStoryControl?.setValue('');
  }
}
