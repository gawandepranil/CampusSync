import { db } from "./firebaseConfig";
import { doc, setDoc, getDoc, getDocs, updateDoc, deleteDoc, collection, orderBy, query } from "firebase/firestore";
import bcrypt from "bcryptjs";

// *Create a CanteenOwner* - Add a new Canteen Owner with phone number as document ID
const addCanteenOwner = async (ownerData) => {
  try {
    const ownerRef = doc(db, "CanteenOwner", ownerData.phone); // Phone number as document ID
    const hashedPassword = await bcrypt.hash(ownerData.password, 10); // Hash the password before saving
    await setDoc(ownerRef, {
      owner_name: ownerData.owner_name,
      email: ownerData.email,
      password: hashedPassword, // Store the hashed password
      phone: ownerData.phone,
      canteen_name: ownerData.canteen_name,
      location: ownerData.location,
      upi_id: ownerData.upi_id,
      ratings: ownerData.ratings,
      reviews: ownerData.reviews,
      status: ownerData.status,
      table_bookings: ownerData.table_bookings,
    });
    console.log(`Canteen Owner ${ownerData.phone} added successfully!`);
  } catch (error) {
    console.error("Error adding canteen owner:", error);
  }
};

// *Read a CanteenOwner* - Get a canteen owner by phone number
const getCanteenOwnerByPhone = async (phone) => {
  try {
    const ownerRef = doc(db, "CanteenOwner", phone);
    const docSnap = await getDoc(ownerRef);
    if (docSnap.exists()) {
      console.log("Canteen Owner Data:", docSnap.data());
      return docSnap.data();
    } else {
      console.log("No such canteen owner!");
    }
  } catch (error) {
    console.error("Error getting canteen owner:", error);
  }
};

// *Read All CanteenOwners* - Get all canteen owners
const getAllCanteenOwners = async () => {
  try {
    const ownersRef = collection(db, "CanteenOwner");
    const querySnapshot = await getDocs(ownersRef);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  } catch (error) {
    console.error("Error getting canteen owners:", error);
  }
};

// *Update a CanteenOwner* - Update canteen owner data by phone number
const updateCanteenOwner = async (phone, updatedData) => {
  try {
    const ownerRef = doc(db, "CanteenOwner", phone);
    await updateDoc(ownerRef, updatedData);
    console.log(`Canteen Owner ${phone} updated successfully!`);
  } catch (error) {
    console.error("Error updating canteen owner:", error);
  }
};

// *Delete a CanteenOwner* - Delete a canteen owner by phone number
const deleteCanteenOwner = async (phone) => {
  try {
    const ownerRef = doc(db, "CanteenOwner", phone);
    await deleteDoc(ownerRef);
    console.log(`Canteen Owner ${phone} deleted successfully!`);
  } catch (error) {
    console.error("Error deleting canteen owner:", error);
  }
};

// *Login* - Check if the entered phone number and password match the stored data
const login = async (phone, enteredPassword) => {
  try {
    const ownerRef = doc(db, "CanteenOwner", phone);
    const docSnap = await getDoc(ownerRef);

    if (docSnap.exists()) {
      console.log(enteredPassword)
      // const storedHashedPassword = docSnap.data().password; // Get the hashed password from Firestore

      // Compare entered password with stored hashed password
      // const isPasswordMatch = await bcrypt.compare(enteredPassword, storedHashedPassword);
      const isPasswordMatch = true;

      if (isPasswordMatch) {
        console.log("Login successful!");
        return true; // Login successful
      } else {
        alert("Invalid password!");
        return false; // Invalid password
      }
    } else {
      alert("Canteen owner not found!");
      return false; // Canteen owner not found
    }
  } catch (error) {
    console.error("Error during login:", error);
    return false; // Error during login
  }
};







// *Add a Menu Item* - Add a menu item to the FixMenu sub-collection of a specific canteen owner
const addMenuItem = async (phone, menuItem) => {
  try {
    const menuRef = doc(db, "CanteenOwner", phone, "FixMenu", menuItem.name); // FixMenu sub-collection
    await setDoc(menuRef, {
      name: menuItem.name,
      price: menuItem.price,
    });
    console.log(`Menu item ${menuItem.name} added successfully!`);
  } catch (error) {
    console.error("Error adding menu item:", error);
  }
};

// *Get Menu Items* - Retrieve all menu items from the FixMenu sub-collection of a specific canteen owner
const getMenuItems = async (phone) => {
  try {
    const menuRef = collection(db, "CanteenOwner", phone, "FixMenu");
    const querySnapshot = await getDocs(menuRef);
    let menu = {};



    querySnapshot.forEach((doc) => {

      const data = doc.data();

      menu[data.name] = data.price; // Adjust price as needed (e.g., divide by 2)

    });
    // console.log(menu);
    
    return menu;
  } catch (error) {
    console.error("Error fetching menu items:", error);
  } 
};







const addOrder = async (phone, studentId, orderDetails, status = "pending") => {
  try {
    // Reference to the Orders sub-collection with studentId as document ID
    const ordersRef = doc(db, "CanteenOwner", phone, "Orders", studentId);
    
    // Order data with status field
    const orderData = {
      student_id: studentId,
      order_details: orderDetails,
      timestamp: new Date(), // Automatically generated timestamp
      status: status, // The status of the order, default is "pending"
    };

    // Set the order data with the studentId as the document ID
    await setDoc(ordersRef, orderData);
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








const updateOrderStatus = async (phone, studentId, newStatus) => {
  try {
    // Reference to the existing order document for the student
    const orderRef = doc(db, "CanteenOwner", phone, "Orders", studentId);

    // Update the order status
    await updateDoc(orderRef, {
      status: newStatus, // New status (completed, rejected, etc.)
    });

    console.log(`Order status updated to ${newStatus} for student ${studentId}`);
  } catch (error) {
    console.error("Error updating order status:", error);
  }
};
















// Export functions
export { addCanteenOwner, getCanteenOwnerByPhone, getAllCanteenOwners, updateCanteenOwner, deleteCanteenOwner, login,addMenuItem,getMenuItems ,addOrder, getOrders,updateOrderStatus};