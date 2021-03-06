import React, { Component } from 'react'

if (process.env.NODE_ENV !== 'production') {
  console.log('dev!')
} else {
  console.log('production!')
}

class Layout extends Component {
  state = {
    count: 0
  }

  componentDidMount() {
    this.count()
  }

  count = () => {
    this.setState(prevState => {
      return {
        count: prevState.count + 10
      }
    })

    setTimeout(this.count, 1000)
  }

  render() {
    return (
      <h1>SSReact: {this.state.count}</h1>
    )
  }
}

export default Layout
