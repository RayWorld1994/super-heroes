import { List } from './list.interfaces';
import { Thumbnail } from '../thumbnail.intarface';
import { Url } from '../url.interface';

export interface Character {
  id: string;
  name: string;
  description: string;
  modified: string;
  resourceURI: string;
  urls: Url[];
  thumbnail: Thumbnail;
  comics: List;
  stories: List;
  events: List;
  series: List;
}
