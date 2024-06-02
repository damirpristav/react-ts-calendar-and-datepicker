import { useState, useEffect } from 'react';

import { CalendarMode } from './types';
import {
  getDaysInMonth,
  getClosestSmallerNumberDivisibleBy20,
} from '../../helpers';

export const useCalendar = (selected?: Date | '') => {
  const today = new Date();
  const [date, setDate] = useState(
    selected
      ? new Date(
          selected.getFullYear(),
          selected.getMonth(),
          selected.getDate()
        )
      : new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [mode, setMode] = useState<CalendarMode>(CalendarMode.Days);
  const [selectedDate, setSelectedDate] = useState(
    selected || new Date(today.setHours(0, 0, 0, 0))
  );
  const [yearRangeStart, setYearRangeStart] = useState(
    getClosestSmallerNumberDivisibleBy20(date.getFullYear())
  );
  const previousMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);
  const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  const numberOfDays = getDaysInMonth(date);
  const firstDayDate = new Date(date.getFullYear(), date.getMonth(), 1);
  const firstDayOfTheMonth = firstDayDate.getDay() === 0 ? 7 : firstDayDate.getDay(); // 0 is sunday
  const numberOfDaysInPreviousMonth = getDaysInMonth(previousMonth);
  const numberOfDaysInNextMonth = getDaysInMonth(nextMonth);
  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();
  const numberOfDaysToShow =
    numberOfDays + firstDayOfTheMonth - 1 > 35 ? 42 : 35;

  useEffect(() => {
    if (selected) {
      setSelectedDate(selected);
    }
  }, [selected]);

  const onGoToPrevMonth = () => {
    if (mode === CalendarMode.Years) {
      setYearRangeStart(yearRangeStart - 20);
      return;
    }
    setDate(previousMonth);
  };

  const onGoToNextMonth = () => {
    if (mode === CalendarMode.Years) {
      setYearRangeStart(yearRangeStart + 20);
      return;
    }
    setDate(nextMonth);
  };

  const onYearClick = (year: number) => {
    setDate(new Date(year, date.getMonth(), 1));
    setMode(CalendarMode.Days);
  };

  const onMonthClick = (month: number) => {
    setDate(new Date(date.getFullYear(), month, 1));
    setMode(CalendarMode.Days);
  };

  const onDayClick = (date: Date) => {
    setSelectedDate(date);
  };

  const onModeChange = (mode: CalendarMode) => {
    setMode(mode);
  };

  const isToday = (date: Date) => {
    return date.setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0);
  };

  return {
    numberOfDays,
    numberOfDaysToShow,
    numberOfDaysInNextMonth,
    numberOfDaysInPreviousMonth,
    firstDayOfTheMonth,
    currentMonth,
    currentYear,
    date,
    mode,
    yearRangeStart,
    today,
    selectedDate,
    onGoToPrevMonth,
    onGoToNextMonth,
    onYearClick,
    onMonthClick,
    onDayClick,
    onModeChange,
    isToday,
  };
};
