const reducer = (state, action) => {
  if (action.type === 'CREATE_NEW') {
    let copyPhoneBook = [...state.phoneBook]
    const newPerson = {
      id: action.payload.id,
      firstName: action.payload.firstName,
      lastName: action.payload.lastName,
      number: action.payload.phoneNum,
      dob: action.payload.dob,
      email: action.payload.email,
      occupation: action.payload.occupation,
      designation: action.payload.designation,
      fav: action.payload.fav,
    }
    copyPhoneBook.push(newPerson)
    return { ...state, phoneBook: [...copyPhoneBook] }
  }
  if (action.type === 'MAKE_FAV') {
    let copyFav = [...state.fav]
    let copyAll = [...state.phoneBook]
    let temp = copyAll.find((item) => item.id === action.payload.i)
    temp.fav = true
    if (!copyFav.includes(temp, 'inreducer')) {
      copyFav.push(temp)
      return { ...state, fav: [...copyFav], phoneBook: [...copyAll] }
    }
    return { ...state }
  }
  if (action.type === 'RECENT') {
    let copyRecent = [...state.recent]
    let temp = state.phoneBook.find((item) => item.id === action.payload.i)
    copyRecent = copyRecent.filter((item) => item.id !== temp.id)
    if (copyRecent.length > 10) {
      copyRecent.pop()
    }
    copyRecent.unshift(temp)
    return { ...state, recent: [...copyRecent] }
  }
  return state
}
export default reducer
