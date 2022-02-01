import React from "react";

const Notification = ({ message }) => {
  return (
    <div>
      {message.type === "error" ? (
        <p className="error">{message.content}</p>
      ) : (
        <p className="message">{message.content}</p>
      )}
    </div>
  );
};

export default Notification;
