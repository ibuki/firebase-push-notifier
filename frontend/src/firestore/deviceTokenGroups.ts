import { addDoc, collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "../lib/firebase";

const DEVICE_TOKEN_GROUPS_COLLECTION_NAME = 'deviceTokenGroups'
const deviceTokenGroupCollection = collection(db, DEVICE_TOKEN_GROUPS_COLLECTION_NAME)
export const fetchDeviceTokenGroups = async (limitCount = 1000)=> {
  const q = query(deviceTokenGroupCollection, limit(limitCount))
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => doc.data())
}

export const createDeviceTokenGroup = async (name: string) => {
  return addDoc(deviceTokenGroupCollection, {name, createdAt: new Date()})
}
