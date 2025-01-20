import React, { useEffect, useState, useRef } from 'react'
import DefaultLayout from '../components/DefaulLayout'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Modal, Table, Button } from 'antd';

const CustomPage = () => {

  const [billssData, setBillsData] = useState([]);
  const dispatch = useDispatch();
 
  const [popModal, setPopModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);

 // Función para obtener las facturas
 const getAllBills = async () => {
  try {
    dispatch({ type: 'SHOW_LOADING' });
    const { data } = await axios.get('/api/bills/get-bills');
    dispatch({ type: 'HIDE_LOADING' });
    setBillsData(data);
  } catch (error) {
    dispatch({ type: 'HIDE_LOADING' });
    console.log(error);
  }
};

useEffect(() => {
  getAllBills();
}, []);


// Columnas para la tabla
const columns = [
  {
    title: 'ID',
    dataIndex: '_id',
  },
  {
    title: 'Customer Name',
    dataIndex: 'customerName',
  },
  
 
  {
    title: 'Contact Number',
    dataIndex: 'customerNumber',
  }
  
  
];


  return (
    <DefaultLayout>
       <Table columns={columns} dataSource={billssData} bordered />
    </DefaultLayout>
  )
}

export default CustomPage
