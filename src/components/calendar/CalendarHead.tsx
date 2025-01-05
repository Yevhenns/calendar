import { months } from '../../assets/months';
import { css } from '@emotion/css';

export function CalendarHead() {
  const headWrapper = css({
    display: 'flex',
    justifyContent: 'space-around',
  });

  return (
    <div className={headWrapper}>
      {months.map((item, index) => {
        return <p key={index}>{item}</p>;
      })}
    </div>
  );
}
