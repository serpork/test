import { GET_RECIPES } from '../actions/index'

export default function(state = [], action) {
  const {type} = action

  switch(type) {
    case GET_RECIPES:
      return { ...state, recipes: action.payload }
  }

  // if (action.type === GET_RECIPES) {
  //   return { ...state, recipes: action.payload };
  // }

  return state
}
