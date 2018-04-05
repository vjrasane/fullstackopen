import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
  return (
    <div><h1>{props.nimi}</h1></div>
  )
}

const Osa = (props) => {
  return <p>{props.osa} {props.tehtavia}</p>
}

const Yhteensa = (props) => {
  let tehtavat = props.osat.map((o) => o.tehtavia).reduce((a, b) => a + b, 0);
  return <p>yhteensä {tehtavat} tehtävää</p>
}

const Sisalto = (props) => {
  let osat = props.osat.map((o) => <Osa osa={o.nimi} tehtavia={o.tehtavia}/>)
  return (
    <div>
      {osat}
    </div>
  )
}

const Kurssi = (props) => {
  return (
    <div>
      <Otsikko nimi={props.kurssi.nimi}/>
      <Sisalto osat={props.kurssi.osat}/>
      <Yhteensa osat={props.kurssi.osat}/>
    </div>
  )
}

export default Kurssi;
