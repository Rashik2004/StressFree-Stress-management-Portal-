import React from 'react';

const DiscussionBoard = () => {
  return (
    <div className="discussion-board">
      <h2>Community Discussions</h2>
      <p>Connect with others on their wellness journey.</p>
      {/* Placeholder for discussion threads */}
      <div className="threads">
        <div className="thread">
          <h4>Meditation Tips</h4>
          <p>Share your favorite meditation techniques here.</p>
        </div>
      </div>
    </div>
  );
};

export default DiscussionBoard;
