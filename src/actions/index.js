
export const addModule = module => ({
  type: 'ADD_MODULE',
  module
})

export const removeModule = module => ({
  type: 'REMOVE_MODULE',
  module
})

export const updateCorrectModules = correctModules => ({
  type: 'UPDATE_CORRECT_MODULES',
  correctModules
})

export const updateModulesList = modules => ({type: 'UPDATE_LIST', modules})