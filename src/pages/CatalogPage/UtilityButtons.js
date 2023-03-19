import styles from "./CatalogPage.module.css";
import ShortYellowButton from "../../components/ShortYellowButton";
import { connect } from "react-redux";
import { firstClick } from "../../actions";
import loggingjs from "../../logging";

function UtilityButtons({ collapse, expand, navigateBack, updateFirstClick, hasClickedFirstClick }) {
  return (
    <div className={styles.filterRow}>
      <ShortYellowButton className={styles.collapse} onClick={() => {
        if (!hasClickedFirstClick) {
          updateFirstClick();
          loggingjs.logEvent('FIRST_CLICK_FAIL', 1);
        }
        collapse();
      }}>
        Collapse All
      </ShortYellowButton>
      <ShortYellowButton className={styles.expand} onClick={() => {
        if (!hasClickedFirstClick) {
          updateFirstClick();
          loggingjs.logEvent('FIRST_CLICK_FAIL', 1);
        }
        expand();
      }}>
        Expand All
      </ShortYellowButton>
      <ShortYellowButton className={styles.cancel} onClick={() => {
        if (!hasClickedFirstClick) {
          updateFirstClick();
          loggingjs.logEvent('FIRST_CLICK_FAIL', 1);
        }
        navigateBack();
      }}>
        Cancel
      </ShortYellowButton>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  updateFirstClick: () => dispatch(firstClick()),
});

const mapStateToProps = (state) => {
  return {
    hasClickedFirstClick: state.data.hasClickedFirstClick,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UtilityButtons);
