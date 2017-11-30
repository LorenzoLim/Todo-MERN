import React, { Component } from 'react';
import { Input, Hero } from 'reactbulma';
import Header from './components/Header';
import axios from 'axios';
import './App.css';


let currentId = 50;
const genId = () => currentId++;

class App extends Component {
  state = {
    tasks: [

    ],
    searchPhrase: ''
  }

  componentWillMount() {
    axios.get('/api/tasks')
    .then((response) => {
      console.log('Success!');
      console.log(response.data);
      this.setState({
        tasks: response.data
      })

    })
    .catch((error) => {
      console.log('Whoops');
      console.log(error);
    });
  };

  onChangeQuery = (event) => {
    console.log(event.target.value);
    this.setState({
      searchPhrase: event.target.value
    })
  }

  addTask = (event) => {
    event.preventDefault();
    const { tasks, searchPhrase } = this.state
    const existingItem = tasks.find(task => task.name === searchPhrase);
    if (!existingItem){
      const currentTasks = [...this.state.tasks, {
        id: genId(),
        name: this.state.searchPhrase,
        complete: false
      }];

      this.setState({
        tasks: currentTasks,
        searchPhrase: ''
      })
    }
  }

  render() {
    const { tasks, searchPhrase } = this.state
    console.log(tasks.reverse())
    return (
      <div className="App">
        <Header totalTasks={this.state.tasks.length} title="COMPLETE" />
        <form onSubmit={this.addTask}>
          <Input danger large
            placeholder="search / add a Task!"
            value={ searchPhrase }
            onChange={ this.onChangeQuery }/><br />
          </form>
          {
            tasks
            .filter(myTask => myTask.name.includes(searchPhrase))
            .reverse()
            .map(myTask => <Hero primary key={myTask.id}>{ myTask.name }<br />{ myTask.date.toLocaleString() }</Hero>)
          }
        </div>
      );
    }
  }

  export default App;
