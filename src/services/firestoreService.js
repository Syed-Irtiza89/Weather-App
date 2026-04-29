// src/services/firestoreService.js
// Handles all Firestore operations: saved cities & user preferences

import {
  doc,
  getDoc,
  setDoc,
  addDoc,
  getDocs,
  deleteDoc,
  collection,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

// ─────────────────────────────────────────────
// 🌍 SAVED CITIES
// ─────────────────────────────────────────────

// Get all saved cities for a user
export const getSavedCities = async (userId) => {
  try {
    const q = query(
      collection(db, "savedCities"),
      where("userId", "==", userId)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting cities:", error);
    return [];
  }
};

// Save a city to Firestore
export const saveCity = async (userId, cityData) => {
  try {
    const ref = await addDoc(collection(db, "savedCities"), {
      userId,
      cityName: cityData.name,
      temp: cityData.main.temp,
      condition: cityData.weather[0].main,
      savedAt: serverTimestamp(),
    });
    return { id: ref.id, error: null };
  } catch (error) {
    console.error("Error saving city:", error);
    return { id: null, error: error.message };
  }
};

// Delete a saved city
export const deleteSavedCity = async (docId) => {
  try {
    await deleteDoc(doc(db, "savedCities", docId));
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

// ─────────────────────────────────────────────
// 🎨 USER PREFERENCES
// ─────────────────────────────────────────────

// Get user preferences
export const getPreferences = async (userId) => {
  try {
    const ref = doc(db, "userPreferences", userId);
    const snap = await getDoc(ref);
    if (snap.exists()) return snap.data();
    // Return defaults if no prefs saved yet
    return { tempUnit: "metric", vibePack: "default" };
  } catch (error) {
    console.error("Error getting preferences:", error);
    return { tempUnit: "metric", vibePack: "default" };
  }
};

// Save / update user preferences
export const savePreferences = async (userId, prefs) => {
  try {
    const ref = doc(db, "userPreferences", userId);
    await setDoc(ref, { ...prefs, updatedAt: serverTimestamp() }, { merge: true });
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};
