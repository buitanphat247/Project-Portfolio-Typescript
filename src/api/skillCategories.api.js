import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase.config';

const COLLECTION_NAME = 'skillCategories';

export const skillCategoriesApi = {
  async getAll() {
    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error fetching skill categories:', error);
      throw error;
    }
  },

  async create(data) {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return { id: docRef.id, ...data };
    } catch (error) {
      console.error('Error creating skill category:', error);
      throw error;
    }
  },

  async update(id, data) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: new Date(),
      });
      return { id, ...data };
    } catch (error) {
      console.error('Error updating skill category:', error);
      throw error;
    }
  },

  async delete(id) {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, id));
      return id;
    } catch (error) {
      console.error('Error deleting skill category:', error);
      throw error;
    }
  },
};

