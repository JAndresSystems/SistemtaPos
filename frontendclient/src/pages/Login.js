import React , {useEffect} from 'react'
import { Form,Input , Button,message} from 'antd'
import { useDispatch } from 'react-redux'
import { Link ,Navigate, useNavigate} from 'react-router-dom'
import axios from 'axios'
const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit  = async(value)=>{
        try {
            dispatch({
              type:'SHOW_LOADING'
            });
           const res= await axios.post("/api/users/login",value);
          message.success('Ingreso Exitoso');
          localStorage.setItem('auth',JSON.stringify(res.data))
          navigate("/")

           dispatch({type:'HIDE_LOADING'});
            
            
          } catch (error) {
            dispatch({type:'HIDE_LOADING'});
            message.error('Algo Salio Mal');
            console.log(error);
          }  
    }

    //Current user login 

    useEffect(()=>{
      if(localStorage.getItem('auth')){
        localStorage.getItem('auth')
        navigate("/")
      }else{
        navigate("/login")
      }
      
    },[navigate]);
    
  return (
    <div className="register">
        <div className="register-form">
        <h1 className="posapp">POS APP</h1>
        <h3>Loging Page</h3>

        <Form Layout="vertical"  
         onFinish={handleSubmit}>
          

          <Form.Item  name="userId" label="User Id">
            <Input></Input>
          </Form.Item>

          <Form.Item  name="password" label="Password">
            <Input type="password"></Input>
          </Form.Item>

    
       
         

        

      <div className="d-flex justify-content-between alredy">
        <p>
            Nuevo Usuario
            <Link to="/register" className="alredy">Registrarse aqui</Link>
        </p>


        <Button type="primary" htmlType="subit">
         Login
        </Button>
      </div>


        </Form>
    </div>
    </div>
  )
}

export default Login
