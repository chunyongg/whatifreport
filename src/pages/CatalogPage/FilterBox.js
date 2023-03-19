import { useState, useEffect } from "react";
import styles from "./CatalogPage.module.css";
import SearchIcon from "../../assets/Search.png";
import { allLevels } from "../../constants";
import { connect } from "react-redux";
import { firstClick } from "../../actions";
import loggingjs from "../../logging";

function FilterBox({
  iv1,
  currentFilter,
  callback,
  updateFirstClick,
  hasClickedFirstClick,
  correctModules,
}) {
  switch (iv1) {
    case allLevels.ALPHABETICAL:
      return (
        <FilterBoxByAlphabet
          currentFilter={currentFilter}
          callback={callback}
          hasClickedFirstClick={hasClickedFirstClick}
          correctModules={correctModules}
          updateFirstClick={updateFirstClick}
        />
      );
    case allLevels.RELEVANCE:
      return (
        <FilterBoxByRelevance
          currentFilter={currentFilter}
          callback={callback}
          hasClickedFirstClick={hasClickedFirstClick}
          updateFirstClick={updateFirstClick}
        />
      );
    case allLevels.SEARCH:
      return (
        <FilterBoxBySearch
          callback={callback}
          hasClickedFirstClick={hasClickedFirstClick}
          updateFirstClick={updateFirstClick}
        />
      );
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

function FilterBoxByAlphabet({
  callback,
  currentFilter,
  hasClickedFirstClick,
  updateFirstClick,
  correctModules,
}) {
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
  const onClick = (item) => {
    if (!hasClickedFirstClick) {
      updateFirstClick();
      const isCorrectMod = correctModules[0].subject.startsWith(item);
      if (isCorrectMod) {
        loggingjs.logEvent("FIRST_CLICK_SUCCESS", 1);
      } else {
        loggingjs.logEvent("FIRST_CLICK_FAIL", 1);
      }
    }
    callback(item);
  };
  return (
    <div
      className={styles.filterBox}
      style={{ padding: "0", paddingBottom: "5px" }}
    >
      <div className={styles.mappedBox} style={{ marginLeft: "15px" }}>
        <FilterButtons
          items={letters}
          currentFilter={currentFilter}
          callback={onClick}
        />
      </div>
      <div className={styles.mappedBox} style={{ marginLeft: "230px" }}>
        <FilterButtons
          items={numbers}
          currentFilter={currentFilter}
          callback={onClick}
        />
      </div>
    </div>
  );
}

function FilterBoxByRelevance({
  callback,
  currentFilter,
  hasClickedFirstClick,
  updateFirstClick,
}) {
  const highPriorityReqs = [
    "Faculty Requirements",
    "Major Requirements",
    "General Education Requirements",
  ];
  const lowPriorityReqs = [
    "Minor Requirements",
    "Unrestricted Electives Requirements",
  ];
  const onClick = (selected) => {
    if (!hasClickedFirstClick) {
      updateFirstClick();
      if (selected !== "General Education Requirements") {
        loggingjs.logEvent("FIRST_CLICK_SUCCESS", 1);
      } else {
        loggingjs.logEvent("FIRST_CLICK_FAIL", 1);
      }
    }
    callback(selected);
  };
  return (
    <div className={styles.filterBox}>
      <div className={styles.mappedBox} style={{ justifyContent: "center" }}>
        <FilterButtons
          items={highPriorityReqs}
          currentFilter={currentFilter}
          callback={onClick}
        />
      </div>
      <div className={styles.mappedBox} style={{ justifyContent: "center" }}>
        <FilterButtons
          items={lowPriorityReqs}
          currentFilter={currentFilter}
          callback={onClick}
        />
      </div>
    </div>
  );
}

function FilterBoxBySearch({ callback, hasClickedFirstClick, updateFirstClick }) {
  const [query, setQuery] = useState("");
  const handleOnChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    if (!hasClickedFirstClick) {
      updateFirstClick();
      loggingjs.logEvent('FIRST_CLICK_SUCCESS', 1);
    }
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

const mapStateToProps = (state) => {
  return {
    correctModules: state.data.correctModules,
    hasClickedFirstClick: state.data.hasClickedFirstClick,
  };
};

const mapDispatchToProps = (dispatch) => ({
  updateFirstClick: () => dispatch(firstClick()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterBox);
