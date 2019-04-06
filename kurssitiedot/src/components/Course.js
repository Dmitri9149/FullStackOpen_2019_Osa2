import React from 'react'

const Course = ({course}) => {
    
  return(
    <div>
      <Header course = {course} />
      <Content course={course} />
      <Total course = {course} />
    </div>
    
  )

}

const Header = ({course})=> {
  return (
    <div>
      <h1>
        {course.name}
      </h1>
    </div>
  )
}

const Total = ({course})=> {
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const tehtavat = (course.parts.map(part  => part.exercises));

  return (
    <div>
      <p>
        yhteensä {tehtavat.reduce(reducer,0)} tehtävää
      </p>
    </div>
  )
} 

const Part = ({name, exercises})=> {
  return (
      <li> 
          {name} {exercises}
      </li> 
  )
}

const Content = ({course})=> {
  const rows = () => course.parts.map(part =>
      <Part
        key={part.id}
        name={part.name}
        exercises = {part.exercises}
      />
  )   
  return (
    <ul>
        {rows()}
    </ul>
  )
}

export default Course