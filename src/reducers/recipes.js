import { GET_RECIPES } from '../actions/index';

export default function(state = [], action) {
  if (action.type === GET_RECIPES) {
    return { ...state, recipes: action.payload };
  }

  return state;
}
