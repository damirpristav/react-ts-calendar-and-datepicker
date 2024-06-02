import { useState, useRef } from 'react';
import { useClickAway } from 'ahooks';
import { usePopper } from 'react-popper';
import clsx from 'clsx';

import { Calendar } from '../Calendar';
import { addZero } from '../../helpers';

export const DatePicker = ({ label, value, onChange }: Props) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const ref = useRef<HTMLDivElement>(null);

  useClickAway(() => setIsCalendarOpen(false), ref);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-start',
    modifiers: [
      { name: 'offset', options: { offset: [0, 4] } }, // horizontal, vertical
    ],
  });

  return (
    <div className={clsx('date-picker', { opened: isCalendarOpen })} ref={ref}>
      <label>{label || 'Select a date'}</label>
      <button
        type="button"
        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
        ref={setReferenceElement}
      >
        <span>&#128197;</span>
        <p>
          {value
            ? `${addZero(value.getDate())}.${addZero(
                value.getMonth() + 1
              )}.${value.getFullYear()}.`
            : 'Choose a date'}
        </p>
        <span className="arrow">&#9660;</span>
      </button>
      {isCalendarOpen && (
        <div
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          <Calendar
            selected={value}
            onDateChange={(date) => {
              onChange(date);
              setIsCalendarOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

type Props = {
  label?: string;
  value: Date | '';
  onChange: (date: Date) => void;
};
