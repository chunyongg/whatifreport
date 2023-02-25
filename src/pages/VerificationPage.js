
import React from 'react';
import { connect } from "react-redux";

function VerificationPage({modules, correctModules}) {
    const isIdentical = 
    modules.length === correctModules.length &&
    modules.every((currentMod) => {
        const correctMod = correctModules.filter((mod) => mod.subject === currentMod.subject && mod.code === currentMod.code);
        return correctMod.length > 0;
    });
    return isIdentical ? <div>Pass</div> : <div>Fail</div>
}

function mapStateToProps(state) {
    const moduleCart = state.moduleCart;
    const data = state.data;
    return {
      modules: moduleCart,
      correctModules: data.correctModules,
    };
  }
  export default connect(mapStateToProps)(VerificationPage);