import { useState, useEffect } from "react";
import axios from "axios";

import HolidaysList from "../holidays/holidays";
import Spinner from "../spinner/spinner";

import "./items.scss";

const Item = ({ items, setCountryCode, countryCode }) => {
  const [isSpinnerShow, setIsSpinnerShow] = useState(true);
  const [selectedCountryHolidays, setselectedCountryHolidays] = useState([]);

  useEffect(() => {
    countryCode === "" || getCountryCode();
  }, [countryCode]);

  const getCountryCode = () => {
    setIsSpinnerShow(true);
    axios
      .get(`https://date.nager.at/api/v3/NextPublicHolidays/${countryCode}`)
      .then((response) => {
        setselectedCountryHolidays(response.data);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setIsSpinnerShow(false);
      });
  };

  const switchCountryInfo = (code) => {
    code !== countryCode ? setCountryCode(code) : setCountryCode("");
  };

  return (
    <div className="list">
      {items.length !== 0 ? (
        <ul className="items">
          {items.map((item) => {
            return (
              <li
                onClick={() => switchCountryInfo(item.countryCode)}
                className={
                  countryCode === item.countryCode ? "active-item" : "item"
                }
                key={item.countryCode}
              >
                {item.name}

                {countryCode === item.countryCode &&
                  (isSpinnerShow ? (
                    <Spinner></Spinner>
                  ) : (
                    <HolidaysList days={selectedCountryHolidays}></HolidaysList>
                  ))}
              </li>
            );
          })}
        </ul>
      ) : (
        <h1 className="placeholder">Nothing found...</h1>
      )}
    </div>
  );
};
export default Item;
