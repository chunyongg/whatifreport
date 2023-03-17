import { updateModulesList } from "../../actions";
import { connect } from "react-redux";
import {
  allModules,
  filterAllModulesList,
  filterAllModulesListBySearch,
  restoreAllModulesList,
} from "../../data/data";
import { useNavigate } from "react-router-dom";
import styles from "./CatalogPage.module.css";
import ModuleCategory from "./ModuleCategory";
import { useEffect, useState } from "react";
import UtilityButtons from "./UtilityButtons";

function ModuleSubjects({
  iv1,
  iv2,
  currentFilter,
  addModule,
  updateModuleList,
  data,
}) {
  const [selectedModuleSubjects, addSubject] = useState([]);
  const { moduleSubjects, allModules: modules } = data;
  /* Select */
  const selectSubject = (subj) => {
    addSubject((prev) => [...prev, subj]);
  };
  /* Unselect */
  const unselectSubject = (subjToRemove) => {
    addSubject((prev) => prev.filter((subj) => subj !== subjToRemove));
  };
  /* Expand all accordions */
  const expand = () => {
    const mapped = moduleSubjects.map((mod) => mod.subject);
    addSubject(mapped);
  };

  const [moduleSubjectsLocal, updateModuleSubjects] = useState([
    ...moduleSubjects,
  ]);
  useEffect(() => {
    const updated = filterSubjects();
    updateModuleSubjects(updated);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFilter,]);

  function filterSubjects() {
    switch (iv1) {
      case "Alphabet":
        restoreAllModulesList();
        // updateModuleList(allModules);
        return moduleSubjects.filter((mod) =>
          mod.subject.startsWith(currentFilter)
        );
      case "Relevance":
        switch (currentFilter) {
          case "Faculty Requirements":
            filterAllModulesList();
            updateModuleList(allModules);
            return moduleSubjects.filter(
              (mod) =>
                mod.subject === "CS" ||
                // Industrial Experience
                mod.subject === "CP" ||
                mod.subject === "TR" ||
                // Mathematics and Sciences
                mod.subject === "MA" ||
                mod.subject === "CM" ||
                mod.subject === "LSM" ||
                mod.subject === "PC" ||
                mod.subject === "ST" ||
                // IT Professionalism
                mod.subject === "ES" ||
                mod.subject === "IS"
            );
          case "Major Requirements":
            restoreAllModulesList();
            updateModuleList(allModules);
            return moduleSubjects.filter((mod) => mod.subject === "CS");
          case "General Education Requirements":
            restoreAllModulesList();
            updateModuleList(allModules);
            return moduleSubjects.filter((mod) => mod.subject.startsWith("GE"));
          case "Minor Requirements":
            restoreAllModulesList();
            updateModuleList(allModules);
            return moduleSubjects.filter(
              (mod) => mod.subject === "CS" || mod.subject === "NM"
            );
          default:
            return moduleSubjects;
        }
      case "Search":
        const firstDigit = currentFilter.match(/\d/); // will give you the first digit in the string
        const index = currentFilter.indexOf(firstDigit);
        let code = currentFilter;
        restoreAllModulesList();
        filterAllModulesListBySearch(currentFilter);
        updateModuleList(allModules);
        if (index > -1) {
          code = currentFilter.substring(0, index);
          updateModuleList(allModules);
          return moduleSubjects.filter((subj) => {
            const subject = subj.subject;
            const available = allModules.find((mod) => mod.subject === subject);
            return available !== undefined;
          })
        }
        else if (code.length <= 3) {
          return moduleSubjects.filter((mod) =>
            mod.subject.startsWith(code.toUpperCase())
          );
        } else {
          return moduleSubjects.filter((subj) => {
            const subject = subj.subject;
            const available = allModules.find((mod) => mod.subject === subject);
            return available !== undefined;
          })
        }
      default:
        return moduleSubjects.filter((mod) =>
          mod.subject.startsWith(currentFilter)
        );
    }
  }

  const modulesMapped = moduleSubjectsLocal.map((mod, i) => (
    <ModuleCategory
      iv2={iv2}
      allModules={modules}
      subject={mod.subject}
      name={mod.name}
      key={i}
      selected={selectedModuleSubjects}
      selectSubject={selectSubject}
      unselectSubject={unselectSubject}
      addModule={addModule}
    />
  ));
  /* Collapse all accordions */
  const collapse = () => {
    addSubject([]);
  };

  /* Navigate back to home page */
  const navigate = useNavigate();
  const navigateBack = () => navigate(-1);

  return (
    <>
      <UtilityButtons
        collapse={collapse}
        expand={expand}
        navigateBack={navigateBack}
      />
      <div className={styles.moduleList}>
        <p>Select subject code to display or hide course information.</p>
      </div>
      {modulesMapped}
    </>
  );
}

function mapStateToProps(state) {
  const data = state.data;
  return {
    data,
  };
}

const mapDispatchToProps = (dispatch) => ({
  updateModuleList: (modules) => dispatch(updateModulesList(modules)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModuleSubjects);
