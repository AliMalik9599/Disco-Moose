import React from 'react';
// import logo from './logo.svg';
// import './App.css';
//
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
//
// export default App;

class App extends React.Component {
    state = {
        tasks: ['task 1', 'task 2', 'task 3']
    };

    handleSubmit = task => {
        this.setState({tasks: [...this.state.tasks, task]});
    };

    handleDelete = (index) => {
        const newArr = [...this.state.tasks];
        newArr.splice(index, 1);
        this.setState({tasks: newArr});
    };

    render() {
        return(
            <div className='wrapper'>
                <div className='card frame'>
                    <Header numTodos={this.state.tasks.length} />
                    <TodoList tasks={this.state.tasks} onDelete={this.handleDelete} />
                    <SubmitForm onFormSubmit={this.handleSubmit} />
                </div>
            </div>
        );
    }
}


class SubmitForm extends React.Component {
    state = { term: '' };

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.term === '') return;
        this.props.onFormSubmit(this.state.term);
        this.setState({ term: '' });
    };

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <input
                    type='text'
                    className='input'
                    placeholder='Enter Item'
                    value={this.state.term}
                    onChange={(e) => this.setState({term: e.target.value})}
                />
                <button className='button'>Submit</button>
            </form>
        );
    }
}


const Header = (props) => {
    return(
        <div className='card-header'>
            <h1 className='card-header-title header'>
                You have {props.numTodos} Todos
            </h1>
        </div>
    )
};


const TodoList = (props) => {
    const todos = props.tasks.map((todo, index) => {
        return <Todo content={todo} key={index} id={index} onDelete={props.onDelete} />
    });
    return(
        <div className='list-wrapper'>
            {todos}
        </div>
    );
};

const Todo = (props) => {
    return(
        <div className='list-item'>
            {props.content}
            <button class="delete is-pulled-right" onClick={() => {props.onDelete(props.id)}}></button>
        </div>
    );
};

export default App;

// ReactDOM.render(
//     <App />,
//     document.querySelector('#root')
// );