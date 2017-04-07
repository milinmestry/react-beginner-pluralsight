const Stars = (props) => {
  const numberofStars = 1 + Math.floor(Math.random()*9)

  let stars = []
  for (let i=0; i<numberofStars; i++) {
    stars.push(<i key={i} className="fa fa-star"></i>)
  }

  return(
    <div className="col-5">
      {stars}
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
      ...
    </div>
  );
}

const Numbers = (props) => {
  return(
    <div className="card text-center">
      <span>1</span>
      <span>2</span>
      <span>3</span>
    </div>
  );
}

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
