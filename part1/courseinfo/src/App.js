const Header = (props) =>{
  return (
    <h1>{props.course.name}</h1>
  )
}
const Content = (props) =>{
  return (
    <div>
      {props.course.parts.map(x => {
        return(
          <Part part = {x.name} exercises = {x.exercises}/>
        )
      })}
    </div>
  )
}
const Part = (props) =>{
  return(
    <p>{props.part} {props.exercises} </p>
  )
}
const Total = (props) =>{
var exerciseSum = props.exerciseList.reduce((partialSum, a)=>partialSum +a,0)
return (
  <div>
    <p>Number of exercises {exerciseSum}</p>
  </div>
)
}

const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [{
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }]}
  return (
    <div>
      <Header course={course} />
      <Content course = {course}/>
      <Total exerciseList = {[course.parts[0].exercises,course.parts[1].exercises,course.parts[2].exercises]}/>
    </div>
  )
}

export default App
