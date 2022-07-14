import { useState } from 'react'

const Statistics = (props)=>{
  var good = props.good
  var neutral = props.neutral
  var bad = props.bad
  var countScore = good+neutral+bad
  var sumScore = good-bad
  var average = sumScore/countScore
  if (!sumScore) {
    return(
    <p>No feedback given</p>
    )
  }
  else{
  return(
    <div>
      <table>
        <tbody>
          <StatisticLine text = "good" value = {good}/>
          <StatisticLine text = "neutral" value = {neutral}/>
          <StatisticLine text = "bad" value = {bad}/>
          <StatisticLine text = "all" value = {countScore}/>
          <StatisticLine text = "average" value = {average.toFixed(1)}/>
          <StatisticLine text = "positive" value = {(100*good/countScore).toFixed(1)+(" %")}/>
        </tbody>
      </table>
    </div>
  )
  }
}

const StatisticLine = (props)=>{
  return <tr><td>{props.text}</td><td>{props.value}</td></tr>
}
const Button = (props)=>{
  return <button onClick = {props.handleClick}>{props.type}</button>
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  return (
    <div>
      <h1>give feedback</h1>
      <Button type = 'good' handleClick={()=>setGood(good+1)}/>
      <Button type = 'neutral' handleClick={()=>setNeutral(neutral+1)}/>
      <Button type = 'bad' handleClick={()=>setBad(bad+1)}/>
      <h1>statistics</h1>
      <Statistics good = {good} neutral = {neutral} bad = {bad}/>
    </div>
  )
}

export default App