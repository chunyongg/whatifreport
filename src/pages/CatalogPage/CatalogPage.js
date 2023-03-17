import { useState } from "react";

import { connect } from "react-redux";
import { addModule } from "../../actions";

import styles from "./CatalogPage.module.css";
import Page from "../../components/Page";
import Header from "./Header";
import FilterBox from "./FilterBox";
import ModuleSubjects from "./ModuleSubjects";
import ModuleCart from "./ModuleCart";

function CatalogPage({ addModule, data, iv1, iv2, iv3 }) {
  const [currentFilter, setFilter] = useState("A");

  /* Set filter */
  const callback = (filter) => {
    setFilter(filter);
  };

  return (
    <Page>
      <div className={styles.container}>
        <Header />
        <FilterBox
          iv1={iv1}
          callback={callback}
          currentFilter={currentFilter}
        />
        <ModuleSubjects
          iv1={iv1}
          iv2={iv2}
          currentFilter={currentFilter}
          addModule={addModule}
        />
        <div style={{ height: "10px" }} />
        <hr />
        <div style={{ height: "30px" }} />
        {iv3 && <ModuleCart />}
      </div>
    </Page>
  );
}



const mapDispatchToProps = (dispatch) => ({
  addModule: (module) => dispatch(addModule(module)),
});

export default connect(null, mapDispatchToProps)(CatalogPage);
