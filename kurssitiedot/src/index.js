import React from 'react'
import ReactDOM from 'react-dom'




const Header = ({course})=> {
  return (
    <div>
      <h1>
        {course.name}
      </h1>
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack -sovelluskehitys',
      id: 1,
      parts: [
        {
          name: 'Reactin perusteet',
          exercises: 10,
          id: 1
        },
        {
          name: 'Tiedonvälitys propseilla',
          exercises: 7,
          id: 2
        },
        {
          name: 'Komponenttien tila',
          exercises: 14,
          id: 3
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewaret',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  
    return (
      <div>
        <h1>Opetusohjelma</h1>
        <ul>
          {courses.map(course => <li> <Course key = {course.id} course={course} /> </li>)}
        </ul>    
      </div>
    )
  }

  const Course = ({course}) => {
    
      return(
        <div>
          <Header course = {course} />
          <Content course={course} />
          <Total course = {course} />
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


ReactDOM.render(<App />, document.getElementById('root'))