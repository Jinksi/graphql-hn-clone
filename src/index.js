import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import { ApolloProvider, createNetworkInterface, ApolloClient } from 'react-apollo'
import { BrowserRouter as Router } from 'react-router-dom'

const networkInterface = createNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/cj87uo5zu00j10145glxr5olm'
})
const client = new ApolloClient({
  networkInterface
})

ReactDOM.render(
  <Router>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Router>
  , document.getElementById('root'))
registerServiceWorker()
