import React, { useEffect, useState, useRef } from 'react';
import DefaultLayout from '../components/DefaulLayout';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import ReactToPrint, { useReactToPrint } from 'react-to-print';

import { EyeOutlined } from '@ant-design/icons';
import { Modal, Table, Button } from 'antd';

import "../styles/BillsCheck.css";

const BillsPage = () => {
  const printRef = useRef(null); // Referencia a la sección de impresión
  const dispatch = useDispatch();
  const [billssData, setBillsData] = useState([]);
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

  // Función para imprimir
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: 'Factura', // Título del documento impreso
    onBeforeGetContent: () => console.log("Preparando para imprimir..."), // Opcional
    onAfterPrint: () => console.log("Impresión completa."), // Opcional
  });

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
      title: 'Total',
      dataIndex: 'totalAmount',
    },
    {
      title: 'Sub Total',
      dataIndex: 'subTotal',
    },
    {
      title: 'Tax',
      dataIndex: 'tax',
    },
    {
      title: 'Contact Number',
      dataIndex: 'customerNumber',
    },
    {
      title: 'Date',
      dataIndex: 'date',
    },
    {
      title: 'Actions',
      dataIndex: '_id',
      render: (id, record) => (
        <div>
          <EyeOutlined
            className="view-icon"
            onClick={() => {
              setSelectedBill(record);
              setPopModal(true);
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <DefaultLayout>
      <div className="header">
        <h1>Lista de facturas</h1>
      </div>

      <Table columns={columns} dataSource={billssData} bordered />

      {popModal && selectedBill && (
        <Modal
          title="Invoice Details"
          visible={popModal}
          onCancel={() => setPopModal(false)}
          footer={null}
          width={800}
        >
          <div
            style={{
              boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px',
              padding: '20px',
              borderRadius: '8px',
              background: '#fff',
            }}
            ref={printRef}
          >
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <p><strong>Contacto de la compañia:</strong> +123 456 789</p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <p><strong>Nombre del cliente:</strong> {selectedBill.customerName || 'N/A'}</p>
              <p><strong>Numero de contacto:</strong> {selectedBill.customerNumber || 'N/A'}</p>
              <p><strong>Fecha:</strong>{' '}
                {selectedBill.date
                  ? new Date(selectedBill.date).toLocaleString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true,
                    })
                  : 'N/A'}
              </p>
            </div>

            <div>
              <h3>Productos:</h3>
              <Table
                dataSource={selectedBill.cartItems || []}
                columns={[
                  { title: 'Product Name', dataIndex: 'name' },
                  { title: 'Price ($)', dataIndex: 'price' },
                  { title: 'Quantity', dataIndex: 'quantity' },
                  {
                    title: 'Total ($)',
                    render: (_, record) => (record.price * record.quantity).toFixed(2),
                  },
                ]}
                pagination={false}
                rowKey="_id"
              />
            </div>

            <div style={{ marginTop: '20px', textAlign: 'right' }}>
              <p><strong>Sub Total:</strong> ${selectedBill.subTotal.toFixed(2)}</p>
              <p><strong>IVA (10%):</strong> ${selectedBill.tax.toFixed(2)}</p>
              <p><strong>Total Acumulado:</strong> ${selectedBill.totalAmount.toFixed(2)}</p>
            </div>
          </div>

          <div className="d-flex align-items-left mt-3">
            <Button type="primary" onClick={handlePrint}>Imprimir</Button>
          </div>
        </Modal>
      )}
    </DefaultLayout>
  );
};

export default BillsPage;


