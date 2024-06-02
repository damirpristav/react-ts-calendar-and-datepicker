type Localization = {
  [key: string]: {
    weekDays: {
      [key: number]: string;
    },
    months: {
      [key: number]: string;
    },
    monthsShort: {
      [key: number]: string;
    },
  },
};

export const localization: Localization = {
  en: {
    weekDays: {
      1: 'mon',
      2: 'tue',
      3: 'wed',
      4: 'thu',
      5: 'fri',
      6: 'sat',
      7: 'sun',
    },
    months: {
      0: 'January',
      1: 'February',
      2: 'March',
      3: 'April',
      4: 'May',
      5: 'June',
      6: 'July',
      7: 'August',
      8: 'September',
      9: 'October',
      10: 'November',
      11: 'December',
    },
    monthsShort: {
      0: 'jan',
      1: 'feb',
      2: 'mar',
      3: 'apr',
      4: 'may',
      5: 'jun',
      6: 'jul',
      7: 'aug',
      8: 'sep',
      9: 'oct',
      10: 'nov',
      11: 'dec',
    },
  },
  hr: {
    weekDays: {
      1: 'pon',
      2: 'uto',
      3: 'sri',
      4: 'čet',
      5: 'pet',
      6: 'sub',
      7: 'ned',
    },
    months: {
      0: 'Siječanj',
      1: 'Veljača',
      2: 'Ožujak',
      3: 'Travanj',
      4: 'Svibanj',
      5: 'Lipanj',
      6: 'Srpanj',
      7: 'Kolovoz',
      8: 'Rujan',
      9: 'Listopad',
      10: 'Studeni',
      11: 'Prosinac',
    },
    monthsShort: {
      0: 'sij',
      1: 'vlj',
      2: 'ožu',
      3: 'tra',
      4: 'svi',
      5: 'lip',
      6: 'srp',
      7: 'kol',
      8: 'ruj',
      9: 'lis',
      10: 'stu',
      11: 'pro',
    },
  },
};
