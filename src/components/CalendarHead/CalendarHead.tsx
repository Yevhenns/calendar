import { months } from '../../assets/months';

export function CalendarHead() {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      {months.map((item, index) => {
        return <p key={index}>{item}</p>;
      })}
    </div>
  );
}
