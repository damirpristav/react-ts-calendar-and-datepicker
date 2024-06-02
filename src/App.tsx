import { useState } from 'react';
import { Formik, Form } from 'formik';
import { useForm, FormProvider } from 'react-hook-form';

import {
  DatePicker,
  DatePickerWithFormik,
  DatePickerWithReactHookForm,
} from './components';

type Values = {
  date: Date | '';
};

function App() {
  const [selectedDate, setSelectedDate] = useState<Date | ''>('');

  const onDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const methods = useForm<Values>({ defaultValues: { date: '' } });

  return (
    <main>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(selectedDate);
        }}
      >
        <h2>Form without plugins</h2>
        <DatePicker value={selectedDate} onChange={onDateChange} />
        <button type="submit" className="submit-button">
          submit
        </button>
      </form>
      <Formik<Values>
        initialValues={{ date: '' }}
        onSubmit={(values) => console.log(values)}
      >
        <Form>
          <h2>Form with Formik</h2>
          <DatePickerWithFormik name="date" />
          <button type="submit" className="submit-button">
            submit
          </button>
        </Form>
      </Formik>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((values) => console.log(values))}>
          <h2>Form with react hook form</h2>
          <DatePickerWithReactHookForm name="date" control={methods.control} />
          <button type="submit" className="submit-button">
            submit
          </button>
        </form>
      </FormProvider>
    </main>
  );
}

export default App;
