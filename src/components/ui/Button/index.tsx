import React from 'react';
import classNames from 'classnames/bind';

import { IButton } from './index.interfaces';
import styles from './index.module.sass'

const cx = classNames.bind(styles);

export const Button = (props: IButton) => {
    const { id, title, onClick, mode = 'primary',children, type, active, disabled} = props;


    return (
        <button
            onClick={onClick}
            className={cx(active? {
                btn_active: true,
                primary: mode === 'primary',
                secondary: mode === 'secondary',
            } :
              {
                button: true,
                primary: mode === 'primary',
                secondary: mode === 'secondary',
              },)}
            id={id}
            type={type}
            disabled={disabled}
        >
            {title}
        </button>
    )
}
