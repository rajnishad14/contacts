import React from 'react'
import { connect } from 'react-redux'

const Person = ({
  firstName,
  lastName,
  number,
  dob,
  email,
  occupation,
  makeFav,
  recent,
  designation,
  fav,
}) => {
  const handleFav = () => {
    makeFav()
  }
  return (
    <div className="person">
      <div className="image">{firstName.charAt(0)}</div>
      <div className="info">
        <h3>{firstName + ' ' + lastName}</h3>
        <p>{number}</p>
        <p>{dob}</p>
        <p>{email}</p>
        <p>{occupation}</p>
        <p>{designation}</p>
      </div>
      <div className="person-btn">
        <button
          onClick={() => {
            handleFav()
          }}
        >
          {fav ? 'fav -' : 'fav +'}
        </button>
        <button
          onClick={() => {
            recent()
          }}
        >
          call
        </button>
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const { id } = ownProps
  return {
    makeFav: () => dispatch({ type: 'MAKE_FAV', payload: { i: id } }),
    recent: () => dispatch({ type: 'RECENT', payload: { i: id } }),
  }
}

export default connect(null, mapDispatchToProps)(Person)
