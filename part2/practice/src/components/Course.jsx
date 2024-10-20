
const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <h3>Total of {sum} exercises</h3>

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    {parts.map(part => (
      <Part key={part.id} part={part} />
    ))}
  </>
);

// Course component to handle individual course data
const Course = ({ course }) => {
  const totalExercises = course.parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={totalExercises} />
    </div>
  )
}

export default Course

  