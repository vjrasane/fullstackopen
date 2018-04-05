import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import './index.css';

const Country = (props) => {
  return (
    <li onClick={() => {props.onclick(props.country.name)}}>
      {props.country.name}
    </li>
  )
}

const CountryDetails = (props) => {
  return (
    <div>
      <h1>{props.country.name}</h1>
      <h4>capital: {props.country.capital}</h4>
      <h4>population: {props.country.population}</h4>
      <img src={props.country.flag} alt="" width='50%' height='50%'></img>
    </div>
  )
}

class App extends React.Component {
    constructor(props) {
      super(props);
      console.log("constructor");
      this.state = {
        countries: [],
        filter: ''
      }
    }

    componentDidMount() {
      console.log("will mount");
      axios
        .get("https://restcountries.eu/rest/v2/all")
        .then(r => {
          console.log("promise fulfilled");
          this.setState({ countries: r.data })
        })
    }

    filter = (ev) => {
      this.setFilter(ev.target.value);
    }

    setFilter = (f) => {
      this.setState({filter: f});
    }

    render() {
      let filtered = this.state.filter ?
        this.state.countries.filter(c => c.name.toLowerCase().includes(this.state.filter.toLowerCase())) :
        this.state.countries;
      let display = null;
      if(filtered.length === 1) {
        display = <CountryDetails country={filtered[0]}/>
      } else if(filtered.length <= 10) {
        display = <ul>{filtered.map(c => <Country country={c} onclick={this.setFilter}/>)}</ul>
      } else {
        display = <div>too many matches, specify another filter</div>
      }

      return (
        <div>
          find countries: <input value={this.state.filter} onChange={this.filter}/>
          {display}
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
