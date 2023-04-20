import { useEffect, useState } from 'react'
import {signIn, signOut, useAuthState} from './lib/firebase'
import { createDeviceTokenGroup, fetchDeviceTokenGroups } from './firestore/deviceTokenGroups';

function App() {
  const [user, loading, error] = useAuthState();
  const [signInForm, setSignInForm] = useState({email: 'ibuki.nakamura@gmail.com', password: 'testtest'});
  const [name, setName] = useState('');

  const onSignInClicked = async () => {
      const response = await signIn(signInForm.email, signInForm.password)
      console.log(response)
      console.log(response.user)
  }
  const onSignOutClicked = async () => {
      const response = await signOut()
      console.log(response)
  }

  const onCreateDeviceTokenGroup = async () => {
    await createDeviceTokenGroup(name)
    console.log(await fetchDeviceTokenGroups())
  }

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
            <h3>Create device token group</h3>
            <div>
              name: <input type="text" value={name} onChange={event => setName(event.target.value)}/>
              <button type="button" onClick={onCreateDeviceTokenGroup}>Create</button>
            </div>
          </div>

          <div style={{marginTop: 50}}>
            <h3>Device token groups</h3>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Device token count</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>name1</td>
                  <td>1</td>
                  <td>
                    <button>Add device token</button>
                    <button>Destroy</button>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>name2</td>
                  <td>2</td>
                  <td>
                    <button>Add device token</button>
                    <button>Destroy</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{marginTop: 50}}>
            <h3>Create push notification</h3>
            <div>
              Name: <input type="text" />
              Content: <input type="text" />
              DeviceTokenId: <select><option value={1}>name1</option></select>
              <button type="button">Create</button>
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
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>name1</td>
                  <td>content1</td>
                  <td>deviceTokenName1 (deviceTokenId: 1)</td>
                  <td>before_publish</td>
                  <td>
                    <button>Publish</button>
                    <button>Destroy</button>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>name2</td>
                  <td>content2</td>
                  <td>deviceTokenName2 (deviceTokenId: 2)</td>
                  <td>published</td>
                  <td>
                    <button>Detail</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </>)
      }
    </div>
  )
}

export default App
