import { List } from '../character/list.interfaces';
import { Thumbnail } from '../thumbnail.intarface';
import { Originalissue } from './originalIssue.interface';

export interface Story {
  id: number;
  title: string;
  description: string;
  resourceURI: string;
  type: string;
  modified: string;
  thumbnail: Thumbnail;
  comics: List;
  series: List;
  events: List;
  characters: List;
  creators: List;
  originalissue: Originalissue;
}
