import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { nanoid } from "nanoid";
import { useId } from "react";

import s from "./ContactForm.module.css";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  number: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

const initialValues = {
  name: "",
  number: "",
};

function ContactForm({ onAdd, deleteContact }) {
  const nameFieldId = useId();
  const numberFieldId = useId();

  const handleSubmit = (values, actions) => {
    values.id = nanoid();

    onAdd(values);

    actions.resetForm();
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form className={s.form}>
          <label className={s.label} htmlFor={nameFieldId}>
            Name
          </label>
          <div className={s.wrapper}>
            <Field className={s.input} id={nameFieldId} name="name"></Field>
            <ErrorMessage className={s.error} name="name" component="span" />
          </div>
          <label className={s.label} htmlFor={numberFieldId}>
            Number
          </label>
          <div className={s.wrapper}>
            <Field className={s.input} id={numberFieldId} name="number"></Field>
            <ErrorMessage className={s.error} name="number" component="span" />
          </div>
          <button className={s.button} type="submit">
            Add Contact
          </button>
        </Form>
      </Formik>
    </>
  );
}

export default ContactForm;
