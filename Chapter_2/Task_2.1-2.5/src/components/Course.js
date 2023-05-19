
const Header = (props) => {
    console.log(props)
    return (
      <div>
        <h1>
          {props.name}
        </h1>
      </div>
    )
  }

  const Total = (props) => {
    return (
      <div>
        <p>
        {"Total of exercises " + props.count}
        </p>
      </div>
    )
  }

  const Course = (props) => {

    const total = props.course.parts.reduce( (s, p) => {
      console.log('what is happening', s, p.exercises)
      return s + p.exercises
    }, 0);

    return(
        <div>
      <Header name={props.course.name}/>
        {props.course.parts.map(note => 
        <p key={note.id}> {note.name + " "} {note.exercises}
        </p>       
        )}
      <Total count={total}/>       
    </div>
    )

}
  
export default Course