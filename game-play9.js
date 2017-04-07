const Stars = (props) => {
  const numberofStars = 1 + Math.floor(Math.random()*9)

  return(
    <div className="col-5">
      {_.range(numberofStars).map(i =>
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
      <span>5</span>
      <span>9</span>
    </div>
  );
}

const Numbers = (props) => {
  return(
    <div className="card text-center">
      {Numbers.list.map((number, i) =>
        <span key={i}>{number}</span>
      )}
    </div>
  );
}

// Reusable number list
Numbers.list = _.range(1, 10);

class Game extends React.Component {
  render() {
    return (
      <div className="container">
        <h3>Play Nine</h3>
        <hr />
        <div className="row">
          <Stars />
          <Button />
          <Answer />
        </div>
        <br />
        <Numbers />
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
