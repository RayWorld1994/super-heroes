import {
  faBook,
  faBookmark,
  faCalendar,
  faFilm,
  faHistory,
  faMask,
  faPencilRuler,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { Option } from '../Interfaces/option.interface';

export const menuOption: Option[] = [
  { option: 'Bookmarks', route: '/bookmarks', icon: faStar },
  { option: 'Characters', route: '/characters', icon: faMask },
  { option: 'Comics', route: '/comics', icon: faBook },
  { option: 'Stories', route: '/stories', icon: faHistory },
  // { option: 'Series', route: '/series', icon: faFilm },
  // { option: 'Events', route: '/events', icon: faCalendar },
  // { option: 'Creators', route: '/creators', icon: faPencilRuler },
];
