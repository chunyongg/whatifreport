import styles from "./CatalogPage.module.css";
import ShortYellowButton from "../../components/ShortYellowButton";

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

export default UtilityButtons;