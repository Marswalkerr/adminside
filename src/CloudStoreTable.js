import React, { useEffect, useState } from 'react';
import './CloudStoreTable.css';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, deleteDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDE_PTy8OPWvKCAHNCntEkCVg6JJlvrrbE",
  authDomain: "organix-898be.firebaseapp.com",
  projectId: "organix-898be",
  storageBucket: "organix-898be.appspot.com",
  messagingSenderId: "270007385408",
  appId: "1:270007385408:web:bf82e67869293eb4570ea5",
  measurementId: "G-X4E00WV895"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const CloudStoreTable = () => {
  const [customerData, setCustomerData] = useState([]);
  const [editableRow, setEditableRow] = useState(null);

  const [edit, setEdit] = useState(false)
  const addDeleteButton = (docId) => {
    const handleDelete = async () => {
      await deleteDoc(doc(db, 'userInfo', docId));
      setCustomerData(prevData => prevData.filter(item => item.id !== docId));
    };

    return (
        <button onClick={handleDelete} className="btn btn-danger">Delete</button>
    );
  };

  

    const getAllDataOnce = async () => {
      const querySnapshot = await getDocs(collection(db, 'userInfo'));
      const customers = [];
      querySnapshot.docs.forEach((doc) => {
        const historyData = doc.data().history;
        if (historyData) {
          customers.push(...historyData);
        }
        console.log('dfdsfsdfdfda', customers);

        setCustomerData(customers);
      });
      
      console.log("DATA",customers);
      setCustomerData(customers);
    };

    const onEdit = () => {
      // setEdit(!edit)
    }
    

    const addItemToTable = (customer) => (
      <tr key={customer.id}>
      <td>{customer.orderId}</td>
      <td>{edit ? (<input type='Date' value={customer.orderDate?.toDate()}/>): (customer.orderDate?.toDate()?.toLocaleString())}</td>
      <td>{edit ? (<input type='text' value={customer.addLine1}/>):(customer.addLine1)}</td> 
      <td>{edit ? (<input type='text' value={customer.addLine2}/>):(customer.addLine2)}</td>
      <td>{edit ? (<input type='number' value={customer.pincode}/>):(customer.pincode)}</td>
      <td>{edit ? (<input type='number' value={customer.quantity}/>):(customer.quantity)}</td>
      <td>{edit ? (<input type='village' value={customer.village}/>):(customer.village)}</td>
      <td><input type="checkbox" checked={customer.isAcceptedFromAdmin} /></td>
      <td><input type="checkbox" checked={customer.isCancelFromFarmer } /></td>
      <td>
        <button onClick={onEdit()}>Edit</button>
        {addDeleteButton(customer.id)}
      </td>
    </tr>
);


  useEffect(() => {
    getAllDataOnce();
  }, []);

  return (
    <table className="table table-bordered">
      <thead className="thead-dark">
      <tr>
  <th scope="col">Order ID</th>
  <th scope="col">Order Date</th>
  <th scope="col">Address Line 1</th>
  <th scope="col">Address Line 2</th>
  <th scope="col">Pincode</th>
  <th scope="col">Quantity</th>
  <th scope="col">Village</th>
  <th scope="col">Admin Accepted</th>
  <th scope="col">Cancel by Farmer</th>
  <th scope="col">Actions</th>
</tr>

      </thead>
      <tbody>
        {customerData.map(customer => addItemToTable(customer))}
      </tbody>
    </table>
  );
};

export default CloudStoreTable;
