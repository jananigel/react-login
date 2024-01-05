import './App.scss';
import Login from './pages/login/login.page';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastProvider } from './share/contexts/toast.context';

function App() {
  return (
    <>
      <ToastProvider>
        <Routes>
          <Route index element={<Navigate to="/login" />}/>
          <Route path="/login" element={<Login/>} />
        </Routes>
      </ToastProvider>
      
    </>
  );
}

export default App;
