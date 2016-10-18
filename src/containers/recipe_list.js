import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getRecipes } from '../actions/index';
import RecipeListItem from '../components/recipe_list_item';

class RecipeList extends Component {
  constructor(props) {
    super(props);

    this.props.getRecipes();
    this.noRecipes = 'No recipes found. Add your first recipe now!';
    this.state = { addForm: '' };
  }

  removeHandler(storageKey) {
    console.log(localStorage.getItem(storageKey));
    localStorage.removeItem(storageKey);
    this.props.getRecipes();
  }

  editHandler(event, storageKey) {
    event.preventDefault();

    let recipeTitle = event.target[0].value;
    let recipeIngridients = event.target[1].value;
    recipeIngridients = recipeIngridients.split(',').join('__');
    console.log(recipeIngridients);
    localStorage.setItem(storageKey, recipeTitle + '__' + recipeIngridients);
    this.props.getRecipes();
  }

  renderRecipeList() {
    let recipes = [];

    for (let storageKey in this.props.recipes) {
      let recipeItem = (
        <RecipeListItem
          removeHandler={this.removeHandler.bind(this)}
          editHandler = {this.editHandler.bind(this)}
          recipe={this.props.recipes[storageKey]}
          key={storageKey + Math.round(Math.random * 100)}
          storageKey={storageKey} />
      );

      recipes.push(recipeItem);
    }

    return recipes;
  }

  addHandler(event) {
    event.preventDefault();

    let recipeTitle = event.target[0].value;
    let recipeIngridients = event.target[1].value;
    recipeIngridients = recipeIngridients.split(',').join('__');

    if (recipeTitle) {
      localStorage.setItem('_username_recipes_' + recipeTitle, recipeTitle + '__' + recipeIngridients);
      this.setState({ addForm: '' });
      this.props.getRecipes();
    }
  }

  onAddClick() {
    let formItem = (
      <form className="edit-form" onSubmit={((event) => {this.addHandler(event);}).bind(this)}>
        <div><input placeholder="Recipe title" type="text" /></div>
        <div><textarea placeholder="Ingridients" /></div>
        <div><input className="form-btn" value="Add recipe" type="submit" /></div>
      </form>
    );

    this.setState({ addForm: formItem });
  }

  render() {
    if (!this.props.recipes) {
      return (<div></div>);
    } else if (!Object.keys(this.props.recipes).length) {
      return (
       <div className="recipe-list no-recipes">{this.noRecipes}
					<button className="add-btn" onClick={this.onAddClick.bind(this)}>Add</button>
					{this.state.addForm}
				</div>
      );
    }

    return (
      <div className="recipe-list">
        {this.renderRecipeList()}
        <button className="add-btn" onClick={this.onAddClick.bind(this)}>Add</button>
        {this.state.addForm}
			</div>
    );
  }
}

function mapStateToProps(recipes) {
  return { recipes: recipes.recipes.recipes };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getRecipes }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeList);
