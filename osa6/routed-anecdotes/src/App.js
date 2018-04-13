import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import { ListGroup, ListGroupItem, FormGroup, ControlLabel, FormControl, Button, Grid, Row, Col, Badge, Alert } from 'react-bootstrap'

const Menu = () => {
  const style = {
    color: 'deepskyblue',
    padding: 15,
    marginLeft: 20,
    borderWidth: 1,
    borderRadius: 5,
  }
  const active = {
    background: 'lightblue',
    color: 'white',
    padding: 5,
    borderRadius: 5,
  }
  return (
    <div>
      <NavLink className='menuLink' style={style} activeStyle={active} exact to="/">anecdotes</NavLink> &nbsp;
      <NavLink className='menuLink' style={style} activeStyle={active} exact to="/create">create new</NavLink> &nbsp;
      <NavLink className='menuLink' style={style} activeStyle={active} exact to="/about">about</NavLink> &nbsp;
    </div>
  )
}

const Anecdote = ({ vote, anecdote }) => (
  <div>
    <h2>{anecdote.content}</h2>
    <div>Votes <Badge>{anecdote.votes}</Badge></div>
    <br/>
    <Button onClick={() => vote(anecdote.id)}>Vote</Button>
    <br/><br/>
    <div>for more info see <a href={anecdote.info}>{anecdote.info}</a></div>
  </div>
)

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ListGroup>
      {anecdotes.map(anecdote =>
        <ListGroupItem key={anecdote.id} >
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
          <Badge>{anecdote.votes}</Badge>
        </ListGroupItem>)}
    </ListGroup>
  </div>
)

const About = () => (
  <Grid>
    <Row className="show-grid">
      <h2>About anecdote app</h2>
      <Col xs={8} md={8}>
        <p>According to Wikipedia:</p>

        <em>An anecdote is a brief, revealing account of an individual person or an incident.
          Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
          such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
          An anecdote is "a story with a point."</em>

        <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
      </Col>
      <Col xs={4} md={4}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Alan_Turing_Aged_16.jpg/220px-Alan_Turing_Aged_16.jpg" alt=""/>
      </Col>
    </Row>
  </Grid>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code.
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.notify(`added anecdote '${this.state.content}'`)
    this.props.history.push('/', 10)
  }

  render() {
    return(
      <div>
        <h2>Create new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
        <FormGroup
             controlId="newAnecdoteForm"
           >
             <ControlLabel>Anecdote</ControlLabel>
             <FormControl
               type="text"
               name="content"
               value={this.state.content}
               placeholder="Enter anecdote"
               componentClass="textarea"
               onChange={this.handleChange}
             />
             <ControlLabel>Author</ControlLabel>
             <FormControl
               type="text"
               name="author"
               value={this.state.author}
               placeholder="Enter author"
               onChange={this.handleChange}
             />
             <ControlLabel>Info</ControlLabel>
             <FormControl
               type="text"
               name="info"
               value={this.state.info}
               placeholder="Enter info"
               onChange={this.handleChange}
             />
             <FormControl.Feedback />
           </FormGroup>
          <Button type="submit">Submit</Button>
        </form>
      </div>
    )

  }
}

class Notification extends React.Component {
  render() {
    return (
      <div>
        {this.props.msg ?
          <Alert color='success'>
            {this.props.msg}
          </Alert> :
          null}
      </div>
    )
  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: '',
      timer: null
    }
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) })
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  notify = (msg, timeout=5) => {
    if(this.state.timer)
      clearTimeout(this.state.timer)
    this.setState({
      notification: msg,
      timer: setTimeout(() => {
        this.setState({ notification: '' })
      }, timeout * 1000)
    })
  }

  render() {
    return (
      <Router>
        <div>
          <h1>Software anecdotes</h1>
          <Menu />
          <hr/>
          <Notification msg={this.state.notification}/>
          <Route exact path="/" render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
          <Route exact path="/anecdotes/:id" render={({match}) =>
            <Anecdote vote={this.vote} anecdote={this.anecdoteById(match.params.id)} />}
          />
          <Route exact path="/about" render={() => <About />} />
          <Route exact path="/create" render={({history}) => <CreateNew notify={this.notify} addNew={this.addNew} history={history}/>} />
          <hr/>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
