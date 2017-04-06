// https://jscomplete.com/repl
// write code here and click the execute button
// mountNode.innerHTML="MMMM"

class Button extends React.Component {

  // handleClick = () => {
  //   // To avoid race-condition use prevState property.
  // 	this.setState((prevState) => ({
  // 	   counter: prevState.counter + 1
  // 	}));
  // };

  render() {
  	return (
    	<button onClick={this.props.onClickFunction}>
      	+1
      </button>
    )
  }
}

const Result = (props) => {
	return(
  	<div>{props.counter}</div>
  )
}

class App extends React.Component {
	state = {counter: 0};

  incrementCounter = () => {
  	this.setState((prevState) => ({
    	counter: prevState.counter + 1
    }));
  }

	render() {
		return (
    	<div>
      	<Button onClickFunction={this.incrementCounter} />
        <Result counter={this.state.counter} />
      </div>
    )
  }
}

ReactDOM.render(<App />, mountNode);
