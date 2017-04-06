const Card = (props) => {
  // http://placehold.it/150x150
  return (
    <div style={{margin: '1em'}}>
      <img width="75" src={props.avatar_url} />
      <div style={{display: 'inline-block', marginLeft: '10'}}>
        <div style={{fontSize: '1.25em', fontWeight: 'bolder'}}>
          {props.name}
        </div>
        <div>{props.company}</div>
      </div>
    </div>
  );
};

const CardList = (props) => {
  return (
    <div>
      {props.cards.map(card => <Card {...card}/>)}
    </div>
  );
};

class Form extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted. | ", this.userNameInput.value);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text"
          ref={(input) => this.userNameInput = input}
          placeholder="GitHub username" required />
        <button type="submit">Add Card</button>
      </form>
    )
  }
}

class App extends React.Component {
  state = {
    cardsData: [
      {
        name: "Chris Wanstrath",
        avatar_url: "https://avatars3.githubusercontent.com/u/2?v=3",
        company: "Github",
      },
      {
        name: "Yehuda Katz",
        avatar_url: "https://avatars3.githubusercontent.com/u/4?v=3",
        company: "Tilde, Inc.",
      }
    ]
  }
  render() {
    return (
      <div>
        <Form />
        <CardList cards={this.state.cardsData} />
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
