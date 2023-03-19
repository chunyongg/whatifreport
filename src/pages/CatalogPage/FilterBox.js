import { useState, useEffect } from "react";

import styles from "./CatalogPage.module.css";
import SearchIcon from "../../assets/Search.png";
import { allLevels } from "../../constants";

function FilterBox({ iv1, currentFilter, callback }) {
  switch (iv1) {
    case allLevels.ALPHABETICAL:
      return (
        <FilterBoxByAlphabet
          currentFilter={currentFilter}
          callback={callback}
        />
      );
    case allLevels.RELEVANCE:
      return (
        <FilterBoxByRelevance
          currentFilter={currentFilter}
          callback={callback}
        />
      );
    case allLevels.SEARCH:
      return <FilterBoxBySearch callback={callback} />;
    default:
      return <div>Invalid Filter</div>;
  }
}

function FilterButtons({ items, currentFilter, callback }) {
  return items.map((item, i) => (
    <div
      key={i}
      className={
        item === currentFilter ? styles.selectedFilterText : styles.filterText
      }
      onClick={() => callback(item)}
    >
      {item}
    </div>
  ));
}

function FilterBoxByAlphabet({ callback, currentFilter }) {
  const letters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  return (
    <div
      className={styles.filterBox}
      style={{ padding: "0", paddingBottom: "5px" }}
    >
      <div className={styles.mappedBox} style={{ marginLeft: "15px" }}>
        <FilterButtons
          items={letters}
          currentFilter={currentFilter}
          callback={callback}
        />
      </div>
      <div className={styles.mappedBox} style={{ marginLeft: "230px" }}>
        <FilterButtons
          items={numbers}
          currentFilter={currentFilter}
          callback={callback}
        />
      </div>
    </div>
  );
}

function FilterBoxByRelevance({ callback, currentFilter }) {
  const highPriorityReqs = [
    "Faculty Requirements",
    "Major Requirements",
    "General Education Requirements",
  ];
  const lowPriorityReqs = [
    "Minor Requirements",
    "Unrestricted Electives Requirements",
  ];
  return (
    <div className={styles.filterBox}>
      <div className={styles.mappedBox} style={{ justifyContent: "center" }}>
        <FilterButtons
          items={highPriorityReqs}
          currentFilter={currentFilter}
          callback={callback}
        />
      </div>
      <div className={styles.mappedBox} style={{ justifyContent: "center" }}>
        <FilterButtons
          items={lowPriorityReqs}
          currentFilter={currentFilter}
          callback={callback}
        />
      </div>
    </div>
  );
}

function FilterBoxBySearch({ callback }) {
  const [query, setQuery] = useState("");
  const handleOnChange = (event) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => callback(query), 500);
    return () => clearTimeout(timeOutId);
  });

  return (
    <div className={styles.filterBox}>
      <div className={styles.searchBox}>
        <img src={SearchIcon} width={15} alt="Search" />
        <input
          className={styles.inputArea}
          placeholder="Search for modules by keywords"
          value={query}
          onChange={handleOnChange}
        />
      </div>
    </div>
  );
}

export default FilterBox;
