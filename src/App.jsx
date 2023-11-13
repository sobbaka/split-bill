import { useState } from 'react'

const friendsList = [{
  id: 118836,
  name: "Clark",
  image: "https://i.pravatar.cc/48?u=118836",
  balance: -7,
},
{
  id: 933372,
  name: "Sarah",
  image: "https://i.pravatar.cc/48?u=933372",
  balance: 20,
},
{
  id: 499476,
  name: "Anthony",
  image: "https://i.pravatar.cc/48?u=499476",
  balance: 0,
},
];


function App() {

  const [friends, setFriends] = useState(friendsList)
  const [friend, setFriend] = useState(null)

  function addFriend(name, image) {
    const newFriend = {
      id: new Date().getTime(),
      name: name,
      image: image,
      balance: 0
    }
    const newFriends = [...friends, newFriend]
    setFriends(newFriends)
  }

  function selectFriend(id) {
    if (friend?.id === id) {
      setFriend(null)
      return
    }
    setFriend(friends.find(item => item.id === id))
  }

  function setFriendBalance(value) {
    setFriends(friends.map(person =>
      person.id === friend.id
        ? { ...person, balance: person.balance + value }
        : person
    ));
  }

  return (
    <div className='app'>
      <div className='sidebar'>
        <FriendList
          friends={friends}
          friendSelect={selectFriend}
          friendSelected={friend}
        />
        <AddFriend addFriend={addFriend} />
      </div>
      {friend ? <SplitList friend={friend} setFriendBalance={setFriendBalance} /> : null}
    </div>
  )
}

function FriendList({ friends, friendSelected, friendSelect }) {
  return <>
    <ul>
      {friends.map(friend => <Friend
        key={friend.id}
        friend={friend}
        friendSelected={friendSelected}
        friendSelect={friendSelect}
      />)}
    </ul>
  </>
}

function Friend({ friend, friendSelected, friendSelect }) {

  const text = (friend.balance > 0) ?
    `You owe ${friend.name} ${friend.balance} Euro` :
    (friend.balance < 0) ?
      `${friend.name} owes you ${Math.abs(friend.balance)} Euro` :
      `${friend.name} and you are even`

  const textColor = (friend.balance > 0) ? 'red' : (friend.balance < 0) ? 'green' : ""

  return <>
    <li>
      <img src={friend.image} />
      <h3>{friend.name}</h3>
      <p className={textColor}>{text}</p>
      <input
        type="button"
        value={friendSelected?.id === friend.id ? 'Close' : 'Select'}
        onClick={() => friendSelect(friend.id)}
        className='button' />
    </li>
  </>
}

function AddFriend({ addFriend }) {
  const [name, setName] = useState('')
  const [image, setImage] = useState('')

  function addFriendHandler(evt) {
    evt.preventDefault()
    addFriend(name, image)
    setName('')
    setImage('')
  }

  return <>
    <form className='form-add-friend' onSubmit={(evt) => addFriendHandler(evt)}>
      <label htmlFor='name'>👩🏻‍🤝‍🧑🏼Friend name</label><input type="text" id='name' value={name} onChange={evt => setName(evt.target.value)} />
      <label htmlFor='photo'>📸Image URL</label><input type="text" id='photo' value={image} onChange={evt => setImage(evt.target.value)} />
      <input type="submit" value="Add" className='button' />
    </form>
  </>
}

function SplitList({ friend, setFriendBalance }) {

  const [bill, setBill] = useState('')
  const [expense, setExpense] = useState('')
  const [payer, setPayer] = useState('you')

  function handleBalance(evt) {
    evt.preventDefault()
    if (bill !== "" && expense !== "") {
      const value = payer === 'friend' ? expense : -(bill - expense)
      setFriendBalance(value)
      setBill('')
      setExpense('')
    }
  }

  function handleValue(evt) {
    const value = parseInt(evt.target.value);
    if (!isNaN(value)) return value
    return ""
  }


  return <>
    <form className='form-split-bill' onSubmit={evt => handleBalance(evt)}>
      <h2>Split a bill with {friend.name}</h2>
      <h3><label htmlFor='bill'>💰 Bill value</label></h3>
      <input type="text" id="bill" value={bill} onChange={evt => setBill(handleValue(evt))}></input>
      <h3><label htmlFor='expense'>🚶‍♂️ Your expense</label></h3>
      <input type="text" id="expense" value={expense} onChange={evt => setExpense(handleValue(evt))}></input>
      <h3><label htmlFor='expense'>👩🏻‍🤝‍🧑🏼 {friend.name}`s expense</label></h3>
      <input type="text" id="expense" disabled value={(bill !== "" && expense !== "") ? bill - expense : ''} />
      <h3><label htmlFor='payer'>🤑 Who is paying the bill</label></h3>
      <select name="payer" id="payer" value={payer} onChange={evt => setPayer(evt.target.value)}>
        <option value="you">You</option>
        <option value="friend">{friend.name}</option>
      </select>
      <input type="submit" value="Split bill" className='button' />
    </form>
  </>
}

export default App
