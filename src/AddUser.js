import React from 'react'

function AddUser(props) {
  return (
    <>
 <div className='container ' style={{ display: "flex", flexDirection: "column" }}>
        <h3>data update</h3>
        <input value={props.Name} onChange={(e) => { props.setName(e.target.value) }} className="form-control mb-3" type="text" placeholder='Name'></input>
        <input value={props.UserName} onChange={(e) => { props.setUser(e.target.value) }} className="form-control mb-3" type="text" placeholder='users'></input>
        <input value={props.Email} onChange={(e) => { props.setEmail(e.target.value) }} className="form-control mb-3" type="email" placeholder='Email'></input>
        <button  onClick={props.handerAdUsers} className='btn btn-dark '> Add users</button>
      </div>
    </>
  )
}

export default AddUser