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

  return (
    <div className='app'>
      <div className='sidebar'>
        <FriendList friends={friends} />
        <AddFriend addFriend={addFriend} />
        <SplitList />
      </div>
    </div>
  )
}

function FriendList({ friends }) {
  return <>
    <ul>
      {friends.map(friend => <Friend key={friend.id} friend={friend} />)}
    </ul>
  </>
}

function Friend({ friend }) {

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
function SplitList() {
  return <></>
}

export default App
