import { FieldValue } from 'firebase/firestore';
import { DateExtractInt } from '../types';

export const dateExtractor = (
  date: string | FieldValue | undefined
): DateExtractInt => {
  if (date) {
    let modDate = (date as string).split(' ');
    let modTime = modDate[4].split(':');

    return {
      day: modDate[0],
      month: modDate[1],
      date: modDate[2],
      year: modDate[3],
      hours: modTime[0],
      mins: modTime[1],
      secs: modTime[2],
    };
  }
  return {
    day: '',
    month: '',
    date: '',
    year: '',
    hours: '',
    mins: '',
    secs: '',
  };
};
