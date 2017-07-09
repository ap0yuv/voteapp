import React from 'react'
// import {Link } from 'react-router-dom'

let loggedIn = false

export default class LoginController extends React.Component {
  //static requireAuth(nextState, replaceState) {
  //   if (!loggedIn) {
  //     const redirect = nextState.location.pathname
  //     replaceState(null, `/login${redirect}`)
  //   }
  // }

  static isAuthenticated() { 
    return loggedIn
  }

  constructor(props) {
    super(props)
    // console.log(props)
    this.onChange = this.onChange.bind(this)
    this.login = this.login.bind(this)
    this.routeToMain = this.routeToMain.bind(this)
    this.isValidEmail = this.isValidEmail.bind(this)
    this.state = {
      email: ""
    }
  }

  // How and where to set title when routing to a component
  // https://github.com/rackt/react-router/issues/49#issuecomment-47164264
  // there are more fancy ways of doing this, but this is the most straight forward way
  componentDidMount() {
    document.title = 'Login - Vote as a Service'
  }

  login() {
    loggedIn = true
    this.redirect()
  }

  redirect() {
    //console.log("redirect:" + this.props.location.state)
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirect } = this.props.match.params || { redirect: undefined }
    const destination = redirect ? "/" + redirect : from
    // we do not want login in our history
    this.props.history.replace(destination)
  }

  onChange(event) {
    const email = event.target.value
    this.setState({
      email
    })
  }

  routeToMain() {
    this.props.history.push('/')
  }

  isValidEmail() {
    // to validate email we could use joi (only put this in an info box)
    return this.state.email
  }

  render() {
    return <div className="Row VotesRow">
      <div className="Head">
        <h1 className="Title">You need to login to perform that action</h1>
      </div>

      <div className="LoginForm">
        <input type="text"
               placeholder="Enter your email address here"
               value={this.state.email}
               onChange={this.onChange}/>
        <div className="ButtonBar">
          <a className={this.isValidEmail() ? 'Button' : 'Button disabled'}
             onClick={this.isValidEmail() ? this.login : null}>Login</a>
          <a className="Button" onClick={this.routeToMain}>Cancel</a>
        </div>
      </div>
    </div>
  }
}
// LoginController.contextTypes = {
//   history: React.PropTypes.object.isRequired
// }
