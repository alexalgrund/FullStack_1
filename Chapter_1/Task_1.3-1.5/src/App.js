const Header = (props) => {
  console.log(props)
  return (
    <div>
      <h1>
        {props.course}
      </h1>
    </div>
  )
}

const Part = (props) => {
  console.log(props)
  return (
    <p>{props.pt[0].name + " " + props.pt[0].exercises}
    <br/>
    <br/>
    {props.pt[1].name + " " + props.pt[1].exercises}
    <br></br>
    <br></br>
    {props.pt[2].name + " " + props.pt[2].exercises}
    <br></br>
    </p>
  )
}

const Content = (props) => {
  console.log(props)
  return (
    <div>
      <p>
        <Part pt={props.parts}/>
      </p>
    </div>
  )
}

const Total = (props) => {
  console.log(props)
  return (
    <div>
      <p>
      {"Number of exercises " + (props.count[0].exercises + props.count[1].exercises + props.count[2].exercises)}
      </p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
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
      }
    ]
  }

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total count={course.parts}/>
    </div>
  )
}


export default App