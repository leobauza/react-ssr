import React from 'react'
import { hydrate } from 'react-dom'
import Counter from './components/Counter'

const app = document.getElementById('app')
// Use hydrate instead of render to attach event listeners to existing markup
hydrate(<Counter />, app)
