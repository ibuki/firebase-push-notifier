import axios from 'axios'
export const publishPushNotification = async (pushNotificationId: string)  => {
  console.log( await axios.get('/helloWorld'))
  console.log( await axios.post(`/api/push_notifications/${pushNotificationId}/publish`))
}
