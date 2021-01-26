import { faBook, faCalendar, faFilm, faHistory, faMask, faPencilRuler } from '@fortawesome/free-solid-svg-icons';
import { Option } from '../Interfaces/option.interface';

export const menuOption: Option[] = [
  { option: 'Characters', route: '/characters', icon: faMask },
  { option: 'Comics', route: '/comics', icon: faBook },
  { option: 'Series', route: '/series', icon: faFilm },
  { option: 'Stories', route: '/stories', icon: faHistory },
  { option: 'Events', route: '/events', icon: faCalendar },
  { option: 'Creators', route: '/creators', icon: faPencilRuler },
];
