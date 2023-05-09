

// import React from 'react';

// const StarredContainer = ({ starredMessages, handleStarredClick, count }) => {
//   return (
//     <div>
//       <h2>Starred Messages ({count})</h2>
//       {starredMessages.length === 0 && <p>No starred messages.</p>}
//       {starredMessages.map((user) => (
//         <div key={user.id}>
//           <img src={user.avatar} alt={user.name} />
//           <p>{user.name}</p>
//           <p>{user.message}</p>
//           {/* <button onClick={() => handleStarredClick(user)}>Unstar</button> */}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default StarredContainer;

import React, { useState } from 'react';
import { ChatItem, MessageList } from 'react-chat-elements';
// import './StarredContainer.css';

function StarChatView({ user, onClose }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        <img src={user.avatar} alt={user.name} style={{ width: "50px", height: "50px", borderRadius: "50%", marginRight: "20px" }} />
        <div>
          <h2>{user.name}</h2>
          <p style={{ color: user.status === "online" ? "green" : "gray" }}>{user.status === "online" ? "Online" : "Offline"}</p>
        </div>
      </div>

      <button className='close-btn' onClick={onClose} style={{float: 'right'}}>X</button>
      
      <MessageList
        className='message-list'
        lockable={true}
        toBottomHeight={'100%'}
        dataSource={user.messages.map((message) => ({
          position: message.from === user.id ? 'right' : 'left',
          type: 'text',
          text: message.text,
          date: new Date(message.timestamp),
        }))}
      />
      {/* <button className='close-btn' onClick={onClose}>X</button> */}
    </div>
  );
}

const StarredContainer = ({ starredMessages, handleStarredClick, count }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleChatItemClick = (user) => {
    setSelectedUser(user);
  };

  const filteredUsers = starredMessages.filter(starredMessages => starredMessages.messages.length > 0);

  return (
    <div>
      <h2>Starred Messages ({count})</h2>
      {starredMessages && starredMessages.length > 0 && filteredUsers.length > 0 ? (
      starredMessages.map((user) => (
        <ChatItem
        key={user.id}
        avatar={user.avatar}
        alt={user.name}
        title={user.name}
        subtitle={user.messages[0].text}
        date={user.messages[0].timestamp}
        unread={0}
        onClick={() => handleChatItemClick(user)}
      />
    ))
  ) : (
    <p>No archived chats.</p>
  )}
  {selectedUser && (
    <div>
     <StarChatView user={selectedUser} onClose={() => setSelectedUser(null)} />
      {/* <button onClick={handleUnarchiveClick}>Unarchive</button> */}
</div>
      )}
    </div>
  );
};

export default StarredContainer;






