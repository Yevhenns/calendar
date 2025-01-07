import { css } from '@emotion/css';

import { months } from '../../assets/months';

export function CalendarHead() {
  return (
    <div className={headWrapper}>
      {months.map((item, index) => {
        return <p key={index}>{item}</p>;
      })}
    </div>
  );
}

const headWrapper = css({
  display: 'flex',
  justifyContent: 'space-around',
});
