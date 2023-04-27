import { addDoc, collection, deleteDoc, doc, getCountFromServer, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../lib/firebase";

const DEVICE_TOKEN_GROUPS_COLLECTION_NAME = 'deviceTokenGroups'
const deviceTokenGroupCollection = collection(db, DEVICE_TOKEN_GROUPS_COLLECTION_NAME)

export const fetchDeviceTokenGroups = async (limitCount = 1000)=> {
  const q = query(deviceTokenGroupCollection, limit(limitCount), orderBy('createdAt', "desc"))
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id}))
}

export const createDeviceTokenGroup = async (name: string) => {
  return addDoc(deviceTokenGroupCollection, {name, createdAt: new Date()})
}

export const addDeviceToken = async (id: string, token: string) => {
  const collectionRef = collection(db, DEVICE_TOKEN_GROUPS_COLLECTION_NAME, id, 'deviceTokens');
  return addDoc(collectionRef, {token, createdAt: new Date()})
}

// FIXME: deleteDoc does not delete sub-collection
export const deleteDeviceTokenGroup = async (id:string) => {
  return await deleteDoc(doc(deviceTokenGroupCollection, id))
}

export const fetchDeviceTokenCount = async (deviceTokenGroupId: string) => {
  const collectionRef = collection(db, DEVICE_TOKEN_GROUPS_COLLECTION_NAME, deviceTokenGroupId, 'deviceTokens');
  const querySnapshot = await getCountFromServer(collectionRef);
  return querySnapshot.data().count;
}
