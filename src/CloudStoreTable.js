// import React, { useEffect, useState } from 'react';
// import './CloudStoreTable.css';
// import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, getDocs, doc, deleteDoc, updateDoc, getDoc, setDoc } from 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: "AIzaSyDE_PTy8OPWvKCAHNCntEkCVg6JJlvrrbE",
//   authDomain: "organix-898be.firebaseapp.com",
//   projectId: "organix-898be",
//   storageBucket: "organix-898be.appspot.com",
//   messagingSenderId: "270007385408",
//   appId: "1:270007385408:web:bf82e67869293eb4570ea5",
//   measurementId: "G-X4E00WV895"
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// const CloudStoreTable = () => {
//   const [customerData, setCustomerData] = useState([]);
//   // const handleChange = async (docId) => {
//   //   const querySnapshot = await getDocs(collection(db, 'userInfo'));
//   //   const customers = [];
//   //   querySnapshot.docs.forEach((doc) => {
//   //     const historyData = doc.data().history;
//   //     if (historyData) {
//   //       console.log("History DATA",historyData.uid );
//   //       historyData.forEach((docs)=>{
//   //         console.log("Docs",docs);
//   //       })
//   //     }
//   //   });

//   // };

//   const handleChange = async (docId) => {
//     const querySnapshot = await getDocs(collection(db, 'userInfo'));
//     await setDoc(doc(db, "users", "s00mzdRcvrsjNWSoFJWM"), { name: 'jeneesh' });
//     const customers = [];
//     querySnapshot.docs.forEach(async (doc) => {
//       console.log("fadfsddfdafadsfdsf", doc.id);

//       const historyData = doc.data();
//       if (historyData) {
//         const mainDAta = doc.data().history;

//         if (mainDAta) {
//           const filterData =
//             mainDAta.filter(docs => docs?.orderId === docId);
//           const index = mainDAta.findIndex(docs => docs?.orderId === docId);
//           mainDAta.forEach((dataa, ind) => {
//             console.log("index", ind);
//             if (dataa?.orderId == docId) {
//               customers.push(dataa);
//               console.log("customers", customers);
//             }
//           })
//           console.log("filterDATA", filterData, index);

//           // await setDoc(doc(db,"userInfo",historyData.uid),)



//         };

//       }
//     });

//   };


//   const addDeleteButton = (docId) => {
//     const handleDelete = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, 'userInfo'));

//         const deletePromises = [];

//         querySnapshot.forEach((doc) => {
//           const historyData = doc.data().history;

//           if (historyData) {
//             historyData.forEach((data) => {
//               if (data?.orderId === docId) {
//                 console.log("Actual print", data?.orderId);
//                 const deletePromise = deleteDoc(doc(db, 'userInfo', `${doc.id}`, 'history', `${data?.orderId}`));
//                 deletePromises.push(deletePromise);
//               }
//             });
//           }
//         });

//         // Wait for all delete operations to complete
//         await Promise.all(deletePromises);

//         console.log("All delete operations completed successfully");
//       } catch (error) {
//         console.error("Error deleting documents:", error);
//       }
//     };


//     return (
//       <td>
//         <button onClick={handleDelete} className="btn btn-danger">Delete</button>
//       </td>
//     );
//   };

//   const getAllDataOnce = async () => {
//     const querySnapshot = await getDocs(collection(db, 'userInfo'));
//     const customers = [];
//     querySnapshot.docs.forEach((doc) => {
//       const historyData = doc.data().history;
//       if (historyData) {
//         customers.push(...historyData);
//       }
//       console.log('dfdsfsdfdfda', customers);

//       setCustomerData(customers);
//     });

//     console.log("DATA", customers);
//     setCustomerData(customers);
//   };



