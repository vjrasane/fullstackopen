import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
  return (
    <h1>{props.kurssi.nimi}</h1>
  )
}

const Osa = (props) => {
  return <p>{props.osa} {props.tehtavia}</p>
}

const Yhteensa = (props) => {
  let tehtavat = props.kurssi.osat.map((o) => o.tehtavia).reduce((a, b) => a + b, 0);
  return <p>yhteensä {tehtavat} tehtävää</p>
}

const Sisalto = (props) => {
  let osat = props.kurssi.osat.map((o) => <Osa osa={o.nimi} tehtavia={o.tehtavia}/>)
  return (
    <div>
      {osat}
    </div>
  )
}

const App = () => {
  const kurssi = {
    nimi: 'Half Stack -sovelluskehitys',
    osat: [
      {
        nimi: 'Reactin perusteet',
        tehtavia: 10
      },
      {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7
      },
      {
        nimi: 'Komponenttien tila',
        tehtavia: 14
      }
    ]
  }

  return (
    <div>
      <Otsikko kurssi={kurssi}/>
      <Sisalto kurssi={kurssi}/>
      {/* <p>{osa1} {tehtavia1}</p>
      <p>{osa2} {tehtavia2}</p>
      <p>{osa3} {tehtavia3}</p> */}
      <Yhteensa kurssi={kurssi}/>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
