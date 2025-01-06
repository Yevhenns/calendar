import { css } from '@emotion/css';

import { months } from '../../assets/months';

const headWrapper = css({
  display: 'flex',
  justifyContent: 'space-around',
});

export function CalendarHead() {
  return (
    <div className={headWrapper}>
      {months.map((item, index) => {
        return <p key={index}>{item}</p>;
      })}
    </div>
  );
}
