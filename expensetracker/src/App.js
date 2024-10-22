
import './App.css';

import Navbar from './Components/Navbar';
import { Routes, Route, useLocation } from "react-router-dom"; 

import { Addexpenses } from './Components/Addexpenses';
import { Login } from './Components/Login';
import { SignUp } from './Components/Signup';
import {UpdateExpenses} from './Components/UpdateExpenses'

import ExpenseTrackerCards from './Components/Card';
import ColorInversionFooter from './Components/Footer';

import HomePage from './Components/main';
import { ExpenseShow } from './Components/Expenseshow';
import Dashboard from './Components/dashboard';

function App() {
  const location = useLocation(); 

  return (
    <>
      <Navbar />


   

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/Addexpenses' element={<Addexpenses />} />
        <Route path='/login' element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path='/view' element={<ExpenseShow />} />
        <Route path='/dashboard' element={<Dashboard />} />

        <Route path='/UpdateExpense/:id' element={<UpdateExpenses/>}/>
      </Routes>

      {location.pathname === '/' && <ExpenseTrackerCards />}
      
      <ColorInversionFooter />
      
    </>
  );
}

export default App;
