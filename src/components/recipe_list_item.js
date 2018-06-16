import React, { Component } from 'react'

export default class RecipeListItem extends Component {
  constructor(props) {
    super(props)

    let recipeArr = this.props.recipe.split('__')
    var ingridientList = recipeArr.slice(1).map((item, i) => {
      return <li className="ingridient-item" key={i}>{item}</li>
    })
    this.arrIngridients = recipeArr.slice(1)
    this.state = { isOpen: false, editForm: '', recipeTitle: recipeArr[0], recipeContent: ingridientList }
  }

  onTitleClick = () => this.setState(state => ({isOpen: !state.isOpen}))

  renderIngridiends = (title, content) => {
    if (title && content) {
      var ingridientList = content.split('__').map((item, i) => {
        return <li className="ingridient-item" key={i}>{item}</li>
      })
    } else {
      var  ingridientList = this.state.recipeContent.map((item, i) => {
        return <li className="ingridient-item" key={i}>{item}</li>
      })
    }

    this.setState({ recipeContent: ingridientList })
  }

  editHandler = (event, storageKey) => {
    event.preventDefault()

    let recipeTitle = event.target[0].value
    let recipeIngridients = event.target[1].value
    recipeIngridients = recipeIngridients.split(',').join('__')

    localStorage.setItem(storageKey, recipeTitle + '__' + recipeIngridients)

    this.setState({ recipeTitle: recipeTitle, editForm: '' })
    this.arrIngridients = recipeIngridients.split('__')

    this.renderIngridiends(recipeTitle, recipeIngridients)
  }

  onEditClick = () => {
    let formItem = (
      <form className="edit-form" onSubmit={((event) => {this.editHandler(event, this.props.storageKey)})}>
        <div><input defaultValue={this.state.recipeTitle} type="text" /></div>
        <div><textarea defaultValue={this.arrIngridients} /></div>
        <div><input className="form-btn" value="Edit recipe" type="submit" /></div>
      </form>
    )

    this.setState({ editForm: formItem })
  }

  render() {
    const {isOpen, editForm} = this.state
    const {storageKey} = this.props

    // Only title
    // if (!this.state.isOpen) {
    //   return (
    //     <div className="recipe-item">
    //     <div className="recipe-title" onClick={this.onTitleClick}>
    //       {this.state.recipeTitle}
    //     </div>
    //     </div>
    //   )
    // }

    // Full recipe
    return (
      <div className="recipe-item">
        <div onClick={this.onTitleClick} className="recipe-title">{this.state.recipeTitle}</div>

        {isOpen &&
          (<div className="form-content">
            {this.state.recipeContent}
            <div className="btn-group">
              <button className="btn-edit" onClick={this.onEditClick}>Edit</button>
              <button className="btn-delete" onClick={this.props.removeHandler(this.props.storageKey)}>Delete</button>
            </div>
            {this.state.editForm}
          </div>)
        }
      </div>
    )
  }
}
