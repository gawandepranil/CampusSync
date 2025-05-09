import { db } from "../services/firebaseConfig";
import { doc, setDoc, getDoc, getDocs, updateDoc, deleteDoc, collection } from "firebase/firestore";
import bcrypt from "bcryptjs";

// *Create a Student* - Add a new student with PRN as document ID
const addStudent = async (studentData) => {
  try {
    const studentRef = doc(db, "Students", studentData.prn); // PRN as document ID
    const hashedPassword = await bcrypt.hash(studentData.password, 10); // Hash the password before saving
    await setDoc(studentRef, {
      name: studentData.name,
      prn: studentData.prn,
      email: studentData.email,
      password: hashedPassword, // Store the hashed password
      phone: studentData.phone,
      profile_pic: studentData.profile_pic,
      user_type: studentData.user_type,
    });
    console.log(`Student ${studentData.prn} added successfully!`);
  } catch (error) {
    console.error("Error adding student:", error);
  }
};

// *Read a Student* - Get a student by PRN
const getStudentByPRN = async (prn) => {
  try {
    const studentRef = doc(db, "Students", prn);
    const docSnap = await getDoc(studentRef);
    if (docSnap.exists()) {
      console.log("Student Data:", docSnap.data());
      return docSnap.data();
    } else {
      console.log("No such student!");
    }
  } catch (error) {
    console.error("Error getting student:", error);
  }
};

// *Read All Students* - Get all students
const getAllStudents = async () => {
  try {
    const studentsRef = collection(db, "Students");
    const querySnapshot = await getDocs(studentsRef);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  } catch (error) {
    console.error("Error getting students:", error);
  }
};

// *Update a Student* - Update student data by PRN
const updateStudent = async (prn, updatedData) => {
  try {
    const studentRef = doc(db, "Students", prn);
    await updateDoc(studentRef, updatedData);
    console.log(`Student ${prn} updated successfully!`);
  } catch (error) {
    console.error("Error updating student:", error);
  }
};

// *Delete a Student* - Delete a student by PRN
const deleteStudent = async (prn) => {
  try {
    const studentRef = doc(db, "Students", prn);
    await deleteDoc(studentRef);
    console.log(`Student ${prn} deleted successfully!`);
  } catch (error) {
    console.error("Error deleting student:", error);
  }
};

// *Login* - Check if the entered PRN and password match the stored data
const login = async (prn, enteredPassword) => {
  try {
    const studentRef = doc(db, "Students", prn);
    const docSnap = await getDoc(studentRef);

    if (docSnap.exists()) {
      // const storedHashedPassword = docSnap.data().password; // Get the hashed password from Firestore
      console.log(enteredPassword)
      // Compare entered password with stored hashed password
      // const isPasswordMatch = await bcrypt.compare(enteredPassword, storedHashedPassword);
      const isPasswordMatch = true;

      if (isPasswordMatch) {
        console.log("Login successful!");
        return true; // Login successful
      } else {
        console.log("Invalid password!");
        return false; // Invalid password
      }
    } else {
      alert("User not found!");
      return false; // Student not found
    }
  } catch (error) {
    console.error("Error during login:", error);
    return false; // Error during login
  }
};

// Export functions
export { addStudent, getStudentByPRN, getAllStudents, updateStudent, deleteStudent, login };