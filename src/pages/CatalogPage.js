import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { addModule } from "../actions";

import Page from "../components/Page";
import styles from "./CatalogPage.module.css";
import triangle from "../assets/triangle.jpg";
import openTriangle from "../assets/triangle-expanded.jpg";
import ShortYellowButton from "../components/ShortYellowButton";
import SearchIcon from "../assets/Search.png";

function Header() {
  return (
    <>
      <p className={styles.nameText}>JOHN DOE</p>
      <div style={{ height: "40px" }} />
      <p className={styles.primaryText}>What-If Report</p>
      <div style={{ height: "63px" }} />
    </>
  );
}

function UtilityButtons({ collapse, expand, navigateBack }) {
  return (
    <div className={styles.filterRow}>
      <ShortYellowButton className={styles.collapse} onClick={collapse}>
        Collapse All
      </ShortYellowButton>
      <ShortYellowButton className={styles.expand} onClick={expand}>
        Expand All
      </ShortYellowButton>
      <ShortYellowButton className={styles.cancel} onClick={navigateBack}>
        Cancel
      </ShortYellowButton>
    </div>
  );
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
    <div className={styles.filterBox} style={{padding: "0", paddingBottom: "5px"}}>
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
  }, [query]);

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

function FilterBox({ iv1, currentFilter, callback }) {
  switch (iv1) {
    case "Alphabet":
      return (
        <FilterBoxByAlphabet
          currentFilter={currentFilter}
          callback={callback}
        />
      );
    case "Relevance":
      return (
        <FilterBoxByRelevance
          currentFilter={currentFilter}
          callback={callback}
        />
      );
    case "Search":
      return <FilterBoxBySearch callback={callback} />;
    default:
      return <div>Invalid Filter</div>;
  }
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

function CatalogPage({ addModule, data, iv1 }) {
  const [currentFilter, setFilter] = useState("A");
  const [selectedModuleSubjects, addSubject] = useState([]);
  const { moduleSubjects, allModules } = data;

  /* Select */
  const selectSubject = (subj) => {
    addSubject((prev) => [...prev, subj]);
  };

  /* Unselect */
  const unselectSubject = (subjToRemove) => {
    addSubject((prev) => prev.filter((subj) => subj !== subjToRemove));
  };

  /* Set filter */
  const callback = (filter) => {
    setFilter(filter);
  };

  /* Collapse all accordions */
  const collapse = () => {
    addSubject([]);
  };

  /* Expand all accordions */
  const expand = () => {
    for (const module of moduleSubjects) {
      const subject = module.subject;
      addSubject((prev) => [...prev, subject]);
    }
  };

  /* Navigate back to home page */
  const navigate = useNavigate();
  const navigateBack = () => navigate(-1);

  return (
    <Page>
      <div className={styles.container}>
        <Header />
        <FilterBox
          iv1={iv1}
          callback={callback}
          currentFilter={currentFilter}
        />
        <UtilityButtons
          collapse={collapse}
          expand={expand}
          navigateBack={navigateBack}
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
        <UtilityButtons
          collapse={collapse}
          expand={expand}
          navigateBack={navigateBack}
        />
        <div style={{ height: "10px" }} />
        <hr />
        <div style={{ height: "30px" }} />
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
