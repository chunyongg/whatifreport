import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { addModule, removeModule } from "../../actions";
import styles from "./CatalogPage.module.css";
import ShortYellowButton from "../../components/ShortYellowButton";
import Form from "react-bootstrap/Form";
import { allLevels } from "../../constants";
import loggingjs from "../../logging";

function ModuleList({
  modules,
  addModule,
  removeModule,
  iv2,
  selectedModules,
  correctModules,
}) {
  const navigate = useNavigate();
  if (modules.length === 0) {
    return (
      <div className={styles.moduleBox}>
        <p>No active courses offered for this Subject.</p>
      </div>
    );
  }

  function loggingLogic(mod) {
    if (selectedModules.length === 0) {
      const correctMod = correctModules[0];
      const isCorrectMod =
        mod.code === correctMod.code && mod.subject === correctMod.subject;
      if (isCorrectMod) {
        loggingjs.logEvent("SUCCESS_ADD_FIRST_MODULE", 1);
      }
    } else if (selectedModules.length === 1) {
      const correctMod = correctModules[1];
      const isCorrectMod =
        mod.code === correctMod.code && mod.subject === correctMod.subject;
      if (isCorrectMod) {
        loggingjs.logEvent("SUCCESS_ADD_SECOND_MODULE", 1);
      }
    } else if (selectedModules.length === 2) {
      const correctMod = correctModules[2];
      const isCorrectMod =
        mod.code === correctMod.code && mod.subject === correctMod.subject;
      if (isCorrectMod) {
        loggingjs.logEvent("SUCCESS_ADD_THIRD_MODULE", 1);
      }
    }
  }

  function SelectModuleButton({ mod }) {
    const isModuleSelected = selectedModules.find(
      (selected) =>
        selected.code === mod.code && selected.subject === mod.subject
    );

    const handleCheckbox = () => {
      if (!isModuleSelected) {
        loggingLogic(mod);
        addModule(mod);
      } else {
        removeModule(mod);
      }
    };

    if (iv2 === allLevels.ONE) {
      return (
        <ShortYellowButton
          className={styles.selectbtn}
          onClick={() => {
            loggingLogic(mod);
            addModule(mod);
            navigate(-1);
          }}
        >
          Select
        </ShortYellowButton>
      );
    } else if (iv2 === allLevels.MULTIPLE) {
      return (
        <Form.Check
          type={"checkbox"}
          id={`selected-checkbox`}
          onChange={handleCheckbox}
          className={styles.checkbox}
          checked={selectedModules.find(
            (module) =>
              module.code === mod.code && module.subject === mod.subject
          )}
        />
      );
    }
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
        <SelectModuleButton mod={mod} />
      </td>
    </tr>
  ));
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={`${styles.th} ${styles.firstCol}`} width="45">
            Module Nbr
          </th>
          <th className={styles.th} width="183">
            Module Title
          </th>
          <th className={styles.th} width="37">
            Typically Offered
          </th>
          <th className={styles.th} width="48">
            Select
          </th>
        </tr>
      </thead>
      <tbody>{mapped}</tbody>
    </table>
  );
}

function mapStateToProps(state) {
  return {
    selectedModules: state.moduleCart,
    correctModules: state.data.correctModules,
  };
}
const mapDispatchToProps = (dispatch) => ({
  addModule: (module) => dispatch(addModule(module)),
  removeModule: (module) => dispatch(removeModule(module)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModuleList);
