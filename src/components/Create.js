import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Create = ({ phoneBook, dispatch }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNum, setPhoneNum] = useState('')
  const [dob, setDob] = useState('')
  const [email, setEmail] = useState('')
  const [occupation, setOccupation] = useState('')
  const [designation, setDesignation] = useState('')
  const [modal, setModal] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (firstName && lastName && phoneNum) {
      let newPerson = {
        id: new Date().getTime().toString(),
        firstName,
        lastName,
        phoneNum,
        dob,
        email,
        occupation,
        designation,
        fav: false,
      }
      let temp = phoneBook.find(
        (item) => item.firstName === firstName && item.lastName === lastName
      )
      if (!temp) {
        dispatch({ type: 'CREATE_NEW', payload: newPerson })
        setModal('created contact')
      } else {
        setModal('contact already exist')
      }
    }

    setFirstName('')
    setLastName('')
    setPhoneNum('')
    setDob('')
    setEmail('')
    setOccupation('')
    setDesignation('')
  }
  useEffect(() => {
    if (modal) {
      setTimeout(() => {
        setModal('')
      }, 1500)
    }
  }, [modal])

  return (
    <div className="create">
      <p style={{ color: 'white' }}>{modal}</p>
      <form
        onSubmit={(e) => {
          handleSubmit(e)
        }}
      >
        <input
          className="name"
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          className="name"
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Phone Number"
          value={phoneNum}
          onChange={(e) => setPhoneNum(e.target.value)}
        />
        <div className="dob">
          <label htmlFor="dob">Date Of Birth:&nbsp;&nbsp; </label>
          <input
            type="date"
            value={dob}
            id="dob"
            onChange={(e) => setDob(e.target.value)}
          />
        </div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Occupation"
          value={occupation}
          onChange={(e) => setOccupation(e.target.value)}
        />
        <input
          type="text"
          placeholder="Designation"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
        />

        <button type="submit">Create</button>
      </form>
      <Link className="back" to="/">
        Home
      </Link>
    </div>
  )
}
const mapStateToProps = (state) => {
  return { phoneBook: state.phoneBook }
}

export default connect(mapStateToProps)(Create)
