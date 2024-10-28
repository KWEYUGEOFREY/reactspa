const Persons = ({ personsToShow, onDelete }) => (
  <ul>
    {personsToShow.map((person, i) => (
      <li key={i}>
        {person.name} {person.number}
        <button onClick={() => onDelete(person.id, person.name)}>delete</button>
      </li>
    ))}
  </ul>
)

export default Persons
