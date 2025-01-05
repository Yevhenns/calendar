import { css } from '@emotion/css';
import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>;

const button = css({
  borderRadius: '8px',
  border: '1px solid transparent',
  padding: '4px 8px',
  backgroundColor: '#1a1a1a',
  color: '#fff',
  cursor: 'pointer',
  transition: 'border-color 0.25s, background-color 0.25s',
  '&:hover': {
    borderColor: '#646cff',
  },
  '&:focus': {
    outline: 'none',
    borderColor: '#888',
  },
  '&:disabled': {
    backgroundColor: '#aaa',
    cursor: 'not-allowed',
  },
});

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button className={button} {...props}>
      {children}
    </button>
  );
}
