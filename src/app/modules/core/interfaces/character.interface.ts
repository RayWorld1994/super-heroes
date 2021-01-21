import { Stories } from './stories.interfaces';
import { Comics } from './comics.interface';
import { Thumbnail } from './thumbnail.intarface';
import { Events } from './events.interfaces';
import { Series } from './series.interface';
import { Url } from './url.interface';

export interface Character {
  id: string;
  name: string;
  description: string;
  modified: string;
  resourceURI: string;
  urls: Url[];
  thumbnail: Thumbnail;
  comics: Comics;
  stories: Stories;
  events: Events;
  series: Series;
}
