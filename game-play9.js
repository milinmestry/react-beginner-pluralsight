// https://gist.github.com/samerbuna/aa1f011a6e42d6deba46
// bit.ly/s-pcs
var possibleCombinationSum = function(arr, n) {
  if (arr.indexOf(n) >= 0) { return true; }
  if (arr[0] > n) { return false; }
  if (arr[arr.length - 1] > n) {
    arr.pop();
    return possibleCombinationSum(arr, n);
  }
  var listSize = arr.length, combinationsCount = (1 << listSize)
  for (var i = 1; i < combinationsCount ; i++ ) {
    var combinationSum = 0;
    for (var j=0 ; j < listSize ; j++) {
      if (i & (1 << j)) { combinationSum += arr[j]; }
    }
    if (n === combinationSum) { return true; }
  }
  return false;
};


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
      <button className="btn sm-btn btn-warning" onClick={props.redraw}
        disabled={props.redraws === 0}>
        <i className="fa fa-refresh"></i> {props.redraws}
      </button>
    </div>
  );
}

const Answer = (props) => {
  return(
    <div className="col-5">
    {props.selectedNumbers.map((number, i) =>
      <span className="badge" key={i} onClick={() => props.unselectNumer(number)}>{number}</span>
    )}
    </div>
  );
}

const Numbers = (props) => {
  const numberClassName = (number) => {
    let klass = 'badge';
    if (props.usedNumbers.indexOf(number) >= 0) {
      return 'used ' + klass;
    }
    if (props.selectedNumbers.indexOf(number) >= 0) {
      return 'selected ' + klass;
    }
    return klass;
  };

  return(
    <div className="breadcrumb text-center">
      {Numbers.list.map((number, i) =>
        <span key={i} className={numberClassName(number)}
          onClick={() => props.selectNumer(number)}>
          {number}
        </span>
      )}
    </div>
  );
}

const DoneFrame = (props)  => {
  return (
    <div className="text-center">
      <h2>{props.doneStatus}</h2>
      <button className="btn btn-secondary" onClick={props.resetGame}>Play again?</button>
    </div>
  );
};

// Reusable number list
Numbers.list = _.range(1, 10);

class Game extends React.Component {
  static randomNumber = () => 1 + Math.floor(Math.random()*9);
  static initialState = () => ({
    selectedNumbers: [],
    randomNumberofStars: Game.randomNumber(),
    usedNumbers: [],
    answerIsCorrect: null,
    redraws: 5,
    doneStatus: null,
  });

  state = Game.initialState();
  resetGame = () => this.setState(Game.initialState());

  selectNumer = (clickedNumber) => {
    // Prevent clicking on Numbers again and again
    if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0) { return; }
    if (this.state.usedNumbers.indexOf(clickedNumber) >= 0) { return; }
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
      randomNumberofStars: Game.randomNumber(),
    }), this.updateDoneStatus);
  };

  redrawGame = () => {
    if (this.state.redraws === 0) { return; }
    this.setState(prevState => ({
      selectedNumbers: [],
      answerIsCorrect: null,
      randomNumberofStars: Game.randomNumber(),
      redraws: prevState.redraws - 1,
    }), this.updateDoneStatus);
  };

  possibleSolutions = ({usedNumbers, randomNumberofStars}) => {
    const possibleNumbers = _.range(1,10).filter(number =>
      usedNumbers.indexOf(number) === -1
    );
    return possibleCombinationSum(possibleNumbers, randomNumberofStars);
  };

  updateDoneStatus = () => {
    this.setState((prevState) => {
      if (prevState.usedNumbers.length === 9) {
        return { doneStatus: "Done. Nice!" };
      }
      if (prevState.redraws === 0 && !this.possibleSolutions(prevState)) {
        return { doneStatus: "Game Over!" };
      }
    });
  }

  render() {
    const {
      randomNumberofStars,
      selectedNumbers,
      answerIsCorrect,
      usedNumbers,
      redraws,
      doneStatus,
    } = this.state;

    return (
      <div className="container">
        <h3 className="heading">Play Nine</h3>
        <hr />
        <div className="row">
          <Stars numberofStars={randomNumberofStars} />

          <Button selectedNumbers={selectedNumbers}
            checkAnswer={this.checkAnswer}
            acceptAnswer={this.acceptAnswer}
            redraw={this.redrawGame}
            answerIsCorrect={answerIsCorrect}
            redraws={redraws} />

          <Answer selectedNumbers={selectedNumbers}
            unselectNumer={this.unselectNumer} />
        </div>
        <br />
        {doneStatus
          ? <DoneFrame resetGame={this.resetGame} doneStatus={doneStatus} />
          : <Numbers selectedNumbers={selectedNumbers}
              selectNumer={this.selectNumer}
              usedNumbers={usedNumbers} />
        }
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
