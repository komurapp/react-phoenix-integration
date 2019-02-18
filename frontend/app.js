import "phoenix_html"
import React, { Component } from "react"
import ReactDOM from "react-dom"

class HelloReact extends Component {
  render() {
    return (<h1>Hello React!</h1>)
  }
}
ReactDOM.render(
  <HelloReact/>,
  document.getElementById("hello-react")
)
