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

let cardsData = [
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

const CardList = (props) => {
  return (
    <div>
      {props.cards.map(card => <Card {...card}/>)}
    </div>
  );
};

ReactDOM.render(<CardList cards={cardsData} />, mountNode);
