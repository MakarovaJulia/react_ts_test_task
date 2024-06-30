import React from 'react';
import classNames from 'classnames/bind';
import styles from './index.module.sass'
import {QuestionProps} from "./index.interfaces";

export const Question = ({questionData}: QuestionProps) => {
  const cx = classNames.bind(styles);

  const currentQuestion = questionData.message

  return (
    <div className={cx({
      wrapper: true,
    })}>
      <div className={styles.question}>
        <p>{currentQuestion}</p>
      </div>
    </div>
  );
};
