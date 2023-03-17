import styles from "./CatalogPage.module.css";
import ModuleCategory from "./ModuleCategory";

function ModuleSubjects({
  iv1,
  modules,
  moduleSubjects,
  currentFilter,
  selected,
  selectSubject,
  unselectSubject,
  addModule,
  addToCart,
  removeFromCart
}) {
  function filteredSubjects() {
    switch (iv1) {
      case "Alphabet":
        return moduleSubjects.filter((mod) =>
          mod.subject.startsWith(currentFilter)
        );
      case "Relevance":
        switch (currentFilter) {
          case "Faculty Requirements":
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
            return moduleSubjects.filter((mod) => mod.subject === "CS");
          case "General Education Requirements":
            return moduleSubjects.filter((mod) => mod.subject.startsWith("GE"));
          case "Minor Requirements":
            return moduleSubjects.filter(
              (mod) => mod.subject === "CS" || mod.subject === "NM"
            );
          default:
            return moduleSubjects.filter(
              (mod) =>
                !(
                  mod.subject === "CS" ||
                  mod.subject === "CP" ||
                  mod.subject === "TR" ||
                  mod.subject === "MA" ||
                  mod.subject === "CM" ||
                  mod.subject === "LSM" ||
                  mod.subject === "PC" ||
                  mod.subject === "ST" ||
                  mod.subject === "ES" ||
                  mod.subject === "IS" ||
                  mod.subject === "NM"
                ) && !mod.subject.startsWith("GE")
            );
        }
      case "Search":
        return moduleSubjects.filter((mod) =>
          mod.subject.startsWith(currentFilter)
        );
      default:
        return moduleSubjects.filter((mod) =>
          mod.subject.startsWith(currentFilter)
        );
    }
  }
  const modulesMapped = filteredSubjects().map((mod, i) => (
    <ModuleCategory
      allModules={modules}
      subject={mod.subject}
      name={mod.name}
      key={i}
      selected={selected}
      selectSubject={selectSubject}
      unselectCode={unselectSubject}
      addModule={addModule}
      addToCart={addToCart}
      removeFromCart={removeFromCart}
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

export default ModuleSubjects;