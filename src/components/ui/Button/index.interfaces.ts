import {ReactNode} from "react";

export interface IButton {
    id?: string;
    title?: ReactNode;
    onClick?: (e: any) => void;
    type?: 'submit' | 'reset' | 'button'
    children?: ReactNode;
    mode?: 'primary' | 'secondary';
    disabled?: boolean;
    active: boolean
}
