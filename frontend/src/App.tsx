import { useState } from 'react'

function App() {
  return (
    <div>
      <h1>Firebase Push Notifier</h1>
      <div>
        Email: <input type="email" />
        Password: <input type="password" />
        <button type="button">Log in</button>
      </div>
      <div>
        Logged in as User
        <button type="button">Log out</button>
      </div>

      <div style={{marginTop: 50}}>
        <h3>Create device token group</h3>
        <div>
          name: <input type="text" />
          <button type="button">Create</button>
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
    </div>
  )
}

export default App
