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
  let button;

  switch (props.answerIsCorrect) {
    case true:
      button =
      <button className="btn sm-btn btn-success" onClick={props.acceptAnswer}>
      <i className="fa fa-check"></i>
      </button>;
      break;
    case false:
      button =
      <button className="btn sm-btn btn-danger">
      <i className="fa fa-times"></i>
      </button>;
      break;
    default:
      button =
      <button className="btn sm-btn btn-primary"
        onClick={props.checkAnswer}
        disabled={props.selectedNumbers.length === 0}>
        =
      </button>;
  }

  return(
    <div className="col-2">
      {button}
      <br /><br />
      <button className="btn sm-btn btn-warning" onClick={props.redraw}>
        <i className="fa fa-refresh"></i>
      </button>
    </div>
  );
}

const Answer = (props) => {
  return(
    <div className="col-5">
    {props.selectedNumbers.map((number, i) =>
      <span key={i} onClick={() => props.unselectNumer(number)}>{number}</span>
    )}
    </div>
  );
}

const Numbers = (props) => {
  const numberClassName = (number) => {
    if (props.usedNumbers.indexOf(number) >= 0) {
      return 'used';
    }
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
    usedNumbers: [],
    answerIsCorrect: null,
  }

  selectNumer = (clickedNumber) => {
    // Prevent clicking on Numbers again and again
    if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0) { return; }
    this.setState(prevState => ({
      answerIsCorrect: null,
      selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
    }));
  };

  unselectNumer = (clickedNumber) => {
    this.setState(prevState => ({
      answerIsCorrect: null,
      selectedNumbers: prevState.selectedNumbers
        .filter(number => number !== clickedNumber)
    }));
  };

  checkAnswer = () => {
    this.setState(prevState => ({
      answerIsCorrect: prevState.randomNumberofStars ===
        prevState.selectedNumbers.reduce((acc, n) => acc + n, 0)
    }));
  };

  acceptAnswer = () => {
    this.setState(prevState => ({
      usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
      selectedNumbers: [],
      answerIsCorrect: null,
      randomNumberofStars: 1 + Math.floor(Math.random()*9),
    }));
  };

  redrawGame = () => {
    this.setState(prevState => ({
      selectedNumbers: [],
      answerIsCorrect: null,
      randomNumberofStars: 1 + Math.floor(Math.random()*9),
    }));
  };

  render() {
    const {
      randomNumberofStars,
      selectedNumbers,
      answerIsCorrect,
      usedNumbers,
    } = this.state;

    return (
      <div className="container">
        <h3>Play Nine</h3>
        <hr />
        <div className="row">
          <Stars numberofStars={randomNumberofStars} />
          <Button selectedNumbers={selectedNumbers}
            checkAnswer={this.checkAnswer}
            acceptAnswer={this.acceptAnswer}
            redraw={this.redrawGame}
            answerIsCorrect={answerIsCorrect} />
          <Answer selectedNumbers={selectedNumbers}
            unselectNumer={this.unselectNumer} />
        </div>
        <br />
        <Numbers selectedNumbers={selectedNumbers}
          selectNumer={this.selectNumer}
          usedNumbers={usedNumbers} />
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
