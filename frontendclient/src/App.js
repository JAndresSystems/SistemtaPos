//import "antd/dist/antd.css";
import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'
import Homepage from "./pages/Homepage";
import ItemPage from "./pages/ItemPage";
import CartPage from './pages/CartPage';
import Login from './pages/Login';
import Register from './pages/Register';
import BillsPage from './pages/BillsPage';
import CustomPage from './pages/CustomPage';


function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
      
      <Route path="/" element={
        <ProtectedRoute>
          <Homepage></Homepage>
        </ProtectedRoute>       
        
        }></Route>

      <Route path="/items" element={
        <ProtectedRoute>

          <ItemPage></ItemPage>
        </ProtectedRoute>
        
        } ></Route>

      <Route path="/cart" element={

        <ProtectedRoute>
            <CartPage></CartPage>
        </ProtectedRoute>
        } 
        ></Route>


        <Route path="/bills" element={

     <ProtectedRoute>
       <BillsPage></BillsPage>
   </ProtectedRoute>
            } 
          ></Route>


<Route path="/customers" element={

<ProtectedRoute>
  <CustomPage></CustomPage>
</ProtectedRoute>
       } 
     ></Route>


      <Route path="/login" element={ <Login></Login>} ></Route>

      <Route path="/register" element={<Register></Register>} ></Route>
      
     
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;


export function ProtectedRoute({children}){
  if(localStorage.getItem("auth")){
    return children;
  }else{
    return <Navigate to={"/login"}></Navigate>
  }
}
