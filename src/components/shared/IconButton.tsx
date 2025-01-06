import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

import { css } from '@emotion/css';

type IconButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement>
>;

const button = css({
  borderRadius: '12px',
  border: 'none',
  padding: 0,
  backgroundColor: '#DCDCDC',
  cursor: 'pointer',
  width: '24px',
  height: '24px',
});

export function IconButton({ children, ...props }: IconButtonProps) {
  return (
    <button className={button} {...props}>
      {children}
    </button>
  );
}
