const moduleCart = (state = [], action) => {
    switch (action.type) {
      case 'ADD_MODULE':
        return [
          ...state,
          action.module
        ]
      case 'REMOVE_MODULE':
        const list = [...state];
        return list.filter((mod) => mod.code !== action.module.code || mod.subject !== action.module.subject);
      case 'RESET_LIST':
        return []
      default:
        return state
    }
  }
  
  export default moduleCart;
