import { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './components/Filter.js'
import PersonForm from './components/PersonForm.js'
import Persons from './components/Persons.js'
import personService from './services/persons.js'


const Notification = (props) => {
  if (props.message === null){
    return null
  }
  if (props.success === false){
    return(
      <div className='error'>
        {props.message}
      </div>
    )
  }
  else{
    return(
      <div className='success'>
        {props.message}
      </div>
    )
  }
}

const App = () => {
  useEffect(() =>{
    personService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  },[])
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber] = useState('')
  const [search,setSearch] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [success, setSuccess] = useState(false)
  const handleNameChange = (event)=>{
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) =>{
    setNewNumber(event.target.value)
  }
  const handleSearchChange = (event) =>{
    setSearch(event.target.value)
  }
  const deleteName = (event, id) =>{
    event.preventDefault()
    const temp = [...persons]
    persons.forEach(function(element,index){
      if(element.id === id){
        temp.splice(index,1)
      }
    })
    setPersons(temp)
  }
  const deleteCallback = () =>{
    setErrorMessage('User has already been deleted')
    setSuccess(false)
    setTimeout(() => {
      setErrorMessage(null)
    },5000)
  }
  const submitNewName = (event) =>{
    event.preventDefault()
    const ids = persons.map(x => {return x.id})
    const max = Math.max(...ids)+1
    const temp = [...persons]
    var isFound = false
    var foundIndex = 0
    var foundId = 0
    temp.forEach(function(element,index) {
      if (element.name === newName){
        isFound = true
        foundIndex = index
        foundId = element.id
      }
    })
    if(!isFound){
      temp.push({name: newName, number: newNumber, id: max})
      personService.create({name: newName, number: newNumber, id: max})
      setNewName('')
      setNewNumber('')
      setPersons(temp)
      setErrorMessage('Added '+ newName)
      setSuccess(true)
      setTimeout(() => {
        setErrorMessage(null)
      },5000)
    }
    else{
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        personService
          .update(foundId,{name: newName, number: newNumber})
          .catch(error => {
            setErrorMessage('Information of '+ newName +' has already been removed from the server')
            setSuccess(false)
            return
          })
        temp[foundIndex].number = newNumber
        setPersons(temp)
        setNewName('')
        setNewNumber('')
        setErrorMessage(newName+' phone number was changed')
        setSuccess(true)
        setTimeout(() => {
          setErrorMessage(null)
        },5000)
      }
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message = {errorMessage} success = {success}/>
      <Filter search = {search} handleSearchChange={handleSearchChange}/>
      <h3>add a new</h3>
      <PersonForm newNumber = {newNumber} newName = {newName} submitNewName = {submitNewName} handleNameChange = {handleNameChange} handleNumberChange = {handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons persons = {persons} search = {search} deleteName = {deleteName} deleteCallback = {deleteCallback}/>
    </div>
  )
}

export default App