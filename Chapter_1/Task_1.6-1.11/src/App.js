import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const Statistics = (props) => {
  if (props.good + props.neutral + props.bad === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return(
      <div>
      <StatisticLine text="good" value ={props.good} />
      <StatisticLine text="neutral" value ={props.neutral} />
      <StatisticLine text="bad" value ={props.bad} />
      <StatisticLine text="all" value ={props.good + props.neutral + props.bad} />
      <StatisticLine text="average" value ={ (props.good + (props.bad * (-1))) / (props.good + props.neutral + props.bad)} />
      <StatisticLine text="positive" value ={(props.good / (props.good + props.neutral + props.bad)) * 100 + " %"} />
      </div>
  )
}

const StatisticLine = (props) => {

  return (
    <table>
    <tbody>
        <tr>
            <td>{props.text}</td>
            <td>{props.value}</td>
        </tr>
    </tbody>
</table>

  )
}

const App = () => {
  const [ counter1, setCounter1 ] = useState(0)
  const [ counter2, setCounter2 ] = useState(0)
  const [ counter3, setCounter3 ] = useState(0)

  const increaseByOne1 = () => setCounter1(counter1 + 1)
  const increaseByOne2 = () => setCounter2(counter2 + 1)
  const increaseByOne3 = () => setCounter3(counter3 + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={increaseByOne1}
        text="good"
      />
      <Button handleClick={increaseByOne2}
        text="neutral"
      />
      <Button handleClick={increaseByOne3}
        text="bad"
      />
      <h1>statistics</h1>

      <Statistics good={counter1} neutral={counter2} bad={counter3}/>

    </div>
  )
}

export default App