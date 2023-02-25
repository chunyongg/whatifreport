const DEFAULT_DATA = {
    moduleSubjects: [
        { name: "Asian Studies", subject: "AA" },
        { name: "Applied Biomedicine", subject: "ABM" },
        { name: "Architectural Conservation", subject: "AC" },
        { name: "Accounting", subject: "ACC" },
        { name: "Computer Science", subject: "CS" },
        {name: "Gen Edn(Thinking & Epxression)", subject: "GET"},
      ],
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
      allModules: [
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
    ]
};

const data = (state = DEFAULT_DATA, action) => {
    switch (action.type) {
      default:
        return state
    }
  }
  
  export default data;