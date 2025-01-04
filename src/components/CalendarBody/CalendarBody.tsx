interface CalendarBodyProps {
  finalDaysArray: {
    day: number;
    type: string;
    month: string;
  }[][];
}

export function CalendarBody({ finalDaysArray }: CalendarBodyProps) {
  return (
    <>
      {finalDaysArray.map((item, index) => {
        return (
          <div key={index} style={{ display: 'flex' }}>
            {item.map((item, index) => {
              return (
                <div
                  key={index}
                  style={{
                    padding: '4px',
                    textAlign: 'left',
                    width: '150px',
                    height: '150px',
                    border: '1px solid #000',
                  }}
                >
                  <p>{item.day}</p>
                  <p>{item.type}</p>
                  <p>{item.month}</p>
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
}
