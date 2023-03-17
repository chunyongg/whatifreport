import styles from "./CatalogPage.module.css";
import ModuleList from "./ModuleList";
import openTriangle from "../../assets/triangle-expanded.jpg";
import triangle from "../../assets/triangle.jpg";

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

export default ModuleCategory;