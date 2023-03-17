import styles from "./CatalogPage.module.css";

function Header() {
  return (
    <>
      <p className={styles.nameText}>JOHN DOE</p>
      <div style={{ height: "40px" }} />
      <p className={styles.primaryText}>What-If Report</p>
      <div style={{ height: "63px" }} />
    </>
  );
}

export default Header;