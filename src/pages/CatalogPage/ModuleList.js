import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import styles from "./CatalogPage.module.css";
import ShortYellowButton from "../../components/ShortYellowButton";
import loggingjs from "../../logging";

function ModuleList({ modules, addModule, iv2, selectedModules, correctModules }) {
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
            if (selectedModules.length === 0) {
              const correctMod = correctModules[0];
              const isCorrectMod = mod.code === correctMod.code && mod.subject === correctMod.subject;
              if (isCorrectMod) {
                loggingjs.logEvent('SUCCESS_ADD_FIRST_MODULE', 1);
              }
            } else if (selectedModules.length === 1) {
              const correctMod = correctModules[1];
              const isCorrectMod = mod.code === correctMod.code && mod.subject === correctMod.subject;
              if (isCorrectMod) {
                loggingjs.logEvent('SUCCESS_ADD_SECOND_MODULE', 1);
              }  
            } else if (selectedModules.length === 2) {
              const correctMod = correctModules[2];
              const isCorrectMod = mod.code === correctMod.code && mod.subject === correctMod.subject;
              if (isCorrectMod) {
                loggingjs.logEvent('SUCCESS_ADD_THIRD_MODULE', 1);
              } 
            }
            addModule(mod);
            if (!iv2) {
              navigate(-1);
            }
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

function mapStateToProps(state) {
  return {
    selectedModules: state.moduleCart,
    correctModules: state.data.correctModules
  }
}

export default connect(mapStateToProps, null)(ModuleList);
