import { Character } from './../../core/interfaces/character/character.interface';
import { map } from 'rxjs/operators';
import { CharacterRequestService } from './../../core/services/character-request.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Data } from '../../core/interfaces/character/data.interface';

@Injectable({ providedIn: 'root' })
export class CharacterService {
  constructor(private characterService: CharacterRequestService) {}

  getCharacters(): Observable<Data<Character>> {
    return this.characterService
      .charactersRequest()
      .pipe(map((apiResponse) => apiResponse.data));
  }

  getCharacter(id: number): Observable<Data<Character>> {
    return this.characterService
      .characterRequest(id)
      .pipe(map((apiResponse) => apiResponse.data));
  }

  getMoreCharacters(offset: number) {
    return this.characterService
      .MoreCharactersRequest(offset)
      .pipe(map((apiResponse) => apiResponse.data));
  }
}
