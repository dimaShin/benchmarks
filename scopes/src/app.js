import React from 'react'
import * as components from './components'


export const App = () => {
    console.log('rendering outer')
    return (<>{Object.values(components).map((C, idx) => {
        return Math.random() * 100 <= Number(20) ? <C key={idx} /> : null
    })}</>)
}