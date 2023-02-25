import Page from "../components/Page";
import styles from "./CatalogPage.module.css";
import triangle from "../assets/triangle.jpg";
import openTriangle from "../assets/triangle-expanded.jpg";
import React, { useState } from "react";

function Header() {
  return (
    <>
      <p className={styles.nameText}>CHUN YONG LIM</p>
      <p className={styles.text}>What-If Report</p>
    </>
  );
}

function FilterArea({ callback }) {
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
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const mapped = letters.map((letter, i) => (
    <td key={i} className={styles.filterText} onClick={() => callback(letter)}>
      {letter}
    </td>
  ));
  const mappedNumbers = numbers.map((number, i) => (
    <td key={i} className={styles.filterText} onClick={() => callback(number)}>
      {number}
    </td>
  ));
  return (
    <div className={styles.filterBox}>
      <table>
        <tbody>
          <tr>{mapped}</tr>
          <tr>{mappedNumbers}</tr>
        </tbody>
      </table>
    </div>
  );
}

function ModuleItem({ code, name }) {
  const [isSelected, selectCode] = useState(false);
  return (
    <div>
      <div
        onClick={() => {
          if (isSelected) {
            selectCode(false);
          } else {
            selectCode(true);
          }
        }}
        className={`${styles.row} ${styles.marginVertical}`}
      >
        {isSelected ? (
          <img src={openTriangle} alt="expanded" />
        ) : (
          <img src={triangle} alt="triangle" />
        )}
        <span className={`${styles.filterText} ${styles.hoverUnderline}`}>
          {code} - {name}
        </span>
      </div>
      {isSelected && <p>Hello</p>}
    </div>
  );
}

function ModuleList({ currrentFilter }) {
  const moduleCodes = [
    { name: "Asian Studies", code: "AA" },
    { name: "Applied Biomedicine", code: "ABM" },
    { name: "Architectural Conservation", code: "AC" },
    { name: "Accounting", code: "ACC" },
    { name: "Computer Science", code: "CS" },
  ];
  const currMods = moduleCodes.filter((mod) =>
    mod.code.startsWith(currrentFilter)
  );
  const modulesMapped = currMods.map((mod, i) => (
    <ModuleItem code={mod.code} name={mod.name} key={i} />
  ));
  return (
    <div className={styles.moduleList}>
      <p>Select subject code to display or hide course information.</p>
      {modulesMapped}
    </div>
  );
}

function CatalogPage() {
  const [currentFilter, setFilter] = useState("A");
  const callback = (letter) => setFilter(letter);
  return (
    <Page>
      <div className={styles.container}>
        <Header />
        <FilterArea callback={callback} />
        <ModuleList currrentFilter={currentFilter} />
      </div>
    </Page>
  );
}

export default CatalogPage;
