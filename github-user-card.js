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
      {props.cards.map(card => <Card key={card.id} {...card}/>)}
    </div>
  );
};

class Form extends React.Component {
  state = {userName: ''}

  handleSubmit = (event) => {
    event.preventDefault();
    // console.log("Form submitted. | ", this.state.userName);
    axios.get(`https://api.github.com/users/${this.state.userName}`)
    .then(resp => {
      this.props.onSubmit(resp.data);
      this.setState({userName: ''});
    }).catch(function (error) {
      console.log(error);
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text"
          value={this.state.userName}
          onChange={(event) => this.setState({ userName: event.target.value })}
          placeholder="GitHub username" required />
        <button type="submit">Add Card</button>
      </form>
    );
  }
}

class App extends React.Component {
  state = {
    cardsData: []
  }

  addNewCard = (cardInfo) => {
    // console.log(cardInfo);
    this.setState(prevState => ({
      cardsData: prevState.cardsData.concat(cardInfo)
    }));
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.addNewCard} />
        <CardList cards={this.state.cardsData} />
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
