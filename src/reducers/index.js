import { combineReducers } from 'redux';
import Recipes from './recipes';

const rootReducer = combineReducers({
  recipes: Recipes,
});

export default rootReducer;
