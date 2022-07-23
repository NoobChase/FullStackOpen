import personService from '../services/persons.js'
import '../App.css'
const Person = (props) =>{
  const deletePerson = (event, id) =>{
    event.preventDefault()
    if(window.confirm('Delete '+ props.person.name+' ?')){
      personService
        .remove(id)
        .catch(error => {
        props.deleteCallback()
        return
    })
      props.deleteName(event, id)
    }
    
  }
  return(
    <div>
      <p className='inline' key={props.person.id}>{props.person.name} {props.person.number}</p><button className='inline' onClick={event => deletePerson(event, props.person.id)}>delete</button>
    </div>
  )
}
const Persons = (props) => {
    return(
        props.persons.map(person=>
            {
            if(props.search!==''){
              let tempName = person.name.toLowerCase()
              if(tempName.includes(props.search.toLowerCase())){
                return (<Person key = {person.id} person = {person} deleteName = {props.deleteName} deleteCallback = {props.deleteCallback}/>)
              }
            }
            else{
              return (<Person key = {person.id} person = {person} deleteName = {props.deleteName} deleteCallback = {props.deleteCallback}/>)
            }
          }
            
            )
    )
}
export default Persons