import React, { useEffect, useState } from 'react'
import AddUser from './AddUser';
import './index.css';
import Update from './Update';
function Header() {
  const [isLoading, setIsLoading] = useState(true);
  // const [nothing, setnothing] = useState(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [users, setUser] = useState("")
  const [id, setUserid] = useState(null)
  const [data, setdata] = useState([])
  // const [showUpdate, setshowUpdate] = useState(false);
  // const [showAddUser, setshowAddUser] = useState(false);
  const [showComponentOne, setShowComponentOne] = useState(null);
  useEffect(() => {
    fetchData()
  }, [])
  async function fetchData() {
    try {
      await fetch('http://localhost:1000/users').then((e) => {
        e.json().then((e) => {
          setdata(e)
        })
      })
    } catch (error) {
      console.error(error);
    }   setIsLoading(false);
  }
  if (isLoading) {
    return <div class="d-flex m-4 justify-content-center">
    <div class="spinner-border m-4" role="status">
      <span class="sr-only m-4"></span>
    </div>
  </div>
  }

  if (!data) {
    return <p>No data available.</p>;
  }

  if (data.id <= 1) {
    return null;
  }
  function ondelete(id) {
    console.log(id)
    fetch(`http://localhost:1000/users/${id}`, {
      method: "DELETE"
    }).then((e) => {
      e.json().then((e) => {
        // console.log(e)
      })
    })
    fetchData()
  }
  function onUpdate(id) {
    // console.log(data[id - 1])
    setName(data[id - 1].name)
    setUser(data[id - 1].users)
    setEmail(data[id - 1].email)
    setUserid(data[id - 1].id)
    // setshowUpdate(true);
    setShowComponentOne('Update');
  }
  const handerUpdate = () => {
    // console.log(name, users, email, id)
    let item = { name, users, email, id }

    fetch(`http://localhost:1000/users/${id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(item)
    }).then((e) => {
      e.json().then((e) => {
        console.log(e)
        fetchData()
      })
    })
  }
  const handerAdUsers = () => {
    console.log({ name, users, email })
    const data = { name, users, email }
    fetch("http://localhost:1000/users", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((e) => {
      e.json().then((e) => {
        console.log(e)
        fetchData()
      })
    })
  }
  function showAddUserfun() {
    // setshowAddUser(true)
    setShowComponentOne('AddUser');
  }
  return (
    <>
      <h1 className='text-center my-4'>data from API</h1>
      <div class="d-grid gap-2 d-md-flex container my-4 justify-content-md-end">
        <button onClick={() => { showAddUserfun() }} class="btn btn-primary me-md-2" type="button">Add User</button>
      </div>
      <table className='container' border="1">
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>userName</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>

          {data.map((item) =>
            <tr key={item.id}>
            
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.users}</td>
              <td>{item.email}</td>
              <td>
                <button onClick={() => { ondelete(item.id) }} type="button " className="btn btn-danger ">delete</button>
                <button type="button " onClick={() => { onUpdate(item.id) }} className="btn btn-info mx-4">update</button>

              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        {showComponentOne === 'Update' && <Update handerUpdate={handerUpdate} id={id} setName={setName} setUser={setUser} setEmail={setEmail} Name={name} Email={email} UserName={users} />}
      </div>
      <div>
        {showComponentOne === 'AddUser' && <AddUser handerAdUsers={handerAdUsers} id={id} setName={setName} setUser={setUser} setEmail={setEmail} Name={name} Email={email} UserName={users} />}
      </div>
    </>
  )
}
export default Header