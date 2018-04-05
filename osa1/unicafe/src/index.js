import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function sum(a) {
  return a.reduce((a,b) => a+b,0);
}

const Statistics = (props) => {
  let totalAmount = sum(props.counters.map(c=>c.amount));
  let statistics = props.counters.map(c => <Statistic key={c.name} counter={c}/>)

  let average = (sum(props.counters.map(c => c.amount * c.value)) / Math.max(totalAmount, 1)).toFixed(1);
  let positive = (100 * props.counters.find(c => c.name === 'hyvä').amount / Math.max(totalAmount, 1)).toFixed(1);

  let content = totalAmount > 0 ? (
    <div>
      <h1>statistiikka</h1>
      <table>
        <tbody>
          {statistics}
          <tr><td>keskiarvo</td><td>{average}</td></tr>
          <tr><td>positiivisa</td><td>{positive}%</td></tr>
        </tbody>
      </table>
    </div>
  ) : (
    <div>
      <h1>stataistiikka</h1>
      <div>ei yhtään palautetta annettu</div>
    </div>
  )

  return content;
}

const Statistic = (props) => {
  return <tr><td>{props.counter.name}</td><td>{props.counter.amount}</td></tr>
}

const Button = (props) => {
  return (
    <button onClick={props.onclick}>{props.name}</button>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counters: [
        { name: 'hyvä',
          amount: 0,
          value: 1 },
        { name: 'neutraali',
          amount: 0,
          value: 0 },
        { name: 'huono',
          amount: 0,
          value: -1 }
      ]
    }
  }

  increment(counter) {
    counter.amount += 1;
    this.setState({ counters: this.state.counters }); // sama kuin render():n kutsuminen
  }

  render() {
    let buttons = this.state.counters.map(c => <Button key={c.name} onclick={() => this.increment(c)} name={c.name}/>)
    return (
      <div>
        <div><h1>anna palautetta</h1></div>
        <div>
          {buttons}
        </div>
        <Statistics counters={this.state.counters}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
