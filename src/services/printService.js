import { db } from './firebaseConfig'; // Assuming you have the firebase configuration in this file
import { doc, setDoc, collection, getDocs } from 'firebase/firestore';
import { getDoc, updateDoc, orderBy, query } from "firebase/firestore";
// import bcrypt from "bcryptjs";
const addPrintDoc = async (phone, studentId, documentUrl, numCopies, colorType, pageType, description, totalCost, status = "pending") => {
    try {
      // Generate a unique ID
      const uniqueId = Date.now().toString() + Math.random().toString(36).substr(2, 5);
  
      // Reference to PrintDoc collection in CanteenOwner's sub-collection
      const printDocRef = doc(db, "PrinterOwners", phone, "PrintDoc", uniqueId);
      
      // Print document data
      const printDocData = {
        student_id: studentId,
        document_url: documentUrl,
        num_copies: numCopies,
        color_type: colorType,
        page_type: pageType,
        description: description,
        total_cost: totalCost,
        timestamp: new Date(),
        uniqueId: uniqueId,
        status: status, // Default: pending
      };
  
      // Reference to PrintDoc collection in Students' sub-collection
      const printDocRefStudent = doc(db, "Students", studentId, "PrintDoc", uniqueId);
      
      // Save document request for both Canteen Owner and Student
      await setDoc(printDocRef, printDocData);
      await setDoc(printDocRefStudent, { ...printDocData, canteen_owner: phone });
  
      console.log("Print document request added successfully!");
    } catch (error) {
      console.error("Error adding print document request:", error);
    }
  };
  
  // *Get all PrintDoc requests for a specific Canteen Owner (latest first)*
  const getPrintDocs = async (phone) => {
    try {
      const printDocRef = collection(db, "PrinterOwners", phone, "PrintDoc");
      const q = query(printDocRef, orderBy("timestamp", "desc")); // Sort latest first
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.empty) {
        console.log("No print document requests found for:", phone);
        return []; // Return an empty array if no jobs are found
      }
  
      // Convert the query snapshot into an array of jobs
      const jobsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id, // Include the document ID
        ...doc.data(), // Include all other fields
      }));
  
      console.log(jobsArray);
      return jobsArray;
    } catch (error) {
      console.error("Error fetching print document requests:", error);
      return []; // Return an empty array in case of error
    }
  };
  
  // *Get all PrintDoc requests for a specific Student (latest first)*
  const getPrintDocsForStudents = async (studentId) => {
    try {
      const printDocRef = collection(db, "Students", studentId, "PrintDoc");
      const q = query(printDocRef, orderBy("timestamp", "desc")); // Sort latest first
      const querySnapshot = await getDocs(q);
  
      const printRequests = [];
  
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        printRequests.push({
          id: doc.id,
          date: new Date(data.timestamp.seconds * 1000).toLocaleString(),
          document_url: data.document_url,
          num_copies: data.num_copies,
          color_type: data.color_type,
          page_type: data.page_type,
          description: data.description,
          total_cost: data.total_cost,
          status: data.status,
        });
      });
  
      console.log(printRequests);
      return printRequests;
    } catch (error) {
      console.error("Error fetching print document requests:", error);
    }
  };
  
  // *Update the status of a PrintDoc request*
  const updatePrintDocStatus = async (phone, studentId, uniqueId, newStatus) => {
    try {
      // Reference to the existing PrintDoc document in CanteenOwner's collection
      const printDocRef = doc(db, "PrinterOwners", phone, "PrintDoc", uniqueId);
  
      // Reference to the existing PrintDoc document in Student's collection
      const printDocRefStudent = doc(db, "Students", studentId, "PrintDoc", uniqueId);
  
      // Update the status field
      await updateDoc(printDocRef, { status: newStatus });
      await updateDoc(printDocRefStudent, { status: newStatus });
  
      console.log(`Print document request status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating print document status:", error);
    }
  };
  
  
  
  
  
  
  
  
  
  
  
  
  export const addPrinterOwner = async (phone, name, email, location) => {
    try {
      const printerOwnerRef = doc(db, "PrinterOwners", phone); // Use phone as unique ID
  
      const printerOwnerData = {
        name: name,
        email: email,
        phone: phone,
        location: location,
        timestamp: new Date(), // Store registration time
      };
  
      await setDoc(printerOwnerRef, printerOwnerData); // Save data
      console.log("Printer owner added successfully!");
    } catch (error) {
      console.error("Error adding printer owner:", error);
    }
  };
  
  // *Get a Printer Owner by Phone Number*
  export const getPrinterOwner = async (phone) => {
    try {
      const printerOwnerRef = doc(db, "PrinterOwners", phone);
      const docSnap = await getDoc(printerOwnerRef);
  
      if (docSnap.exists()) {
        console.log("Printer Owner Data:", docSnap.data());
        return docSnap.data();
      } else {
        console.log("No such printer owner found!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching printer owner:", error);
    }
  };
  
  // *Get All Printer Owners*
  export const getAllPrinterOwners = async () => {
    try {
      const printerOwnersRef = collection(db, "PrinterOwners");
      const querySnapshot = await getDocs(printerOwnersRef);
  
      const printerOwners = [];
      querySnapshot.forEach((doc) => {
        printerOwners.push(doc.data());
      });
  
      console.log("All Printer Owners:", printerOwners);
      return printerOwners;
    } catch (error) {
      console.error("Error fetching printer owners:", error);
    }
  };


  const login = async (phone, enteredPassword) => {
    try {
      const ownerRef = doc(db, "PrinterOwners", phone);
      const docSnap = await getDoc(ownerRef);
  
      if (docSnap.exists()) {
        // const storedHashedPassword = docSnap.data().password;
        console.log(enteredPassword)
  
        const isPasswordMatch = true;
        if (isPasswordMatch) {
          console.log("Login successful!");
          return true; // Login successful
        } else {
          alert("Invalid password!");
          return false; // Invalid password
        }
      } else {
        alert("Printer owner not found!");
        return false; // Canteen owner not found
      }
    } catch (error) {
      console.error("Error during login:", error);
      return false; // Error during login
    }
  };



  export {addPrintDoc,updatePrintDocStatus,getPrintDocsForStudents,getPrintDocs, login}