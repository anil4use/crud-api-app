import React, { useEffect, useState } from 'react'

function Main() {

  const [data, setdata] = useState([])
  useEffect(() => {
    fetch("https://dummyjson.com/users").then((resposn) => {
      return resposn.json().then((result) => {

        setdata(result)
      })
    })
  }, [])
  console.log(data)
  return (
    <>
    {
          data.map((Itme) =>
         <h2>{Itme.users}</h2> )
        }
    </>
  )
}

export default Main