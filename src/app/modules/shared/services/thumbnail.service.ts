import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThumbnailService {
  constructor() {}

  getThumbnail(size: string, url: string) {
    return `${url}/${size}.jpg`;
  }
}
