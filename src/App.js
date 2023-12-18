import './App.css';
import Login from './pages/login/login.page';
import { Navigate, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Navigate to="/login" />}/>
        <Route path="/login" element={<Login/>} />
      </Routes>
    </>
  );
}

export default App;
