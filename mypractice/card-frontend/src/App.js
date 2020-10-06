// import React from 'react';
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

import React from 'react';
import './App.css';

class Deck extends React.Component {
    state = {
        cards: [
            {
                id: 1,
                title: 'C major',
                topic: 'Scales',
                category: 'Music Theory',
                difficulty: 1,
                duration: 15,
                view_count: 0,
                content: 'Lorem ipsum'
            },
            {
                id: 2,
                title: 'G minor',
                topic: 'Scales',
                category: 'Music Theory',
                difficulty: 1,
                duration: 15,
                view_count: 0,
                content: 'Lorem ipsum'
            }
        ]
    }

    createNewCard = (card) => {
        card.id = Math.floor(Math.random() * 1000);
        this.setState({cards: this.state.cards.concat([card])});
    }

    updateCard = (newCard) => {
        const newCards = this.state.cards.map(card => {
            if (card.id === newCard.id) {
                return Object.assign({}, newCard)
            } else {
                return card;
            }
        });
        this.setState({cards: newCards});
    }

    deleteCard = (cardId) => {
        this.setState({cards: this.state.cards.filter(card => card.id !== cardId)})
    }
    render() {
        return (
            <main className="d-flex justify-content-center my-4">
                <div  className="col-5">
                    <CardList
                        cards={this.state.cards}
                        onDeleteClick={this.deleteCard}
                        onUpdateClick={this.updateCard}
                    />
                    <ToggleableCardForm
                        onCardCreate={this.createNewCard}
                    />
                </div>
            </main>
        )
    }
}

class CardList extends React.Component {
    render() {
        const cards = this.props.cards.map(card => (
            <EditableCard
                key={card.id}
                id={card.id}
                title={card.title}
                topic={card.topic}
                category={card.category}
                difficulty={card.difficulty}
                duration={card.duration}
                view_count={card.view_count}
                content={card.content}
            ></EditableCard>
        ));
        return (
            <div>
                {cards}
            </div>
        );
    }
}

class EditableCard extends React.Component {
    state = {
        inEditMode: false
    };
    enterEditMode = () => {
        this.setState({inEditMode: true});
    }
    leaveEditMode = () => {
        this.setState({inEditMode: false});
    }
    handleDelete = () => {
        this.props.onDeleteClick(this.props.id);
    }
    handleUpdate = (card) => {
        this.leaveEditMode()
        card.id = this.props.id;
        this.props.onUpdateClick(card);
    }
    render() {
        const component = () => {
            if(this.state.inEditMode) {
                return (
                    <CardForm
                        key={this.props.id}
                        id={this.props.id}
                        title={this.props.title}
                        topic={this.props.topic}
                        category={this.props.category}
                        difficulty={this.props.difficulty}
                        duration={this.props.duration}
                        view_count={this.props.view_count}
                        content={this.props.content}
                        onCancelClick={this.leaveEditMode}
                        onFormSubmit={this.handleUpdate}
                    />
                );
            }
            return (
                <Card
                    title={this.props.title}
                    topic={this.props.topic}
                    category={this.props.category}
                    difficulty={this.props.difficulty}
                    duration={this.props.duration}
                    view_count={this.props.view_count}
                    content={this.props.content}
                    onEditClick={this.enterEditMode}
                    onDeleteClick={this.handleDelete}
                />
            )
        }
        return (
            <div className="mb-3 p-4" style={{boxShadow: '0 0 10px #ccc'}} >
                {component()}
            </div>
        )
    }
}

class Card extends React.Component {
    render() {
        return (
            <div className="card" /* style="width: 18rem;" */>
                <div className="card-header d-flex justify-content-between">
          <span>
            <strong>Title: </strong>{this.props.title}
          </span>
                    <div>
                        <span onClick={this.props.onEditClick} className="mr-2"><i className="far fa-edit"></i></span>
                        <span onClick={this.props.onDeleteClick}><i className="fas fa-trash"></i></span>
                    </div>
                </div>
                <div className="card-body">
                    {this.props.content}
                </div>
                <div className="card-footer">
                    <strong>Topic:</strong>  {this.props.topic}
                </div>
            </div>
        );
    }
}

class CardForm extends React.Component {
    state = {
        title: this.props.title || '',
        topic: this.props.topic || '',
        category: this.props.category || '',
        difficulty: this.props.difficulty || '',
        duration: this.props.duration || '',
        view_count: this.props.view_count || '',
        content: this.props.content || ''
    }
    handleFormSubmit = (evt) => {
        evt.preventDefault();
        this.props.onFormSubmit({...this.state});
    }
    handleTitleUpdate = (evt) => {
        this.setState({title: evt.target.value});
    }
    handleTopicUpdate = (evt) => {
        this.setState({topic: evt.target.value});
    }
    handleCategoryUpdate = (evt) => {
        this.setState({category: evt.target.value});
    }
    handleDifficultyUpdate = (evt) => {
        this.setState({difficulty: evt.target.value});
    }
    handleDurationUpdate = (evt) => {
        this.setState({duration: evt.target.value});
    }
    handleViewCountUpdate = (evt) => {
        this.setState({view_count: evt.target.value});
    }
    handleContentUpdate = (evt) => {
        this.setState({content: evt.target.value});
    }
    render() {
        const buttonText = this.props.id ? 'Update Card': 'Create Card';
        return (
            <form onSubmit={this.handleFormSubmit}>
                <div className="form-group">
                    <label>
                        Title
                    </label>
                    <input type="text" placeholder="Enter a title"
                           value={this.state.title} onChange={this.handleTitleUpdate}
                           className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>
                        Topic
                    </label>
                    <input type="text" placeholder="Topic name"
                           value={this.state.topic} onChange={this.handleTopicUpdate}
                           className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>
                        Content
                    </label>
                    <textarea className="form-control" placeholder="Card Content"
                              rows="5" value={this.state.content}
                              onChange={this.handleContentUpdate}
                    >
            {this.state.content}
          </textarea>
                </div>
                <div className="form-group d-flex justify-content-between">
                    <button type="submit" className="btn btn-md btn-primary">
                        {buttonText}
                    </button>
                    <button type="button" className="btn btn-md btn-secondary" onClick={this.props.onCancelClick}>
                        Cancel
                    </button>
                </div>
            </form>
        )
    }
}

class ToggleableCardForm extends React.Component {
    state = {
        inCreateMode: false
    }
    handleCreateClick = () => {
        this.setState({inCreateMode: true});
    }
    leaveCreateMode = () => {
        this.setState({inCreateMode: false});
    }
    handleCancleClick = () => {
        this.leaveCreateMode();
    }
    handleFormSubmit = (card) => {
        this.leaveCreateMode();
        this.props.onCardCreate(card);
    }
    render() {
        if (this.state.inCreateMode) {
            return (
                <div className="mb-3 p-4" style={{boxShadow: '0 0 10px #ccc'}} >
                    <CardForm
                        onFormSubmit={this.handleFormSubmit}
                        onCancelClick={this.handleCancleClick}></CardForm>
                </div>

            )
        }
        return (
            <button onClick={this.handleCreateClick} className="btn btn-secondary">
                <i className="fas fa-plus"></i>
            </button>
        );
    }
}

export default Deck;