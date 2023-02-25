import Page from "../components/Page";
import styles from "./CatalogPage.module.css";
import triangle from "../assets/triangle.jpg";
import openTriangle from "../assets/triangle-expanded.jpg";
import React, { useState } from "react";
import ShortYellowButton from "../components/ShortYellowButton";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { addModule } from "../actions";

function Header() {
  return (
    <>
      <p className={styles.nameText}>CHUN YONG LIM</p>
      <p className={styles.primaryText}>What-If Report</p>
    </>
  );
}

function FilterArea({ callback, currentFilter, collapse, expand }) {
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
  const mapped = letters.map((letter, i) => (
    <td
      key={i}
      className={
        letter === currentFilter ? styles.selectedFilterText : styles.filterText
      }
      onClick={() => callback(letter)}
    >
      {letter}
    </td>
  ));
  const mappedNumbers = numbers.map((number, i) => (
    <td
      key={i}
      className={
        number === currentFilter ? styles.selectedFilterText : styles.filterText
      }
      onClick={() => callback(number)}
    >
      {number}
    </td>
  ));
  const navigate = useNavigate();
  const navigateBack = () => navigate(-1);
  return (
    <>
      <div className={styles.filterBox}>
        <table>
          <tbody>
            <tr>{mapped}</tr>
            <tr>{mappedNumbers}</tr>
          </tbody>
        </table>
      </div>
      <div className={styles.filterRow}>
        <ShortYellowButton className={styles.collapse} onClick={collapse}>
          <span className={styles.filterButtonText}>Collapse All</span>
        </ShortYellowButton>
        <ShortYellowButton className={styles.expand} onClick={expand}>
          Expand All
        </ShortYellowButton>
        <ShortYellowButton className={styles.cancel} onClick={navigateBack}>
          Cancel
        </ShortYellowButton>
      </div>
    </>
  );
}

function ModuleCategory({
  allModules,
  subject,
  name,
  selected,
  selectSubject,
  unselectSubject,
  addModule,
}) {
  const isSelected = selected.includes(subject);
  const filteredModules = allModules.filter((mod) => mod.subject === subject);
  return (
    <>
      <div
        onClick={() => {
          if (!isSelected) {
            selectSubject(subject);
          } else {
            unselectSubject(subject);
          }
        }}
        className={`${styles.row} ${isSelected ? "" : styles.marginVertical}`}
      >
        {isSelected ? (
          <img src={openTriangle} alt="expanded" />
        ) : (
          <img src={triangle} alt="triangle" />
        )}
        <span className={`${styles.filterText} ${styles.hoverUnderline}`}>
          {subject} - {name}
        </span>
      </div>
      {isSelected && (
        <ModuleList modules={filteredModules} addModule={addModule} />
      )}
    </>
  );
}

function ModuleList({ modules, addModule }) {
  const navigate = useNavigate();
  if (modules.length === 0) {
    return (
      <div className={styles.moduleBox}>
        <p>No active courses offered for this Subject.</p>
      </div>
    );
  }
  const mapped = modules.map((mod, i) => (
    <tr
      className={
        i === 0
          ? `${styles.first}`
          : (i + 1) % 2 === 0
          ? `${styles.even}`
          : `${styles.odd}`
      }
      key={i}
    >
      <td className={`${styles.td} ${styles.firstCol}`}>{mod.code}</td>
      <td className={styles.td}> {mod.courseName}</td>
      <td className={styles.td}></td>
      <td className={styles.td}>
        <ShortYellowButton
          onClick={() => {
            addModule(mod);
            navigate(-1);
          }}
        >
          Select
        </ShortYellowButton>
      </td>
    </tr>
  ));
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={`${styles.th} ${styles.firstCol}`} width={60}>
            Module Nbr
          </th>
          <th className={styles.th} width="300">
            Module Title
          </th>
          <th className={styles.th} width="60">
            Typically Offered
          </th>
          <th className={styles.th} width="80">
            Select
          </th>
        </tr>
      </thead>
      <tbody>{mapped}</tbody>
    </table>
  );
}

function ModuleSubjects({
  modules,
  moduleSubjects,
  currrentFilter,
  selected,
  selectSubject,
  unselectSubject,
  addModule,
}) {
  const currModSubjects = moduleSubjects.filter((mod) =>
    mod.subject.startsWith(currrentFilter)
  );
  const modulesMapped = currModSubjects.map((mod, i) => (
    <ModuleCategory
      allModules={modules}
      subject={mod.subject}
      name={mod.name}
      key={i}
      selected={selected}
      selectSubject={selectSubject}
      unselectCode={unselectSubject}
      addModule={addModule}
    />
  ));
  return (
    <>
      <div className={styles.moduleList}>
        <p>Select subject code to display or hide course information.</p>
      </div>
      {modulesMapped}
    </>
  );
}

function CatalogPage({ addModule, data }) {
  const [currentFilter, setFilter] = useState("A");
  const [selectedModuleSubjects, addSubject] = useState([]);
  const { moduleSubjects, allModules } = data;

  const selectSubject = (subj) => {
    addSubject((prev) => [...prev, subj]);
  };
  const unselectSubject = (subjToRemove) =>
    addSubject((prev) => prev.filter((subj) => subj !== subjToRemove));
  const callback = (letter) => setFilter(letter);
  const collapse = () => {
    addSubject([]);
  };
  const expand = () => {
    for (const module of moduleSubjects) {
      const subject = module.subject;
      addSubject((prev) => [...prev, subject]);
    }
  };
  return (
    <Page>
      <div className={styles.container}>
        <Header />
        <FilterArea
          callback={callback}
          currentFilter={currentFilter}
          collapse={collapse}
          expand={expand}
        />
        <ModuleSubjects
          modules={allModules}
          currrentFilter={currentFilter}
          selected={selectedModuleSubjects}
          selectSubject={selectSubject}
          unselectSubject={unselectSubject}
          moduleSubjects={moduleSubjects}
          addModule={addModule}
        />
      </div>
    </Page>
  );
}

function mapStateToProps(state) {
  const data = state.data;
  return {
    data,
  };
}

const mapDispatchToProps = (dispatch) => ({
  addModule: (module) => dispatch(addModule(module)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CatalogPage);
