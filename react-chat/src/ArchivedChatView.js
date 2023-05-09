import React from 'react';
import { ChatItem, MessageList } from 'react-chat-elements';

function ArchivedChatView({ user, onUnarchive, onClose }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        <img src={user.avatar} alt={user.name} style={{ width: "50px", height: "50px", borderRadius: "50%", marginRight: "20px" }} />
        <div>
          <h2>{user.name}</h2>
          <p style={{ color: user.status === "online" ? "green" : "gray" }}>{user.status === "online" ? "Online" : "Offline"}</p>
        </div>
      </div>
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
      {/* <button onClick={() => onUnarchive(user)}>Unarchive</button> */}
        <button className='close-btn' onClick={onClose}>X</button>
    </div>
  );
}

export default ArchivedChatView;

// import React from 'react';
// import ArchivedChatView from './ArchivedChatView';

// function ArchivedChatView({ selectedUser, onUnarchive }) {
//   return (
//     <div style={{ display: "flex" }}>
//       <div style={{ flex: 1 }}></div>
//       <div style={{ flex: 2 }}>
//         {selectedUser && (
//           <ArchivedChatView user={selectedUser} onUnarchive={onUnarchive} />
//         )}
//       </div>
//     </div>
//   );
// }

// export default ArchivedChatView;