//   const addItemToTable = (orderId, orderDate, addLine1, addLine2, isAcceptedFromAdmin, isCancelFromFarmer, isCurrentOrder, pincode, quantity, village, id) => (
//     <tr key={id}>
//       <td>{orderId}</td>
//       <td>{orderDate}</td>
//       <td>{addLine1}</td>
//       <td>{addLine2}</td>
//       <td>{pincode}</td>
//       <td>{quantity}</td>
//       <td>{village}</td>
//       <td>
//         <input
//           type="checkbox"
//           checked={isAcceptedFromAdmin}
//           onChange={() => handleChange(orderId, 'isAcceptedFromAdmin')}
//           className={isAcceptedFromAdmin ? 'checkbox-true' : 'checkbox-false'}
//         />
//       </td>
//       <td>
//         <input
//           type="checkbox"
//           checked={isCancelFromFarmer}
//           onChange={() => handleChange(orderId, 'isCancelFromFarmer')}
//           className={isCancelFromFarmer ? 'checkbox-true' : 'checkbox-false'}
//         />
//       </td>
//       <td>
//         <input
//           type="checkbox"
//           checked={isCurrentOrder}
//           onChange={() => handleChange(orderId, 'isCurrentOrder')}
//           className={isCurrentOrder ? 'checkbox-true' : 'checkbox-false'}
//         />
//       </td>
//       {addDeleteButton(id)}
//     </tr>
//   );

//   useEffect(() => {
//     getAllDataOnce();
//   }, []);

//   return (
//     <div>
//       <div className='tabs'>
//         <div className='buy'>
//           <p>Buy</p>
//         </div>
//         <div className='sell'>
//         <p>Sell</p>
//         </div>
//       </div>
    //   <table className="table table-bordered">
    //   <thead className="thead-dark">
    //     <tr>
    //       <th scope="col">Order ID</th>
    //       <th scope="col">Order Date</th>
    //       <th scope="col">Address Line 1</th>
    //       <th scope="col">Address Line 2</th>
    //       <th scope="col">Pincode</th>
    //       <th scope="col">Quantity</th>
    //       <th scope="col">Village</th>
    //       <th scope="col">Admin Accepted</th>
    //       <th scope="col">Cancel by Farmer</th>
    //       <th scope="col">Current Order</th>
    //       <th scope="col">Actions</th>
    //     </tr>

    //   </thead>
    //   <tbody>
    //     {customerData.map(customer => addItemToTable(
    //       customer?.orderId,
    //       customer?.orderDate?.toDate()?.toLocaleString(),
    //       customer?.addLine1,
    //       customer?.addLine2,
    //       customer?.isAcceptedFromAdmin,
    //       customer?.isCancelFromFarmer,
    //       customer?.isCurrentOrder,
    //       customer?.pincode?.toLocaleString(),
    //       customer?.quantity?.toLocaleString(),
    //       customer?.village?.toLocaleString(),
    //       customer?.orderId 
    //     ))}
    //   </tbody>
    // </table>
//     </div>
//   );
// };

// export default CloudStoreTable;


