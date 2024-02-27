import './App.css';
import { Form } from './Form';
function App() {
  return (
    <div className="App">
      <div className="header">
        <h1 className="title">Seatcheck @ UCLA</h1>
        <h2 className="subtitle">Get notified when a class space opens up</h2>
        <h2 className="subtitle">(Going live in Spring '24!)</h2>
      </div>
      <Form />
    </div>
  );
}

export default App
