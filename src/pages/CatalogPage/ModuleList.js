import { useNavigate } from "react-router-dom";

import styles from "./CatalogPage.module.css";
import ShortYellowButton from "../../components/ShortYellowButton";

function ModuleList({ modules, addModule, iv2 }) {
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

export default ModuleList;