import React, { useEffect, useState } from 'react';
import './CloudStoreTable.css';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, deleteDoc, setDoc } from 'firebase/firestore';

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
  const [activeTab, setActiveTab] = useState('buy');

  const handleChangeTab = (tab) => {
    setActiveTab(tab);
  };

  const handleChange = async (docId) => {
    const querySnapshot = await getDocs(collection(db, 'userInfo'));
    const updatedCustomerData = [];

    for (const doc of querySnapshot.docs) {
      const historyData = doc.data();
      if (historyData) {
        const mainData = doc.data().history;

        if (mainData) {
          const filterData = mainData.filter(docs => docs?.orderId === docId);
          const index = mainData.findIndex(docs => docs?.orderId === docId);

          mainData.forEach((dataa, ind) => {
            if (dataa?.orderId == docId) {
              updatedCustomerData.push(dataa);
            }
          });
        }
      }
    }

    // Update only the specific entry without replacing the entire array
    setCustomerData((prevData) => {
      const newData = [...prevData];
      const existingIndex = newData.findIndex((customer) => customer?.orderId === docId);

      if (existingIndex !== -1) {
        newData.splice(existingIndex, 1, ...updatedCustomerData);
      }

      return newData;
    });
  };

  const addDeleteButton = (docId) => {
    const handleDelete = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'userInfo'));
        const deletePromises = [];

        for (const doc of querySnapshot.docs) {
          const historyData = doc.data().history;

          if (historyData) {
            historyData.forEach((data) => {
              if (data?.orderId === docId) {
                const deletePromise = deleteDoc(doc(db, 'userInfo', `${doc.id}`, 'history', `${data?.orderId}`));
                deletePromises.push(deletePromise);
              }
            });
          }
        }

        // Wait for all delete operations to complete
        await Promise.all(deletePromises);

        console.log("All delete operations completed successfully");
      } catch (error) {
        console.error("Error deleting documents:", error);
      }
    };

    return (
      <td>
        <button onClick={handleDelete} className="btn btn-danger">Delete</button>
      </td>
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
    });

    setCustomerData(customers);
  };

  const renderBuyTable = () => (
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
          <th scope="col">Current Order</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {customerData.map((customer) => (
          <tr key={customer?.orderId}>
            <td>{customer?.orderId}</td>
            <td>{customer?.orderDate?.toDate()?.toLocaleString()}</td>
            <td>{customer?.addLine1}</td>
            <td>{customer?.addLine2}</td>
            <td>{customer?.pincode?.toLocaleString()}</td>
            <td>{customer?.quantity?.toLocaleString()}</td>
            <td>{customer?.village?.toLocaleString()}</td>
            <td>
              <input
                type="checkbox"
                checked={customer?.isAcceptedFromAdmin}
                onChange={() => handleChange(customer?.orderId, 'isAcceptedFromAdmin')}
                className={customer?.isAcceptedFromAdmin ? 'checkbox-true' : 'checkbox-false'}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={customer?.isCancelFromFarmer}
                onChange={() => handleChange(customer?.orderId, 'isCancelFromFarmer')}
                className={customer?.isCancelFromFarmer ? 'checkbox-true' : 'checkbox-false'}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={customer?.isCurrentOrder}
                onChange={() => handleChange(customer?.orderId, 'isCurrentOrder')}
                className={customer?.isCurrentOrder ? 'checkbox-true' : 'checkbox-false'}
              />
            </td>
            {addDeleteButton(customer?.orderId)}
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderSellTable = () => (
    <table className="table table-bordered">
      <thead className="thead-dark">
        <tr>
          <th scope="col">Sell ID</th>
          <th scope="col">Sell Date</th>
          <th scope="col">Product Name</th>
          <th scope="col">Quantity</th>
          <th scope="col">Price</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {/* Dummy data for the sell table */}
        <tr>
          <td>1</td>
          <td>2023-11-25</td>
          <td>Product A</td>
          <td>10</td>
          <td>$100</td>
          <td>
            <button className="btn btn-danger">Delete</button>
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>2023-11-26</td>
          <td>Product B</td>
          <td>8</td>
          <td>$80</td>
          <td>
            <button className="btn btn-danger">Delete</button>
          </td>
        </tr>
        {/* Add more rows as needed */}
      </tbody>
    </table>
  );

  useEffect(() => {
    getAllDataOnce();
  }, []);

  return (
    <div>
      <div className='tabs'>
        <div className={`buy ${activeTab === 'buy' ? 'active' : ''}`} onClick={() => handleChangeTab('buy')}>
          <p>Buy</p>
        </div>
        <div className={`sell ${activeTab === 'sell' ? 'active' : ''}`} onClick={() => handleChangeTab('sell')}>
          <p>Sell</p>
        </div>
      </div>
      {activeTab === 'buy' ? renderBuyTable() : renderSellTable()}
    </div>
  );
};

export default CloudStoreTable;
