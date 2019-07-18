import React, { Component } from 'react';
import './index.css';

/// Modifica el componente para que se puedan agregar tareas, tachar y destacharlas y error de validacion en el input

class App extends Component {
  constructor() {
    super()
    this.state = {
      tasks: [
        { id: 1, name: "Sacar la ropa", done: false },
        { id: 2, name: "Hacer la cama", done: true },
        { id: 3, name: "Leer un rato", done: false }
      ],
      newTask: '',
      isEmpty: false
    }
    this.count = this.state.tasks.length || 0;
    this.manageState = this.manageState.bind(this)
  }
  
  handleSubmit(e) {
    e.preventDefault()
    if (this.state.newTask !== "") {
      this.count++
      const tasks = this.state.tasks;
      const addTask = {
          id: this.count,
          name: this.state.newTask,
          done: false
      };
      this.setState({
        tasks: [...tasks, addTask],
        newTask: "",
        isEmpty: false
      })
    } else {
      this.setState({
        isEmpty: true
      })
    }
  }

  handleChange(e) {
    this.setState({
      newTask: e.target.value
    })
  }

  manageState(e) {
    /* --- Try 1 --- */
    // let tasks = []
    // this.state.tasks.forEach(t => {
    //   if(t.id === e) {
    //     t.done = !t.done
    //   }
    //   tasks.push(t)
    // })
    // this.setState({
    //   tasks: tasks
    // })

    this.setState({
      tasks: this.state.tasks.map(t => {
        if (t.id === e) {
          t.done = !t.done;
        }
        return t;
      })      
    })  
  }

  render() {
    return (
      <div className="wrapper">
        <div className="list">
          <h3>Por hacer:</h3>
          <ul className="todo">
            {this.state.tasks.map((task, index) => 
              <li key={task.id} onClick={() => this.manageState(task.id)} className={task.done ? "done" : null}>{task.name}</li>
            )}
          </ul>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input type="text" id="new-task" className={this.state.isEmpty ? "error" : null} value={this.state.newTask} placeholder="Ingresa una tarea y oprime Enter" onChange={this.handleChange.bind(this)} />
          </form>
        </div>
      </div>
    )
  }
}

export default App;
