import React, { useState, useEffect } from "react";
import { ChatItem, MessageList, Input, Button, Dropdown, CheckBox} from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import "./App.css";
import star from "./star.png";
import {FaFilter, FaCommentAlt } from "react-icons/fa";
import ArchivedContainer from "./ArchivedContainer";
import StarredContainer from "./StarredContainer";


const ChatHeader = ({ user, onArchiveChat, isArchived }) => {
  const [archived, setArchived] = useState(isArchived);
  // const [archived, setArchived] = useState(user.archived);
  const handleArchiveClick = () => {
    setArchived(!archived);
    onArchiveChat(user, !archived);
    // const updatedArchived = !archived;
    // setArchived(updatedArchived);
    // onArchiveChat(user.id, updatedArchived);
    console.log(user);
  };
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
      <img src={user.avatar} alt={user.name} style={{ width: "50px", height: "50px", borderRadius: "50%", marginRight: "20px" }} />
      <div>
        <h2>{user.name}</h2>
        <p style={{ color: user.status === "online" ? "green" : "gray" }}>{user.status === "online" ? "Online" : "Offline"}</p>
        <button className="archive-button" onClick={handleArchiveClick}>
          {archived ? "Unarchive" : "Archive"}
        </button>
      </div>
    </div>
  );
};


const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [archivedChats, setArchivedChats] = useState([]);
  const [starredMessages, setStarredMessages] = useState([]);
  const [showArchived, setShowArchived] = useState(false);
  const [showStarred, setShowStarred] = useState(false);
  const [starred, setStarred] = useState(false);
  // const [filterUsers, setFilterUsers] = useState([]);
  const [checkedUsers, setCheckedUsers] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [isAllSelected, setAllSelected] = useState(false);

  // const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    fetch("users.json")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setMessages(user.messages);
    const updatedUsers = users.map((u) => {
      if (u.id === user.id) {
        return { ...u, unread: 0 };
      }
      return u;
    });
    setUsers(updatedUsers);
  };


  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === "") {
      return;
    }
    const newMessage = {
      position: "right",
      type: "text",
      text: inputValue,
      date: new Date(),
      starred: false,
    };
    setMessages([...messages, newMessage]);
    setSelectedUser((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, newMessage],
    }));
    setInputValue("");
  };

 

  const handleArchiveChat = (user, isArchived, onArchiveChat) => {
    const updatedUsers = users.map(u => {
      if (u.id === user.id) {
        return {...u, isArchived};
      }
      return u;
    });
    setUsers(updatedUsers);
    if (isArchived) {
      setArchivedChats([...archivedChats, user]);
    } else {
      setArchivedChats(archivedChats.filter(chat => chat.id !== user.id));
    }
  
    return { ...user, isArchived };
  };


  // const archiveUser = (id) => {
  //   const userToArchive = users.find((user) => user.id === id);
  //   setUsers(users.filter((user) => user.id !== id));
  //   setArchivedChats([...archivedChats, userToArchive]);
  // };

  const unarchiveUser = (id) => {
    const userToUnarchive = archivedChats.find((user) => user.id === id);
    setArchivedChats(archivedChats.filter((user) => user.id !== id));
    setUsers([...users, userToUnarchive]);
  };
  
  const ArchiveClick = () => {
    setShowArchived(true);
    setShowStarred(false);
  };
  
  const StarredClick = () => {
    setShowArchived(false);
    setShowStarred(true);
  };

  const StarClick = () => {
    setStarred(!starred);
  };

  const filteredUsers = users.filter((user) =>
  user.name.toLowerCase().includes(searchValue.toLowerCase())
);


const handleStarredClick = (message) => {
  const index = starredMessages.indexOf(message);
  if (index === -1) {
    // Message is not already starred
    setStarredMessages([...starredMessages, message]);
    setMessages((prevMessages) =>
      prevMessages.map((prevMessage) =>
        prevMessage.id === message.id ? { ...prevMessage, starred: true } : prevMessage
      )
    );
  } else {
    // Message is already starred
    const newStarredMessages = [...starredMessages];
    newStarredMessages.splice(index, 1);
    setStarredMessages(newStarredMessages);
    setMessages((prevMessages) =>
      prevMessages.map((prevMessage) =>
        prevMessage.id === message.id ? { ...prevMessage, starred: false } : prevMessage
      )
    );
  }
  
};

 // function to handle checkbox change
