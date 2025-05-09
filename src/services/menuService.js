import { db } from './firebaseConfig'; // Assuming you have the firebase configuration in this file
import { doc, setDoc, collection, getDocs, getDoc } from 'firebase/firestore';

// Add Daily Menu
export const addDailyMenu = async (date, canteenOwnerId, menuItems) => {
  try {
    const menuRef = doc(db, "Menu", date, "Dailymenu", canteenOwnerId);
    // Set the menu items for the specified canteen owner on the given date
    await setDoc(menuRef, menuItems);
    console.log("Daily menu added successfully!");
  } catch (error) {
    console.error("Error adding daily menu:", error);
  }
};

// Add Special Menu
export const addSpecialMenu = async (date, canteenOwnerId, specialMenuItems) => {
  try {
    const menuRef = doc(db, "Menu", date, "SpecialMenu", canteenOwnerId);
    // Set the special menu items for the specified canteen owner on the given date
    await setDoc(menuRef, specialMenuItems);
    console.log("Special menu added successfully!");
  } catch (error) {
    console.error("Error adding special menu:", error);
  }
};

// Get All Daily Menus for a Date
export const getAllDailyMenus = async (date,id) => {
  try {
    const dailyMenuRef = collection(db, "Menu", date, "Dailymenu",id);
    const querySnapshot = await getDocs(dailyMenuRef);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
    });
  } catch (error) {
    console.error("Error getting daily menus:", error);
  }
};

// Get All Special Menus for a Date
export const getAllSpecialMenus = async (date) => {
  try {
    const specialMenuRef = collection(db, "Menu", date, "SpecialMenu");
    const querySnapshot = await getDocs(specialMenuRef);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
    });
  } catch (error) {
    console.error("Error getting special menus:", error);
  }
};

// Get Specific Canteen Owner's Menu for a Given Date
export const getCanteenOwnerMenu = async (date, canteenOwnerId) => {
  try {
    const dailyMenuRef = doc(db, "Menu", date, "Dailymenu", canteenOwnerId);
    const specialMenuRef = doc(db, "Menu", date, "SpecialMenu", canteenOwnerId);

    const dailyMenuSnapshot = await getDoc(dailyMenuRef);
    const specialMenuSnapshot = await getDoc(specialMenuRef);

    if (dailyMenuSnapshot.exists() && specialMenuSnapshot.exists()) {
      console.log("Daily Menu:", dailyMenuSnapshot.data());
      console.log("Special Menu:", specialMenuSnapshot.data());
    } else {
      console.log("Menu not found for this canteen owner on the specified date.");
    }
  } catch (error) {
    console.error("Error getting canteen owner's menu:", error);
  }
};







// Owner Wise

export const getDailyMenuForOwner = async (date, phone) => {
    try {
      const dailyMenuRef = doc(db, "Menu", date, "Dailymenu", phone);
      const dailyMenuSnapshot = await getDoc(dailyMenuRef);
  
      if (dailyMenuSnapshot.exists()) {
        return { menu: dailyMenuSnapshot.data() };
      } else {
        return { error: "No daily menu found for this canteen owner." };
      }
    } catch (error) {
      console.error("Error getting daily menu:", error);
      return { error: error.message };
    }
  };
  
  // Get Special Menu for a Specific Canteen Owner
  export const getSpecialMenuForOwner = async (date, phone) => {
    try {
      const specialMenuRef = doc(db, "Menu", date, "SpecialMenu", phone);
      const specialMenuSnapshot = await getDoc(specialMenuRef);
  
      if (specialMenuSnapshot.exists()) {
        return { menu: specialMenuSnapshot.data() };
      } else {
        return { error: "No special menu found for this canteen owner." };
      }
    } catch (error) {
      console.error("Error getting special menu:", error);
      return { error: error.message };
    }
  };