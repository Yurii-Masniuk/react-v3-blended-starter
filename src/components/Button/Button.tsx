import type { ReactNode } from 'react';
import style from './Button.module.css';

interface ButtonProps {
    children: ReactNode;
    onClick: () => void;
    disabled: boolean;
}

const Button = ({ children, onClick, disabled }: ButtonProps) => {
    return (
        <button className={style.button} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
};

export default Button;