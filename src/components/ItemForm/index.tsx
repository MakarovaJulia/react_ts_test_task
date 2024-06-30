import { useFormik } from "formik";
import styles from "./index.module.sass";
import classNames from "classnames/bind";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/Button";
import { itemsValidationSchema } from "../../utils/itemsValidationSchema";
import {DropFileInput} from "../ui/DropFileInput";
import {useStores} from "../../utils/use-stores-hook";

const cx = classNames.bind(styles);

export const ItemsForm = () => {
  const {
    itemStore: { addItem, isError },
  } = useStores();

  const onFileChange = (base64Image: string) => {
    formik.setFieldValue('imageURL', 'data:image/jpeg;base64,' + base64Image);
  };

  const formik = useFormik({
    initialValues: {
      imageURL: '',
      image:'',
      name: '',
      description:'',
      price:0
    },
    validationSchema: itemsValidationSchema,
    onSubmit: (values) => {
      addItem({
          id:`${Date.now()}`,
          image: values.imageURL,
          name: values.name,
          description: values.description,
          price: values.price,
      });
      if (isError) {
        console.log('Error');
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={styles.form}>
      <DropFileInput onFileChange={onFileChange}/>
      <div className={styles.input_wrapper}>
        <h3 className={styles.input_label}>Name</h3>
        <input
          className={cx({
            input: true,
            inputError: formik.touched.name && formik.errors.name,
          })}
          id="name"
          type="text"
          placeholder="Name"
          {...formik.getFieldProps("name")}
        />
      {formik.touched.name && formik.errors.name ? (
        <div className={styles.errorMessage}>{formik.errors.name}</div>
      ) : null}
      </div>
      <div className={styles.input_wrapper}>
        <h3 className={styles.input_label}>Description</h3>
        <input
          className={cx({
            input: true,
            inputError: formik.touched.description && formik.errors.description,
          })}
          id="description"
          type="text"
          placeholder="Description"
          {...formik.getFieldProps("description")}
        />
      {formik.touched.description && formik.errors.description ? (
        <div className={styles.errorMessage}>{formik.errors.description}</div>
      ) : null}
      </div>
      <div className={styles.input_wrapper}>
        <h3 className={styles.input_label}>Price</h3>
        <input
          className={cx({
            input: true,
            inputError: formik.touched.price && formik.errors.price,
          })}
          id="price"
          type="text"
          placeholder="Price"
          {...formik.getFieldProps("price")}
        />
      {formik.touched.price && formik.errors.price ? (
        <div className={styles.errorMessage}>{formik.errors.price}</div>
      ) : null}
      </div>
      <Button title="Save" type="submit" mode='secondary' disabled={!(formik.isValid && formik.dirty)} active={false}>
        Добавить
      </Button>
    </form>
  );
};
