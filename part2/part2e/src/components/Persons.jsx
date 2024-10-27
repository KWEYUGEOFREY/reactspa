const Persons = ({ personsToShow }) => (
  <ul>
    {personsToShow.map((person, i) => (
      <li key={i}>
        {person.name} {person.number}
      </li>
    ))}
  </ul>
)

export default Persons
