import { useState } from 'react'
import './App.css'
import  ItemsListing  from './components/ItemsListing';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ItemsListing/>
    </>
  )
}

export default App