//  const handleCheckboxChange = (event, user) => {
//   const isChecked = event.target.checked;
//   // add or remove user based on checkbox state
//   if (isChecked) {
//     setFilterUsers(prevUsers => [...prevUsers, user]);
//   } else {
//     setFilterUsers(prevUsers => prevUsers.filter(u => u.id !== user.id));
//   }
// }

//
const handleCheckboxChange = (event, user) => {
  const isChecked = event.target.checked;
  if (isChecked) {
    setCheckedUsers((prevState) => [...prevState, user.id]);
  } else {
    setCheckedUsers((prevState) => prevState.filter((id) => id !== user.id));
  }
};

// const handleCheckboxChange = (event, user) => {
//   const isChecked = event.target.checked;
//   if (isChecked) {
//     setSelectedUser([...selectedUser, user.id]);
//   } else {
//     setSelectedUser(selectedUser.filter((id) => id !== user.id));
//   }
// };


// function to handle the "select all" checkbox click
// const handleSelectAllClick = () => {
//   if (selectedUser.length === users.length) {
//     setSelectedUser([]);
//   } else {
//     setSelectedUser(users.map((user) => user.id));
//   }
// };

//
const handleSelectAllClick = (event) => {
  const checked = event.target.checked;
  setSelectAllChecked(checked);
  // setSelectedUser(checked ? users.map(user => user.id) : []);
  setAllSelected(checked)
};

// const handleSelectAllClick = (event) => {
//   const checked = event.target.checked;
//   setSelectAllChecked(checked);
//   setAllSelected(checked); // update isAllSelected state
//   if (!checked) { // if Select All checkbox is unchecked
//     setSelectedUser([]); // uncheck all user checkboxes
//   } else {
//     setSelectedUser(users.map(user => user.id)); // check all user checkboxes
//   }
// };


// const handleSelectAll = (event) => {
//   if (event.target.checked) {
//     setSelectedUser(users);
//   }
//   else {
//     setSelectedUser([]);
//   }
// };

// const handleDeleteUser = (id) => {
//   const updatedUsers = users.filter((user) => user.id !== id);
//   setUsers(updatedUsers);
// };

// To delete selected users individually
// const handleDeleteUser = () => {
//   const updatedUsers = users.filter((user) => !checkedUsers.includes(user.id));
//   setUsers(updatedUsers);
//   setCheckedUsers([]);
// };

// To delete all selected users
const handleDeleteUser = () => {
  if (isAllSelected) {
    setUsers([]);
    setCheckedUsers([]);
  } else {
    const updatedUsers = users.filter((user) => !checkedUsers.includes(user.id));
    setUsers(updatedUsers);
    setCheckedUsers([]);
  }
};




