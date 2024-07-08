// components/LikeBox.js
import React from 'react';

const LikeBox = ({ onClick }) => {
  return (
    <div className="like_box flex-1 bg-blue-500 text-white p-2 rounded w-64 h-32" onClick={onClick}>
      <p>Likes</p>
      <p>33 words</p>
      <p>icon</p>
    </div>
  );
};

export default LikeBox;