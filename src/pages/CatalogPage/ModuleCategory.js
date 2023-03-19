import styles from "./CatalogPage.module.css";
import ModuleList from "./ModuleList";
import openTriangle from "../../assets/triangle-expanded.jpg";
import triangle from "../../assets/triangle.jpg";
import loggingjs from "../../logging";
import { firstClick } from "../../actions";
import { connect } from "react-redux";

function ModuleCategory({
  iv2,
  allModules,
  subject,
  name,
  selected,
  selectSubject,
  unselectSubject,
  hasClickedFirstClick,
  updateFirstClick
}) {
  const isSelected = selected.includes(subject);
  const filteredModules = allModules.filter((mod) => mod.subject === subject);
  return (
    <>
      <div
        onClick={() => {
          if (!hasClickedFirstClick) {
            updateFirstClick();
            loggingjs.logEvent('FIRST_CLICK_FAIL', 1);
          }
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
      {isSelected && <ModuleList iv2={iv2} modules={filteredModules} />}
    </>
  );
}


const mapStateToProps = (state) => {
  return {
    hasClickedFirstClick: state.data.hasClickedFirstClick,
  };
};

const mapDispatchToProps = (dispatch) => ({
  updateFirstClick: () => dispatch(firstClick()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModuleCategory);
