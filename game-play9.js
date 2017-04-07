const Stars = (props) => {
  return(
    <div className="col-5">
      {_.range(props.numberofStars).map(i =>
        <i key={i} className="fa fa-star"></i>
      )}
    </div>
  );
}

const Button = (props) => {
  return(
    <div className="col-2">
      <button className="btn xs-btn">=</button>
    </div>
  );
}

const Answer = (props) => {
  return(
    <div className="col-5">
    {props.selectedNumbers.map((number, i) =>
      <span key={i}>{number}</span>
    )}
    </div>
  );
}

const Numbers = (props) => {
  const numberClassName = (number) => {
    if (props.selectedNumbers.indexOf(number) >= 0) {
      return 'selected';
    }
  };

  return(
    <div className="card text-center">
      {Numbers.list.map((number, i) =>
        <span key={i} className={numberClassName(number)}
          onClick={() => props.selectNumer(number)}>
          {number}
        </span>
      )}
    </div>
  );
}

// Reusable number list
Numbers.list = _.range(1, 10);

class Game extends React.Component {
  state = {
    selectedNumbers: [],
    randomNumberofStars: 1 + Math.floor(Math.random()*9),
  }

  selectNumer = (clickedNumber) => {
    // Prevent clicking on Numbers again and again
    if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0) { return; }
    this.setState(prevState => ({
      selectedNumbers:prevState.selectedNumbers.concat(clickedNumber)
    }));
  };

  render() {
    return (
      <div className="container">
        <h3>Play Nine</h3>
        <hr />
        <div className="row">
          <Stars numberofStars={this.state.randomNumberofStars} />
          <Button />
          <Answer selectedNumbers={this.state.selectedNumbers} />
        </div>
        <br />
        <Numbers selectedNumbers={this.state.selectedNumbers}
          selectNumer={this.selectNumer} />
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <Game />
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
