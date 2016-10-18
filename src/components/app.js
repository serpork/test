import React, { Component } from 'react';
import { connect } from 'react-redux';

import RecipeList from '../containers/recipe_list';

export default class App extends Component {
  render() {
    return (
      <div><RecipeList /></div>
    );
  }
}
