// https://jscomplete.com/repl
// write code here and click the execute button
// mountNode.innerHTML="MMMM"

class Button extends React.Component {

	constructor(props) {
  	super(props)
  	this.state = {counter: 0}
	}

  handleClick = () => {
    // To avoid race-condition use prevState property.
  	this.setState((prevState) => ({
  	   counter: prevState.counter + 1
  	}));

    // The below code cannot handle race-condition
  	// this.setState({
  	// counter: this.state.counter + 1
  	// });
  };

  render() {
  	return (
    	<button onClick={this.handleClick}>
      	{this.state.counter}
      </button>
    )
  }
}

ReactDOM.render(<Button />, mountNode);
