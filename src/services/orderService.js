import { db } from './firebaseConfig'; // Assuming you have the firebase configuration in this file
import { doc, setDoc, collection, getDocs } from 'firebase/firestore';
import {  updateDoc, orderBy, query } from "firebase/firestore";

const addOrder = async (phone, studentId, orderDetails, status = "pending") => {
    try {
      // Reference to the Orders sub-collection with studentId as document ID
      const uniqueId = Date.now().toString() + Math.random().toString(36).substr(2, 5);
  
      const ordersRef = doc(db, "CanteenOwner", phone, "Orders", uniqueId);
      
      // Order data with status field
      const orderData = {
        student_id: studentId,
        order_details: orderDetails,
        timestamp: new Date(), // Automatically generated timestamp
        uniqueId :uniqueId,
        status: status, 
      };
  
      const orderData1 = {
        canteen_owner: phone,
        order_details: orderDetails,
        timestamp: new Date(), // Automatically generated timestamp
        uniqueId :uniqueId,
        status: status, // The status of the order, default is "pending"
      };
      // Set the order data with the studentId as the document ID
      await setDoc(ordersRef, orderData);
      const ordersRefStudent = doc(db, "Students", studentId, "Orders", uniqueId);
      await setDoc(ordersRefStudent, orderData1);
  
  
  
  
      console.log("Order added successfully!");
    } catch (error) {
      console.error("Error adding order:", error);
    }
  };
  
  
  
  // *Get Orders* - Retrieve all orders from the Orders sub-collection of a specific canteen owner (latest first)
  const getOrders = async (phone) => {
    try {
      const ordersRef = collection(db, "CanteenOwner", phone, "Orders");
      const q = query(ordersRef, orderBy("timestamp", "desc")); // Sorting by timestamp (latest first)
      const querySnapshot = await getDocs(q);
      
      const orders = [];

querySnapshot.forEach((doc) => {
  const data = doc.data();
  
  orders.push({
    id: doc.id, // Unique order ID
    date: new Date(data.timestamp.seconds * 1000).toLocaleString(), // Convert timestamp
    items: data.order_details.map(item => `${item.item} (x${item.quantity})`).join(", "), // Format items
    status: data.status, // Order status
  });
});

console.log(orders); // Check the formatted list before returning
return orders;
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  
  const getOrdersForStudents = async (studentId) => {
    try {
      const ordersRef = collection(db, "Students", studentId, "Orders");
      const q = query(ordersRef, orderBy("timestamp", "desc")); // Sorting by timestamp (latest first)
      const querySnapshot = await getDocs(q);
      
      const orders = [];

querySnapshot.forEach((doc) => {
  const data = doc.data();
  
  orders.push({
    id: doc.id, // Unique order ID
    date: new Date(data.timestamp.seconds * 1000).toLocaleString(), // Convert timestamp
    items: data.order_details.map(item => `${item.item} (x${item.quantity})`).join(", "), // Format items
    status: data.status, // Order status
  });
});

console.log(orders); // Check the formatted list before returning
return orders;
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  
  
  
  
  
  
  
  
  const updateOrderStatus = async (phone, studentId, uniqueId,newStatus) => {
    try {
      // Reference to the existing order document for the student
      const orderRef = doc(db, "CanteenOwner", phone, "Orders", uniqueId);
  
      // Update the order status
      await updateDoc(orderRef, {
        status: newStatus, // New status (completed, rejected, etc.)
      });
  
      const ordersRefStudent = doc(db, "Students", studentId, "Orders", uniqueId);
      await updateDoc(ordersRefStudent, {
        status: newStatus, // New status (completed, rejected, etc.)
      });
  
      console.log(`Order status updated to ${newStatus} for student ${uniqueId}`);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };


export { addOrder, getOrders, updateOrderStatus, getOrdersForStudents };


