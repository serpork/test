export const GET_RECIPES = 'GET_RECIPES';

export function getRecipes() {
  const storagePrefix = '_username_recipes_';
  const recipes = {};

  //localStorage.setItem('_username_recipes_pie', 'Cake__oil__fat__candy');
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i).indexOf('_username_recipes_') != -1) {
      let value = localStorage.getItem(localStorage.key(i));
      let key = localStorage.key(i);
      recipes[key] = value;
    }
  }

  return {
    type: GET_RECIPES,
    payload: recipes,
  };
}
