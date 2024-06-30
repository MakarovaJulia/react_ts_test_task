import React from 'react';
import classNames from 'classnames/bind';

import styles from './index.module.sass'
import {AnswerProps} from "./index.interfaces";

const cx = classNames.bind(styles);

export const Answer = ({ message }: AnswerProps) => {
  const cx = classNames.bind(styles);

  return (
    <div className={cx({
      wrapper: true,
    })}>
        {message.message}
    </div>
  );
};
