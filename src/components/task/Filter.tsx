import { css } from '@emotion/css';

export function Filter() {
  return (
    <div className={filterWrapper}>
      <p>Filter</p>
      <input name="filter" className={input} />
    </div>
  );
}

const filterWrapper = css({
  display: 'flex',
  justifyContent: 'center',
  gap: '4px',
  padding: '4px',
});

const input = css({
  padding: '4px',
  borderRadius: '4px',
});
