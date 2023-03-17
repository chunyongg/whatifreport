import { allModules, moduleSubjects } from "../data/data";

const DEFAULT_DATA = {
  moduleSubjects,
  correctModules: [
    {
      subject: "CS",
      code: "4249",
      courseName: "Phenomena and Theories of Human-Computer Interaction",
    },
    {
      subject: "ACC",
      code: "1701X",
      courseName: "Accounting for Decision Makers",
    },
    {
      subject: "GET",
      code: "1050",
      courseName: "Computational Reasoning",
    },
  ],
  allModules,
};

const data = (state = DEFAULT_DATA, action) => {
  switch (action.type) {
    case 'UPDATE_LIST':
      return {
        ...state,
        allModules: [...action.modules]
      }
    case "UPDATE_CORRECT_MODULES":
      return {
        ...state,
        correctModules: action.correctModules,
      };
    default:
      return state;
  }
};

export default data;
