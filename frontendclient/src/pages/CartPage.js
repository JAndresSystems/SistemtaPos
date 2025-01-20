import React, { useState ,useEffect} from 'react'
import DefaultLayout from '../components/DefaulLayout'
import { useSelector, useDispatch } from 'react-redux'

import axios from 'axios';
import {DeleteOutlined,PlusCircleOutlined,MinusCircleOutlined } from '@ant-design/icons'
import { Table, Button, Modal ,message,Form,Input,Select} from 'antd';
import { useNavigate } from 'react-router-dom';


const CartPage = () => {
  const [subTotal,setSubTotal] = useState();
  const [billPopu,setBillPopup] = useState(false);
  const { cartItems } = useSelector((state) => state.root); // Accede al reducer bajo "root"
  const dispatch = useDispatch();
  const navigate = useNavigate();

//Handle increamente

const handleIncreament =(record)=>{
dispatch({
  type:'UPDATE_CART',
  payload:{...record, quantity: record.quantity +1}
});

}

const handleDecreament = (record) =>{

  if(record.quantity !==1){
    dispatch({
      type:'UPDATE_CART',
      payload:{...record, quantity: record.quantity  -1}
  
    });
  }

  
}

const columns = [
  {

  title:'Name',
  dataIndex:'name'
  },
  {

    title:'Image',
    dataIndex:'image',
    render:(image,record)=><img src={image} alt={record.name} height="60" width="60"></img>
    },
    {
      title:'Price $',
      dataIndex:'price'
    },
    {
      title:'Quantity',
      dataIndex:'_id',
      render: (id,record)=><div>
        <PlusCircleOutlined  className="mx-3" 
        style={{cursor:'pointer'}}
        onClick={()=> handleIncreament(record)}
        />
        <b>{record.quantity}</b>
        <MinusCircleOutlined  className="mx-3"
         style={{cursor:'pointer'}}
         onClick={()=> handleDecreament(record)}
        />
      </div>
    },
    {
      title:'Actions',
      dataIndex:'_id',
      render:(id,record)=>
      <DeleteOutlined 
      style={{cursor:'pointer'}}
         onClick={()=>dispatch({
            type:'DELETE_FROM_CART',
            payload:record
         })} 
      />,
    },
  
];

useEffect(()=>{
  let temp =0;
  cartItems.forEach((item) => (temp = temp + item.price * item.quantity)); 
    setSubTotal(temp);
  

},[cartItems]);

//Handle Submit
const handleSubmit = async (value) => {
  try {
    const newObject = {
      ...value,
      cartItems,
      subTotal,
      tax: Number(((subTotal / 100) * 10).toFixed(2)),
      totalAmount: Number(subTotal) + Number(((subTotal / 100) * 10).toFixed(2)), // Corregido el nombre del campo
      userId: JSON.parse(localStorage.getItem('auth'))._id,
    };

    console.log(newObject);
    await axios.post("/api/bills/add-bills", newObject);
    message.success("Factura generada con éxito");
    navigate("/bills");
  } catch (error) {
    message.error("Error al generar la factura");
    console.log(error);
  }
};


  return (
    <DefaultLayout>
      <h1>Página del carrito</h1>
<Table columns={columns} dataSource={cartItems} bordered></Table>
    <div className="d-flex flex-column aling-item-end">
      <hr></hr>
      <h3>Sub Total : $<b>{subTotal}</b></h3>
    <Button type="primary" onClick={()=> setBillPopup(true)}>Crear factura</Button>
    </div>

<Modal
title="create Invoice"
 visible={billPopu}
  onCancel={()=>setBillPopup(false)} 
  footer={false}>
<Form Layout="vertical" 

  onFinish={handleSubmit}>
          <Form.Item  name="customerName" label="Customer Name">
            <Input></Input>
          </Form.Item>

          <Form.Item  name="customerNumber" label="Concact Number">
            <Input></Input>
          </Form.Item>

          

          <Form.Item name="paymentMode" label="Payment Method">
          <Select>
            <Select.Option value="cash">Cash</Select.Option>
            <Select.Option value="card">Card</Select.Option>
            
            
          </Select>
          </Form.Item>

          <div className="bill-it">
            <h5>
              Sub Totall: <b>{subTotal}</b>
            </h5>
            <h4>IVA : <b></b>
        <b>{((subTotal / 100)* 10).toFixed(2)}</b>
                
            </h4>
            <h3>
              Grand Total: <b></b>
              {Number(subTotal)+ Number(((subTotal / 100)* 10).toFixed(2))}
            </h3>
            </div>        

      <div className="d-flex justify-content-end">
        <Button type="primary" htmlType="subit">
        Generar factura
        </Button>
      </div>


        </Form>
</Modal>
    </DefaultLayout>
    
  )
}

export default CartPage;



