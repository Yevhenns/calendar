import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

import { css } from '@emotion/css';

type IconButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement>
>;

export function IconButton({ children, ...props }: IconButtonProps) {
  return (
    <button type="button" className={button} {...props}>
      {children}
    </button>
  );
}

const button = css({
  borderRadius: '4px',
  border: '1px solid transparent',
  padding: 0,
  backgroundColor: '#DCDCDC',
  cursor: 'pointer',
  width: '24px',
  height: '24px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    borderColor: '#646cff',
  },
});
