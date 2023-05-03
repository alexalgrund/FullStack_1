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
    <p>{props.pt}</p>
  )
}

const Content = (props) => {
  console.log(props)
  return (
    <div>
      <p>
        <Part pt={props.cont1}/>
        <Part pt={props.cont2}/>
        <Part pt={props.cont3}/>
      </p>
    </div>
  )
}

const Total = (props) => {
  console.log(props)
  return (
    <div>
      <p>
        Number of exercises {props.count}
      </p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content cont1={part1 + " " + exercises1} cont2={part2 + " " + exercises2} cont3={part3 + " " + exercises3}/>
      <Total count={exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

export default App