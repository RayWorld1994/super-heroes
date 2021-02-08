import { Character } from './../../core/interfaces/character/character.interface';
import { map } from 'rxjs/operators';
import { CharacterRequestService } from './../../core/services/character-request.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Data } from '../../core/interfaces/data.interface';

@Injectable({ providedIn: 'root' })
export class CharacterService {
  constructor(private characterService: CharacterRequestService) {}

  getCharacters(order: string): Observable<Data<Character[]>> {
    return this.characterService
      .charactersRequest(order)
      .pipe(map((apiResponse) => apiResponse.data));
  }

  getCharacter(id: number): Observable<Data<Character[]>> {
    return this.characterService
      .characterRequest(id)
      .pipe(map((apiResponse) => apiResponse.data));
  }

  getMoreCharacters(
    offset: number,
    order: string
  ): Observable<Data<Character[]>> {
    return this.characterService
      .MoreCharactersRequest(offset, order)
      .pipe(map((apiResponse) => apiResponse.data));
  }

  filterCharacterByName(name: string): Observable<Data<Character[]>> {
    return this.characterService
      .filterCharacterByNameRequest(name)
      .pipe(map((apiResponse) => apiResponse.data));
  }
}
