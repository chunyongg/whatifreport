import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { addModule } from "../../actions";

import styles from "./CatalogPage.module.css";
import Page from "../../components/Page";
import Header from "./Header";
import FilterBox from "./FilterBox";
import UtilityButtons from "./UtilityButtons";
import ModuleSubjects from "./ModuleSubjects";
import ModuleCart from "./ModuleCart";

function CatalogPage({ addModule, data, iv1, iv2, iv3 }) {
  const [currentFilter, setFilter] = useState("A");
  const [selectedModuleSubjects, addSubject] = useState([]);
  const [modulesInCart, setModuleCart] = useState([]);
  const { moduleSubjects, allModules } = data;

  /* Select */
  const selectSubject = (subj) => {
    addSubject((prev) => [...prev, subj]);
  };

  /* Unselect */
  const unselectSubject = (subjToRemove) => {
    addSubject((prev) => prev.filter((subj) => subj !== subjToRemove));
  };

  /* Set filter */
  const callback = (filter) => {
    setFilter(filter);
  };

  /* Collapse all accordions */
  const collapse = () => {
    addSubject([]);
  };

  /* Expand all accordions */
  const expand = () => {
    for (const module of moduleSubjects) {
      const subject = module.subject;
      addSubject((prev) => [...prev, subject]);
    }
  };

  /* Add to module cart */
  const addToCart = (module) => {
    setModuleCart((prev) => [...prev, module]);
  }

  /* Remove from module cart */
  const removeFromCart = (module) => {
    setModuleCart((prev) => prev.filter((subj) => subj !== module));
  }

  /* Navigate back to home page */
  const navigate = useNavigate();
  const navigateBack = () => navigate(-1);

  return (
    <Page>
      <div className={styles.container}>
        <Header />
        <FilterBox
          iv1={iv1}
          callback={callback}
          currentFilter={currentFilter}
        />
        <UtilityButtons
          collapse={collapse}
          expand={expand}
          navigateBack={navigateBack}
        />
        <ModuleSubjects
          iv1={iv1}
          modules={allModules}
          currentFilter={currentFilter}
          selected={selectedModuleSubjects}
          selectSubject={selectSubject}
          unselectSubject={unselectSubject}
          moduleSubjects={moduleSubjects}
          addModule={addModule}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
        <UtilityButtons
          collapse={collapse}
          expand={expand}
          navigateBack={navigateBack}
        />
        <div style={{ height: "10px" }} />
        <hr />
        <div style={{ height: "30px" }} />
        {iv3 && <ModuleCart modules={modulesInCart} />}
      </div>
    </Page>
  );
}

function mapStateToProps(state) {
  const data = state.data;
  return {
    data,
  };
}

const mapDispatchToProps = (dispatch) => ({
  addModule: (module) => dispatch(addModule(module)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CatalogPage);
