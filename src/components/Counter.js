import React, { Component } from 'react'

class Counter extends Component {
  state = {
    count: 0
  }

  componentDidMount() {
    this.count()
  }

  count = () => {
    this.setState(prevState => {
      return {
        count: prevState.count + 1
      }
    })

    setTimeout(this.count, 1000)
  }

  render() {
    return (
      <h1>Count: {this.state.count}</h1>
    )
  }
}

export default Counter
