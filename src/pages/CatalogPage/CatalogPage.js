import { useState } from "react";

import styles from "./CatalogPage.module.css";
import Page from "../../components/Page";
import Header from "./Header";
import FilterBox from "./FilterBox";
import ModuleSubjects from "./ModuleSubjects";

function CatalogPage({ iv1, iv2, iv3 }) {
  const [currentFilter, setFilter] = useState("A");

  /* Set filter */
  const callback = (filter) => {
    setFilter(filter);
  };

  return (
    <Page title="What-if Report Scenario" iv3={iv3}>
      <div className={styles.container}>
        <Header />
        <FilterBox
          iv1={iv1}
          callback={callback}
          currentFilter={currentFilter}
        />
        <ModuleSubjects iv1={iv1} iv2={iv2} currentFilter={currentFilter} />
        <div style={{ height: "10px" }} />
        <hr />
        <div style={{ height: "30px" }} />
      </div>
    </Page>
  );
}

export default CatalogPage;
