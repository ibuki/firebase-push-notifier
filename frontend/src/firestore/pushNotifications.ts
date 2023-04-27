import { addDoc, collection, deleteDoc, doc, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../lib/firebase";

const PUSH_NOTIFICATION_COLLECTION_NAME = 'pushNotifications'
const pushNotificationCollection = collection(db, PUSH_NOTIFICATION_COLLECTION_NAME)

export const fetchPushNotifications = async (limitCount = 1000)=> {
  const q = query(pushNotificationCollection, limit(limitCount), orderBy('createdAt', "desc"))
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id}))
}

export const createPushNotification = async (params : {name: string, content: string, deviceTokenGroupId: string}) => {
  return addDoc(pushNotificationCollection, {...params, status: 'beforePublish', createdAt: new Date()})
}

// FIXME: deleteDoc does not delete sub-collection
export const deletePushNotification = async (id:string) => {
  return await deleteDoc(doc(pushNotificationCollection, id))
}
