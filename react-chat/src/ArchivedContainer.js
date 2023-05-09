// import React from 'react';

// function ArchivedContainer({ users, unarchiveUser, count }) {
//   return (
//     <div>
//       <h2>Archived chats ({count})</h2>
//       {users.length > 0 ? (
//         users.map((user) => (
//           <div key={user.id}>
//             <h3>{user.name}</h3>
//             <p>{user.status}</p>
//             {/* <button onClick={() => unarchiveUser(user.id)}>Unarchive</button> */}
//           </div>
//         ))
//       ) : (
//         <p>No archived chats.</p>
//       )}
//     </div>
//   );
// }

// export default ArchivedContainer;

// import React from 'react';

// function ArchivedContainer({ users, unarchiveUser, count }) {
//   return (
//     <div>
//       <h2>Archived chats ({count})</h2>
//       {users.length > 0 ? (
//         users.map((user) => (
//           <div key={user.id}>
//             <h3>{user.name}</h3>
//             <img src={user.avatar} alt={user.name} style={{ width: "50px", height: "50px", borderRadius: "50%", marginRight: "20px" }} />
//             <ul>
//               {user.messages.map((message) => (
//                 <li key={message.id}>
//                   <p>{message.text}</p>
//                   <p>{message.timestamp}</p>
//                 </li>
//               ))}
//             </ul>
//             {/* <button onClick={() => unarchiveUser(user.id)}>Unarchive</button> */}
//           </div>
//         ))
//       ) : (
//         <p>No archived chats.</p>
//       )}
//     </div>
//   );
// }

// export default ArchivedContainer;

// import React from 'react';
// import { ChatItem } from 'react-chat-elements';

// function ArchivedContainer({ users, unarchiveUser, count }) {
//   return (
//     <div>
//       <h2>Archived chats ({count})</h2>
//       {users.length > 0 ? (
//         users.map((user) => (
//           <ChatItem
//             key={user.id}
//             user={user}
//             messages={user.messages}
//             onArchiveChat={unarchiveUser}
//             isArchived={user.archived}
//           />
//         ))
//       ) : (
//         <p>No archived chats.</p>
//       )}
//     </div>
//   );
// }

// export default ArchivedContainer;

// import React from 'react';

// function ChatHeader({ user }) {
//   return (
//     <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
//       <img src={user.avatar} alt={user.name} style={{ width: "50px", height: "50px", borderRadius: "50%", marginRight: "20px" }} />
//       <div>
//         <h2>{user.name}</h2>
//         <p style={{ color: user.status === "online" ? "green" : "gray" }}>{user.status === "online" ? "Online" : "Offline"}</p>
//       </div>
//     </div>
//   );
// }

// function ChatMessage({ message }) {
//   return (
//     <div>
//       <p>{message.text}</p>
//       <p style={{ fontSize: "12px", color: "gray" }}>{message.timestamp}</p>
//     </div>
//   );
// }

// function ArchivedChat({ user }) {
//   return (
//     <div>
//       <ChatHeader user={user} />
//       {user.messages.map((message) => (
//         <ChatMessage key={message.id} message={message} />
//       ))}
//     </div>
//   );
// }

// function ArchivedContainer({ users, unarchiveUser, count }) {
//   return (
//     <div>
//       <h2>Archived chats ({count})</h2>
//       {users.length > 0 ? (
//         users.map((user) => (
//           <ArchivedChat key={user.id} user={user} />
//         ))
//       ) : (
//         <p>No archived chats.</p>
//       )}
//     </div>
//   );
// }

// export default ArchivedContainer;

import React, { useState } from 'react';
import { ChatItem, MessageList } from 'react-chat-elements';
import ArchivedChatView from './ArchivedChatView';
import './ArchivedContainer.css'

function ChatView({ user, onClose }) {
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

function ArchivedContainer({ users, unarchiveUser, count }) {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleChatItemClick = (user) => {
    setSelectedUser(user);
  };

  const handleUnarchiveClick = () => {
    setSelectedUser(null);
    unarchiveUser(selectedUser);
  };

  const filteredUsers = users.filter(user => user.messages.length > 0);

  return (
    <div>
      <h2>Archived chats ({count})</h2>
      {users && users.length > 0 && filteredUsers.length > 0 ? (
        filteredUsers.map((user) => (
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
         <ChatView user={selectedUser} onClose={() => setSelectedUser(null)} />
          {/* <button onClick={handleUnarchiveClick}>Unarchive</button> */}
    </div>
    )}
    </div>
  );
}

export default ArchivedContainer;

// import React, { useState } from 'react';
// import { ChatItem, MessageList } from 'react-chat-elements';
// import ArchivedChatWindow from './ArchivedChatWindow';

// function ArchivedContainer({ users, unarchiveUser, count }) {
//   const [selectedUser, setSelectedUser] = useState(null);

//   const handleChatItemClick = (user) => {
//     setSelectedUser(user);
//   };

//   const handleUnarchiveClick = () => {
//     setSelectedUser(null);
//     unarchiveUser(selectedUser);
//   };

//   const filteredUsers = users.filter(user => user.messages.length > 0);

//   return (
//     <div>
//       <h2>Archived chats ({count})</h2>
//       {filteredUsers.length > 0 ? (
//         filteredUsers.map((user) => (
//           <ChatItem
//             key={user.id}
//             avatar={user.avatar}
//             alt={user.name}
//             title={user.name}
//             subtitle={user.messages[0].text}
//             date={user.messages[0].timestamp}
//             unread={0}
//             onClick={() => handleChatItemClick(user)}
//           />
//         ))
//       ) : (
//         <p>No archived chats.</p>
//       )}
//       <ArchivedChatWindow selectedUser={selectedUser} onUnarchive={handleUnarchiveClick} />
//     </div>
//   );
// }

// export default ArchivedContainer;
