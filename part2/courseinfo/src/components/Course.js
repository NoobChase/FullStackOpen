import React from 'react'
const Course = (props) =>{
    return(
      <div>
        <Header header = {props.course.name}/>
        <Content parts = {props.course.parts}/>
      </div>
    )
  }
  const Header = (props) =>{
    return <h1>{props.header}</h1>
  }
  const Content = (props) =>{
    const findSum = () =>{
      const sum = props.parts.reduce((s,p)=>({exercises:s.exercises+p.exercises})).exercises
      console.log(props.parts)
      console.log(sum)
      return sum
    }
  
    return(
      <div>
        {props.parts.map(part =>
          <Part key = {part.id} name = {part.name} exercises = {part.exercises}/>
          )}
        <p>total of {findSum()} exercises</p>
      </div>
    )
  }
  const Part = (props) =>{
    return <p>{props.name} {props.exercises}</p>
  }
  export default Course