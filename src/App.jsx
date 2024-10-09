import {useState} from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState([])


  const handleGoodClick = () => {
    setGood(good + 1)
    //setTotal(good)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    //setTotal(neutral)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    //setTotal(bad)
  }


  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick={handleGoodClick}>Good</button>
      <button onClick={handleNeutralClick}>Neutral</button>
      <button onClick={handleBadClick}>Bad</button>
      
      <h1>Statistics</h1>
      <p>good {good}</p>
      <p>Neutral {neutral}</p>
      <p>Bad {bad}</p>
    </div>
  )
}

export default App