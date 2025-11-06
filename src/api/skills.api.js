import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, orderBy, where, limit, startAfter, getCountFromServer } from 'firebase/firestore';
import { db } from '../config/firebase.config';

const COLLECTION_NAME = 'skills';
const PAGE_SIZE = 10;

export const skillsApi = {
  async getAllWithoutPagination() {
    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error fetching all skills:', error);
      throw error;
    }
  },

  async getAll(categoryId = null, pageSize = PAGE_SIZE, lastDoc = null) {
    try {
      let q;
      if (categoryId) {
        q = query(collection(db, COLLECTION_NAME), where('categoryId', '==', categoryId), orderBy('createdAt', 'desc'), limit(pageSize));
      } else {
        q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'), limit(pageSize));
      }
      if (lastDoc) {
        q = query(q, startAfter(lastDoc));
      }
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      const lastVisible = snapshot.docs[snapshot.docs.length - 1];
      return { data, lastDoc: lastVisible, hasMore: snapshot.docs.length === pageSize };
    } catch (error) {
      console.error('Error fetching skills:', error);
      throw error;
    }
  },

  async getCount(categoryId = null) {
    try {
      let q;
      if (categoryId) {
        q = query(collection(db, COLLECTION_NAME), where('categoryId', '==', categoryId));
      } else {
        q = query(collection(db, COLLECTION_NAME));
      }
      const snapshot = await getCountFromServer(q);
      return snapshot.data().count;
    } catch (error) {
      console.error('Error counting skills:', error);
      return 0;
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
      console.error('Error creating skill:', error);
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
      console.error('Error updating skill:', error);
      throw error;
    }
  },

  async delete(id) {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, id));
      return id;
    } catch (error) {
      console.error('Error deleting skill:', error);
      throw error;
    }
  },
};