console.log(selectedUser);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div
        style={{
          flex: "0 0 25%",
          borderRight: "1px solid lightgray",
          padding: "20px",
        }}
      >

        <h2 style={{ marginBottom: "14px" }}>Users</h2>
        <input
         className="search"
          type="text"
          placeholder="Search by name"
          value={searchValue}
          onChange={handleSearchChange}
        /> 
      <FaCommentAlt className="new-message" style={{marginLeft: "60px",fontSize: "20px"}}/>
      <FaFilter className="filter" style={{marginLeft: "50px", fontSize: "20px"}}/>
       

       <div>
            <select className="select">
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
            </select>
        </div>

        <div className="Action">
          <select className="action" value="" onChange={(e) => e.target.value === 'delete' ? handleDeleteUser() : null}>
            <option value="select-option">Select option</option>
            <option value="archive">Edit</option>
            <option value="delete">Delete</option>
          </select>
      </div>
       
      <div>
        <h1 className="chats" style={{ marginBottom: "20px" }}>
          Chats
        <span className="archive" onClick={ArchiveClick} >
          Archived 
        </span>
        <span className="starred" onClick={StarredClick}>
          Starred
        </span>
        </h1>
        {showArchived && <ArchivedContainer users={archivedChats} unarchiveUser={unarchiveUser} count={archivedChats.length}/>}
        {showStarred && <StarredContainer starredMessages={starredMessages} handleStarredClick={handleStarredClick} count={starredMessages.length}/>}
    </div>


        <div style={{ height: "calc(100vh - 112px)", overflowY: "scroll" }}>
          <div>
              <input
                    className="select-all"
                    type="checkbox"
                    onChange={handleSelectAllClick}
              />
                Select All
            </div>
            {filteredUsers.map((user) => (
              <div key={user.id} style={{  alignItems: 'center' }}>
                <input type="checkbox" checked={checkedUsers.includes(user.id) || isAllSelected} onChange={(event) => handleCheckboxChange(event, user)} style={{ float: 'left', marginRight: '10px' }}/>
                {/* <input
                    type="checkbox"
                    checked={selectAllChecked || (selectedUser && selectedUser.includes(user.id))}
                    onChange={(event) => handleCheckboxChange(event, user)}
                /> */}

                    <ChatItem
                      className="chat-item"
                      key={user.id}
                      avatar={user.avatar}
                      alt={user.name}
                      title={user.name}
                      subtitle={user.messages[user.messages.length -3 ].text}
                      onClick={() => handleUserClick(user)}
                      onContextMenu={() => handleArchiveChat(user)}
                      showMute={true}
                      showVideoCall={true}
                      status={
                        <div style={{ color: user.status === "online" ? "green" : "gray" }}>
                          {user.status === "online" ? "Online" : "Offline"}
                        </div>
                      }
                      unread={user.unread}
                      isArchived={archivedChats.some((archivedUser) => archivedUser.id === user.id)}
                      onArchiveToggle={(isArchived) => handleArchiveChat(user, isArchived)}
                    />
                    {/* <button onClick={() => handleDeleteUser(user.id)}>Delete</button> */}
                </div>
            ))}
            {filteredUsers.length === 0 && (
              <div style={{ textAlign: "center", padding: "50px" }}>
                <h2>No users found!</h2>
              </div>
            )}
        </div>
      </div>
      <div style={{ flex: "1", padding: "20px" }}>
        {selectedUser ? (
          <>
          <ChatHeader user={selectedUser} onArchiveChat={handleArchiveChat} isArchived={false} />
            <MessageList
              messages={messages}
              className='message-list'
              lockable={true}
              toBottomHeight={'100%'}
              dataSource={messages.map((message) => ({
                ...message,
                avatar:
                  message.position === 'left'
                    ? selectedUser.avatar
                    : null,
                title:
                  message.position === 'left' ? (
                    <div
                      style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <p>{selectedUser.name}</p>
                      <button className="star" onClick={() => handleStarredClick(selectedUser, true)}>
                        {selectedUser.isStarred
                          ? '☆' // add logics here ex. message.isStarred ? 'filled star' : 'unfilled star'
                          : '⭐'}
                      </button>
                    </div>
                  ) : null,
                      subtitle: message.date.toLocaleString(),
                      avatarFlexible: true,
                      icon: selectedUser.isStarred ? 'star' : null,
              }))}
          />

         </>
        ) : (
          <div style={{ textAlign: "center", padding: "50px" }}>
            <h2>Select a user to start chatting!</h2>
          </div>
        )}
        {selectedUser &&  (
          <Input
            className="message-input"
            placeholder={`Type a message to ${selectedUser.name}...`}
            value={inputValue}
            onChange={handleInputChange}
            multiline={true}
            rightButtons={
              <button className="send-button" onClick={handleSendMessage}>
                Send
              </button>
            }
          />
        )}
      </div>
    </div>
  );
};


export default App;
