import { useState, useRef } from 'react';
import { useClickAway } from 'ahooks';
import { usePopper } from 'react-popper';
import { Control, useController, useFormContext } from 'react-hook-form';
import clsx from 'clsx';

import { Calendar } from '../Calendar';
import { addZero } from '../../helpers';

export const DatePickerWithReactHookForm = ({ label, name, control }: Props) => {
  const { field } = useController({ name, control });
  const { setValue } = useFormContext();
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
          {field.value
            ? `${addZero(field.value.getDate())}.${addZero(
                field.value.getMonth() + 1
              )}.${field.value.getFullYear()}.`
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
            selected={field.value}
            onDateChange={(date) => {
              setValue(name, date);
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
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, any>;
};
