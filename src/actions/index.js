
export const addModule = module => ({
  type: 'ADD_MODULE',
  module
})

export const firstClick = () => ({type: 'FIRST_CLICK'})

export const restart = () => ({type: 'RESTART_ATTEMPT'})

export const resetModuleAddedList = () => ({type: 'RESET_LIST'})

export const startAttempt = () => ({type: 'START_ATTEMPT'})

export const removeModule = module => ({
  type: 'REMOVE_MODULE',
  module
})

export const updateCorrectModules = correctModules => ({
  type: 'UPDATE_CORRECT_MODULES',
  correctModules
})

export const updateModulesList = modules => ({type: 'UPDATE_LIST', modules})