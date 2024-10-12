import { useState } from 'react';

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
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>All : {total}</p>
      <p>Average : {average.toFixed(2)}</p>
      <p>Positive : {positivePercentage.toFixed(2)}%</p>
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
      <button onClick={() => setGood(good + 1)}>Good</button>
      <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
      <button onClick={() => setBad(bad + 1)}>Bad</button>

      {/* Pass the calculated values as props to the Statistics component */}
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
