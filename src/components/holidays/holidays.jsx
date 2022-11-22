import "./holidays.scss";

const HolidaysList = ({ days }) => {
  return (
    <>
      <h5 className="title">Holidays list</h5>
      <ul className="daysList">
        {days.map((item, index) => {
          return (
            <li className="day" key={index}>
              <p className="description"> date: {item.date}</p>
              <p className="description"> name: {item.name}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
};
export default HolidaysList;
