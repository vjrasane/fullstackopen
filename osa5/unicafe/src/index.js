import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore } from 'redux'
import counterReducer from './reducer'


const store = createStore(counterReducer)

function sum(a) {
  return a.reduce((a,b) => a + b, 0);
}

// miksei tällaista ole standardina...
const mapObject = (obj, func) => {
  const array = []
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop))
      array.push(func(prop, obj[prop], obj))
  }
  return array
}

const mapStore = (func) => {
  return mapObject(store.getState(), func)
}

const finnish = {
  good: 'hyvä',
  ok: 'neutraali',
  bad: 'huono'
}

const values = {
  good: 1,
  ok: 0,
  bad: -1
}

const Statistic = ({ name, amount }) => {
  return <tr><td>{name}</td><td>{amount}</td></tr>
}

const Statistics = (props) => {
  let total = sum(mapStore((k, v) => v))
  let average = (sum(mapStore((k, v) => v * values[k])) / Math.max(total, 1)).toFixed(1);
  let positive = (100 * store.getState().good / Math.max(total, 1)).toFixed(1);

  return (
    <div>
      {total > 0 ?
        <div>
          <h1>statistiikka</h1>
          <table>
            <tbody>
              {mapStore((k, v) => <Statistic key={k} name={finnish[k]} amount={v}/>)}
              <tr><td>keskiarvo</td><td>{average}</td></tr>
              <tr><td>positiivisa</td><td>{positive}%</td></tr>
            </tbody>
          </table>
        </div> :
        <div>
          <h1>stataistiikka</h1>
          <div>ei yhtään palautetta annettu</div>
        </div>}
    </div>
  )
}

const App = (props) => {
  console.log(store.getState());
  return (
    <div>
      <div><h1>anna palautetta</h1></div>
      <div>
        {mapStore((k, v) =>
          <button
            key={k}
            onClick={() => store.dispatch({ type: k.toUpperCase() }) }>
            {finnish[k]}
          </button>)}
      </div>
      <Statistics />
    </div>
  )
}

const render = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
}

render()
store.subscribe(render)
