import React, { useState, useEffect } from "react";
import axios from "axios";

import "../../App.scss";

import Item from "../item/Item";
import Spinner from "../spinner/spinner";

const ListItems = () => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [sortBy, setSortBy] = useState("asc");
  const [isSpinnerShow, setIsSpinnerShow] = useState(true);
  const [countryCode, setCountryCode] = useState("");

  useEffect(() => getList(), [value, sortBy]);

  const getList = () => {
    setIsSpinnerShow(true);
    axios
      .get("https://date.nager.at/api/v3/AvailableCountries")
      .then((response) => {
        setList(response.data);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setIsSpinnerShow(false);
      });
  };

  const handleInputValue = (event) => {
    setValue(event.target.value);
  };

  const setSortList = (list) => {
    const sortList = sortBy === "asc" ? getDesc(list) : getAsc(list);
    setData([...sortList]);
  };

  const getAsc = (list) => {
    return list.sort((a, b) => (a.name < b.name ? 1 : -1));
  };

  const getDesc = (list) => {
    return list.sort((a, b) => (a.name > b.name ? 1 : -1));
  };

  const setList = (list) => {
    let filterList = list.filter((item) =>
      item.name.toLowerCase().includes(value)
    );

    setSortList(filterList);
  };

  const switchSortOptions = () => {
    sortBy === "asc" ? setSortBy("desc") : setSortBy("asc");
  };

  const resetState = () => {
    setCountryCode("");
    setSortBy("asc");
    setValue("");
    getList();
  };

  return (
    <div className="container">
      <h1>Countries List</h1>
      <div className="body">
        <div className="search-area">
          <section className="search-field">
            <label htmlFor="search">Search text</label>

            <input
              placeholder="Country name"
              id="search"
              type="text"
              value={value}
              onChange={handleInputValue}
            />

            <button onClick={switchSortOptions}>
              Sort{" "}
              {sortBy === "asc" ? (
                <span className="array">↑</span>
              ) : (
                <span className="array">↓</span>
              )}
            </button>

            <button onClick={resetState}>Reset </button>
          </section>

          {isSpinnerShow ? (
            <Spinner></Spinner>
          ) : (
            <Item
              items={data}
              countryCode={countryCode}
              setCountryCode={setCountryCode}
            ></Item>
          )}
        </div>
      </div>
    </div>
  );
};
export default ListItems;
