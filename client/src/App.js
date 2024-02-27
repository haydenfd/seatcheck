import './App.css';
import {NextUIProvider} from "@nextui-org/react";
import { Form } from './Form/Form';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './Components/Nav/Nav';
function App() {
  return (
    <NextUIProvider>
    <Router>
    <div className="App min-h-screen">
      <Nav />
      <div className="header">
        <h1 className="title">Seatcheck @ UCLA</h1>
        <h2 className="subtitle">Get notified when a class space opens up</h2>
        <Routes>

        </Routes>
      </div>
      <Form />
    </div>
    </Router>
    </NextUIProvider>
  );
}

export default App
