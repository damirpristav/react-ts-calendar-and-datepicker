import clsx from 'clsx';

import { useCalendar } from './useCalendar';
import { localization } from '../../localization';
import { CalendarMode } from './types';

export const Calendar = ({ selected, locale = 'en', onDateChange }: Props) => {
  const {
    numberOfDays,
    numberOfDaysToShow,
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
  } = useCalendar(selected);

  return (
    <div className="calendar">
      <div className="calendar-top">
        <p className="current-month">
          <button
            type="button"
            onClick={() => onModeChange(CalendarMode.Months)}
          >
            {localization[locale].months[currentMonth]}
          </button>
          <span>-</span>
          <button
            type="button"
            onClick={() => onModeChange(CalendarMode.Years)}
          >
            {currentYear}
          </button>
        </p>
        {mode !== CalendarMode.Months && (
          <div className="calendar-navigation">
            <button type="button" onClick={onGoToPrevMonth}>
              &#9650;
            </button>
            <button type="button" onClick={onGoToNextMonth}>
              &#9660;
            </button>
          </div>
        )}
      </div>
      <div className="calendar-body">
        <div
          className={clsx('calendar-years', {
            opened: mode === CalendarMode.Years,
          })}
        >
          {Array(20)
            .fill('')
            .map((_, index) => (
              <button
                type="button"
                className={clsx('year', {
                  selected: yearRangeStart + index === date.getFullYear(),
                  current: yearRangeStart + index === today.getFullYear(),
                })}
                onClick={() => onYearClick(yearRangeStart + index)}
                key={index}
              >
                {yearRangeStart + index}
              </button>
            ))}
        </div>
        <div
          className={clsx('calendar-months', {
            opened: mode === CalendarMode.Months,
          })}
        >
          {Array(12)
            .fill('')
            .map((_, index) => (
              <button
                type="button"
                className={clsx('month', {
                  selected: index === date.getMonth(),
                })}
                onClick={() => onMonthClick(index)}
                key={index}
              >
                {localization[locale].monthsShort[index]}
              </button>
            ))}
        </div>
        <div className="calendar-days">
          {Array(7)
            .fill('')
            .map((_, index) => (
              <div className="week-day" key={index}>
                {localization[locale].weekDays[index + 1]}
              </div>
            ))}
          {Array(numberOfDaysToShow)
            .fill('')
            .map((_, index) => {
              if (index + 1 < firstDayOfTheMonth) {
                // days are from 1-7, index starts at 0 so we need to add 1
                return (
                  <div className="day previous-month" key={index}>
                    <span>
                      {numberOfDaysInPreviousMonth -
                        firstDayOfTheMonth +
                        1 +
                        index +
                        1}
                    </span>
                  </div>
                );
              } else if (index + 1 - firstDayOfTheMonth + 1 > numberOfDays) {
                return (
                  <div className="day next-month" key={index}>
                    <span>
                      {index + 1 - numberOfDays - firstDayOfTheMonth + 1}
                    </span>
                  </div>
                );
              }
              const calendarDate = new Date(
                date.getFullYear(),
                date.getMonth(),
                index + 1 - firstDayOfTheMonth + 1
              );
              return (
                <div
                  className={clsx('day', {
                    today: isToday(calendarDate),
                    selected: calendarDate.getTime() === selectedDate.getTime(),
                  })}
                  key={index}
                >
                  <button
                    type="button"
                    onClick={() => {
                      onDayClick(calendarDate);
                      onDateChange?.(calendarDate);
                    }}
                  >
                    {index + 1 - firstDayOfTheMonth + 1}
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

type Props = {
  selected?: Date | '';
  locale?: 'en' | 'hr';
  onDateChange?: (date: Date) => void;
};
