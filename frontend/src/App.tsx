import { useEffect, useState } from 'react'
import { getAppToken, signIn, signOut, useAuthState} from './lib/firebase'
import { addDeviceToken, createDeviceTokenGroup, deleteDeviceTokenGroup, fetchDeviceTokenCount, fetchDeviceTokenGroups } from './firestore/deviceTokenGroups';
import { DocumentData } from 'firebase/firestore';
import { createPushNotification, deletePushNotification, fetchPushNotifications } from './firestore/pushNotifications';
import { publishPushNotification} from './api';

function App() {
  const [user, loading, error] = useAuthState();
  const [signInForm, setSignInForm] = useState({email: 'ibuki.nakamura@gmail.com', password: 'testtest'});
  const [createForm, setCreateForm] = useState({name: ''});
  const [deviceTokenGroups, setDeviceTokenGroups] = useState<DocumentData>([]);
  const [deviceToken, setDeviceToken] = useState('');

  const onSignInClicked = async () => {
    const response = await signIn(signInForm.email, signInForm.password)
    console.log(response)
    console.log(response.user)
  }
  const onSignOutClicked = async () => {
    const response = await signOut()
    console.log(response)
  }

  const onGenerateDeviceTokenClicked = async () => {
    const response = await getAppToken()
    setDeviceToken(response)
  }

  const onCreateDeviceTokenGroupClicked = async () => {
    await createDeviceTokenGroup(createForm.name)
    await reloadDeviceTokenGroups();
  }

  const onDeleteDeviceTokenGroupClicked = async (id: string) => {
    if(!confirm('Delete?')) return
    await deleteDeviceTokenGroup(id)
    await reloadDeviceTokenGroups();
  }

  const reloadDeviceTokenGroups = async () => {
    const response = await fetchDeviceTokenGroups();
    setDeviceTokenGroups(response);
  }

  const showDeviceTokenCount = async (id:string) =>  alert(await fetchDeviceTokenCount(id))

  const [createPushNotificationForm, setCreatePushNotificationForm] = useState({name: '', content: '', deviceTokenGroupId: ''});
  const [pushNotifications, setPushNotifications] = useState<DocumentData>([]);

  const onCreatePushNotificationClicked = async () => {
    await createPushNotification(createPushNotificationForm)
    await reloadPushNotifications();
  }

  const onDeletePushNotificationClicked = async (id: string) => {
    if(!confirm('Delete?')) return
    await deletePushNotification(id)
    await reloadPushNotifications();
  }

  const reloadPushNotifications = async () => {
    const response = await fetchPushNotifications();
    setPushNotifications(response);
  }

  const onPublishClicked = async (id: string) => {
    await publishPushNotification(id)
  }


  useEffect(() => {reloadDeviceTokenGroups(); reloadPushNotifications()}, [])

  return (
    <div>
      <h1>Firebase Push Notifier</h1>
      <div>{user?.uid}</div>
      {!user && (
        <div>
          Email: <input type="email" value={signInForm.email} onChange={event => setSignInForm({...signInForm, email: event.target.value})}/>
          Password: <input type="password" value={signInForm.password} onChange={event => setSignInForm({...signInForm, password: event.target.value})}/>
          <button type="button" onClick={onSignInClicked}>Log in</button>
        </div>
      )}
      {
        user && (<>
          <div>
            Logged in as User
            <button type="button" onClick={onSignOutClicked}>Log out</button>
          </div>

          <div style={{marginTop: 50}}>
            <h3>Generate device token for testing with this browser</h3>
            <div>
              Device token: <input type="text" value={deviceToken} onChange={event => setDeviceToken(event.target.value)}/>
              <button type="button" onClick={onGenerateDeviceTokenClicked}>Generate</button>
            </div>
          </div>

          <div style={{marginTop: 50}}>
            <h3>Create device token group</h3>
            <div>
              name: <input type="text" value={createForm.name} onChange={event => setCreateForm({...createForm, name: event.target.value})}/>
              <button type="button" onClick={onCreateDeviceTokenGroupClicked}>Create</button>
            </div>
          </div>

          <div style={{marginTop: 50}}>
            <h3>Device token groups</h3>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Created at</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {deviceTokenGroups.map((deviceTokenGroup: any) => (
                  <tr key={deviceTokenGroup.id}>
                    <td>{deviceTokenGroup.id}</td>
                    <td>{deviceTokenGroup.name}</td>
                    <td>{deviceTokenGroup.createdAt && new Date(deviceTokenGroup.createdAt.seconds * 1000).toISOString()}</td>
                    <td>
                      <button onClick={() => deviceToken ? addDeviceToken(deviceTokenGroup.id, deviceToken) : alert('Device token is empty')}>Add device token</button>
                      <button onClick={() => showDeviceTokenCount(deviceTokenGroup.id)}>Show device token count</button>
                      <button onClick={() => onDeleteDeviceTokenGroupClicked(deviceTokenGroup.id)}>Delete</button>
                    </td>
                  </tr>
                )) }
              </tbody>
            </table>
          </div>

          <div style={{marginTop: 50}}>
            <h3>Create push notification</h3>
            <div>
              Name: <input type="text" value={createPushNotificationForm.name} onChange={event => setCreatePushNotificationForm({...createPushNotificationForm, name: event.target.value})}/>
              Content: <input type="text" value={createPushNotificationForm.content} onChange={event => setCreatePushNotificationForm({...createPushNotificationForm, content: event.target.value})}/>
              DeviceTokenId: <select value={createPushNotificationForm.deviceTokenGroupId} onChange={event => setCreatePushNotificationForm({...createPushNotificationForm, deviceTokenGroupId: event.target.value})} >
                <option>Please select</option>
              {deviceTokenGroups.map((deviceTokenGroup: any) => (
                <option value={deviceTokenGroup.id} key={deviceTokenGroup.id}>{deviceTokenGroup.name}</option>
                )) }
              </select>
              <button type="button" onClick={onCreatePushNotificationClicked}>Create</button>
            </div>
          </div>

          <div style={{marginTop: 50}}>
            <h3>Push notifications</h3>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Content</th>
                  <th>Device token name</th>
                  <th>Status</th>
                  <th>Created at</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pushNotifications.map((pushNotification:any ) => (
                  <tr key={pushNotification.id}>
                    <td>{pushNotification.id}</td>
                    <td>{pushNotification.name}</td>
                    <td>{pushNotification.content}</td>
                    <td>{pushNotification.deviceTokenGroupId}</td>
                    <td>{pushNotification.status}</td>
                    <td>{pushNotification.createdAt && new Date(pushNotification.createdAt.seconds * 1000).toISOString()}</td>
                    <td>
                      <button onClick={() => onPublishClicked(pushNotification.id)}>Publish</button>
                      <button onClick={() => showDeviceTokenCount(pushNotification.deviceTokenGroupId)}>Show count</button>
                      <button onClick={() => onDeletePushNotificationClicked(pushNotification.id)}>Delete</button>
                    </td>
                  </tr>
                )) }
              </tbody>
            </table>
          </div>
        </>)
      }
    </div>
  )
}

export default App
