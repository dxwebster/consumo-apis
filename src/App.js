import React, { Component } from 'react';
import cx from 'classnames';


export default class TodoList extends Component {

    state = {
        todo: "",
        todos : [],
        active: false,
    }

    constructor(props) {
        super(props);

        this.todoChange = this.todoChange.bind(this);
        this.todoClick = this.todoClick.bind(this);
        this.todoComplete = this.todoComplete.bind(this);

    }

    render() {
              
        return (
            <>
                <div>
                    <h2>Todo List</h2>

                     <input onChange={ this.todoChange } type="text" value={ this.state.todo }/>
                     <button onClick={ this.todoClick }>Adicionar</button>
                     <p><span>0</span> remaining out of <span>0</span> tasks</p>
                      
                    
                    <ul>{ this.state.todos.map(todo => <li key={ todo } class={this.state.active ? 'is-done' : null} onClick={this.todoComplete}>{ todo }</li>) }</ul>
                </div>
                <style>{`.is-done {text-decoration: line-through;}`}</style>
            </>
        );
    }

    todoChange(event) {
        this.setState({ todo : event.target.value });
    }

    todoClick() {
      if(!this.state.todo == " "){
          this.setState({ todos : [].concat(this.state.todos, this.state.todo) });
      }   
    }

    todoComplete(){
       const currentState = this.state.active
       this.setState({active: !currentState})
    }

    
}