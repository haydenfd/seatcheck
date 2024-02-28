import './App.css';
import { Form } from './Form/Form';
import Nav from './Components/Nav/Nav';
import Guide from './Components/Guide/Guide';
import { Route,Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App min-h-screen overflow-auto">
      <Nav />
      <div className="header">
        <h1 className="text-4xl">Seatcheck @ UCLA</h1>
        <h2 className="text-2xl mt-2 italic">Get notified when a class space opens up</h2>
      </div>
      <Routes>        
      <Route path="/guide"  element={<Guide/>} />
      <Route path="/"  element={<Form/>} />
    </Routes>
    </div>
  );
}

export default App
