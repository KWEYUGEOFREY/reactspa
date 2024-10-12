const Hello = ({name,age}) => {
  const yearBorn = () => new Date().getFullYear() - age
    return (
      <div>
        <p>
          Hello {name}, you are {age} years old
        </p>
        <p>
          Hello {name}, you were probably born in {yearBorn()}.
        </p>
      </div>
    );
}

const App = () => {
  const name = 'Kweyu';
  const age = 40;

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={name} age={age} />
    </div>
  );
}

export default App
