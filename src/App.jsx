import { useState } from 'react';



const Button = ({onClick, text}) => {
  return <button onClick={onClick}>{text}</button>
 } 

 const StatisticLine  = ({text, value})=>{
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
 }
// Define the Statistics component outside the App component
const Statistics = ({ good, neutral, bad, total, average, positivePercentage }) => {
  //check if there is any feedback.
  if(total===0)
  {
    return(
      <div>
        <h1>Statistics</h1>
        <p>No feedback yet</p>
      </div>
    )
  }
   // If feedback exists, display the statistics
  // Return JSX for displaying statistics
  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="Good              :" value={good} />
          <StatisticLine text="Neutral           :" value={neutral} />
          <StatisticLine text="Bad               :" value={bad} />
          <StatisticLine text="Total feedback    :" value={total} />
          <StatisticLine text="Average score     :" value={average.toFixed(1)} />
          <StatisticLine text="Positive feedback :" value={`${positivePercentage.toFixed(1)}%`}/>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // Save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // Calculate total feedback
  const total = good + neutral + bad;

  // Calculate the average score: good = +1, neutral = 0, bad = -1
  const average = (good - bad) / total || 0;

  // Calculate the percentage of positive feedback
  const positivePercentage = (good / total) * 100 || 0;

  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="Good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button onClick={() => setBad(bad + 1)} text="Bad" />

      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        average={average}
        positivePercentage={positivePercentage}
      />
    </div>
  )
}

export default App
