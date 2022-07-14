import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  var anecdotesLength = anecdotes.length
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotesLength).fill(0))
  const [mostVote, setMostVote] = useState()
  const [maxVote, setMaxVote] = useState(0)
  const handleVote = () =>{
    const copy = [...points]
    copy[selected]+=1
    var temp = copy[selected]
    setPoints(copy)
    if (temp>maxVote){
      setMaxVote(temp)
      setMostVote(selected)
    }
    
  }
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} points</p>
      <button onClick={handleVote}>vote</button>
      <button onClick={() =>setSelected(Math.floor(Math.random()*anecdotesLength))}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[mostVote]}</p>
    </div>
  )
}

export default App