import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { addModule, removeModule } from "../../actions";
import styles from "./CatalogPage.module.css";
import ShortYellowButton from "../../components/ShortYellowButton";
import Form from "react-bootstrap/Form";

function ModuleList({ modules, addModule, removeModule, iv2 }) {
  const navigate = useNavigate();
  if (modules.length === 0) {
    return (
      <div className={styles.moduleBox}>
        <p>No active courses offered for this Subject.</p>
      </div>
    );
  }
  function SelectModuleButton({ mod }) {
    const [isModuleSelected, setModuleSelected] = useState(false);
    const handleCheckbox = () => {
      setModuleSelected(!isModuleSelected);
    };
    useEffect(() => {
      if (isModuleSelected) {
        addModule(mod);
      } else {
        removeModule(mod);
      }
    }, [isModuleSelected, mod]);
    if (!iv2) {
      return (
        <ShortYellowButton
          onClick={() => {
            addModule(mod);
            navigate(-1);
          }}
        >
          Select
        </ShortYellowButton>
      );
    } else {
      return (
        <Form.Check
          type={"checkbox"}
          id={`selected-checkbox`}
          value={isModuleSelected}
          onChange={handleCheckbox}
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

const mapDispatchToProps = (dispatch) => ({
  addModule: (module) => dispatch(addModule(module)),
  removeModule: (module) => dispatch(removeModule(module)),
});

export default connect(null, mapDispatchToProps)(ModuleList);
