// https://jscomplete.com/repl
// write code here and click the execute button
// mountNode.innerHTML="MMMM"

const Button = function(props) {
	return (
  	<button>{props.label}</button>
  );
};
ReactDOM.render(<Button label="Click me" />, mountNode);
