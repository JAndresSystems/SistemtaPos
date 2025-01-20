import { Form,Input , Button,message} from 'antd'
import React , {useEffect}from 'react'
import { Link ,navigate, useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
const handleSubmit  = async(value)=>{
  
  try {
    dispatch({
      type:'SHOW_LOADING',
    });
     await axios.post("/api/users/register",value);
  message.success('Ingreso Exitoso');
    navigate("/login")
   dispatch({type:'HIDE_LOADING'});
    
    
  } catch (error) {
    dispatch({type:'HIDE_LOADING'});
    message.error('Algo salio Mal');
    console.log(error);
  } 
};
//Current user login 

useEffect(()=>{
  if(localStorage.getItem('auth')){
    localStorage.getItem('auth')
    navigate("/")
  }
},[navigate]);

  return (
    <>
    <div className="register">
        <div className="register-form">
        <h1 className="posapp">POS APP</h1>
        <h3>Register Page</h3>

        <Form Layout="vertical"  
         onFinish={handleSubmit}>
          <Form.Item  name="name" label="Name">
            <Input></Input>
          </Form.Item>

          <Form.Item  name="userId" label="User Id">
            <Input></Input>
          </Form.Item>

          <Form.Item  name="password" label="Password">
            <Input type="password"></Input>
          </Form.Item>

       
      <div className="d-flex justify-content-between alredy">
        <p>
            Ya esta registrado
            <Link to="/login" className="alredy">Volver</Link>
        </p>


        <Button type="primary" htmlType="subit">
          Registrarse
        </Button>
      </div>


        </Form>
    </div>
    </div>
    </>
  )
}

export default Register
