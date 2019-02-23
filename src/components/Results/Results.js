import React from "react";
import "./Results.css";

const Results = props => {
  const directFriends = props.directFriends.map(friend => (
    <p key={friend.id}>{`${friend.firstName} ${friend.surname}`}</p>
  ));
  const friendsOfFriends = props.friendsOfFriends.map(friend => (
    <p key={friend.id}>{`${friend.firstName} ${friend.surname}`}</p>
  ));
  const suggestedFriends = props.suggestedFriends.map(friend => (
    <p key={friend.id}>{`${friend.firstName} ${friend.surname}`}</p>
  ));
  return (
    <div>
      <hr />
      <p>Direct friends</p>
      <div className="Display">{directFriends}</div>
      <hr />
      <p>Friends of friends</p>
      <div className="Display">{friendsOfFriends}</div>
      <hr />
      <p>Suggested friends</p>
      <div className="Display">{suggestedFriends}</div>
    </div>
  );
};

export default Results;
