import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Person from './Person'

const Home = ({ phoneBook = [], fav = [], recent = [] }) => {
  const [search, setSearch] = useState('')
  const [all, setAll] = useState([...phoneBook])
  const [showAll, setShowAll] = useState(true)
  const [showFav, setShowFav] = useState(false)
  const [showRecent, setShowRecent] = useState(false)
  const handleSearch = (e) => {
    setSearch(e.target.value)
    let str = e.target.value
    if (str) {
      let copyAll = [...phoneBook]
      copyAll = copyAll.filter((item) => {
        let email = item.email.toLowerCase()
        let occupation = item.occupation.toLowerCase()
        let firstName = item.firstName
        let lastName = item.lastName
        return (
          email.startsWith(str.toLowerCase()) ||
          occupation.startsWith(str.toLowerCase()) ||
          item.dob.startsWith(str) ||
          firstName.startsWith(str.toLowerCase()) ||
          lastName.startsWith(str.toLowerCase())
        )
      })
      setAll([...copyAll])
    } else {
      setAll([...phoneBook])
    }
  }

  const favBtnClick = () => {
    setShowAll(false)
    setShowRecent(false)
    setShowFav(true)
  }
  const allBtnClick = () => {
    setShowRecent(false)
    setShowFav(false)
    setShowAll(true)
  }
  const recentBtnClick = () => {
    setShowAll(false)
    setShowFav(false)
    setShowRecent(true)
  }
  return (
    <div className="home">
      <Link className="link" to="create">
        <button className="new-contact">Create</button>
      </Link>
      <input
        placeholder="🔍 search"
        type="text"
        value={search}
        onChange={(e) => handleSearch(e)}
      />
      <div className="display">
        <section className="buttons">
          <button
            onClick={() => {
              recentBtnClick()
            }}
          >
            Recent
          </button>
          <button
            onClick={() => {
              allBtnClick()
            }}
          >
            All
          </button>
          <button
            onClick={() => {
              favBtnClick()
            }}
          >
            Favorites
          </button>
        </section>
        <section className="contacts">
          {showAll &&
            all.map((item, id) => {
              return <Person key={id} {...item} />
            })}
          {showFav &&
            fav.map((item, id) => {
              return <Person key={id} {...item} />
            })}
          {showRecent &&
            recent.map((item, id) => {
              return <Person key={id} {...item} />
            })}
        </section>
      </div>
    </div>
  )
}
const mapStateToProps = (state) => {
  return { phoneBook: state.phoneBook, fav: state.fav, recent: state.recent }
}

export default connect(mapStateToProps)(Home)
