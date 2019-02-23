import React, { Component } from "react";
import axios from "axios";
import Persons from "../../components/Persons/Persons";
import Results from "../../components/Results/Results";
import "./App.css";

class App extends Component {
  state = {
    persons: [],
    directFriends: [],
    friendsOfFriends: [],
    suggestedFriends: []
  };

  componentDidMount() {
    axios
      .get("./data.json")
      .then(res => {
        this.setState({ persons: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  directFriendsHandler = id => {
    const persons = this.state.persons.slice();
    const friends = persons[id - 1].friends;
    const directFriends = [];
    friends.map(id => {
      return directFriends.push(persons[id - 1]);
    });
    this.setState({ directFriends });
  };

  friendsOfFriendsHandler = id => {
    const persons = this.state.persons.slice();
    const friends = persons[id - 1].friends;
    const friendsOfFriendsArr = [];
    friends.map(id => {
      return persons[id - 1].friends.map(friendOfFriend => {
        return friendsOfFriendsArr.push(persons[friendOfFriend - 1]);
      });
    });
    let friendsOfFriends = friendsOfFriendsArr.filter(
      friend => friend.id !== id
    );
    friendsOfFriends = [...new Set(friendsOfFriends)];
    this.setState({ friendsOfFriends });
  };

  suggestedFriendsHandler = id => {
    const persons = this.state.persons.slice();
    const friends = persons[id - 1].friends;
    persons.splice(id - 1, 1);
    let suggestedFriends = [];
    let filteredFriends = persons.filter(person => {
      return (
        friends.filter(friend => {
          return friend === person.id;
        }).length === 0
      );
    });

    filteredFriends.map(filtered => {
      let count = 0;
      return filtered.friends.map(filteredFriend => {
        return friends.map(friend => {
          if (filteredFriend === friend) {
            count++;
          }
          if (count >= 2) {
            suggestedFriends.push(filtered);
          }
        });
      });
    });
    suggestedFriends = [...new Set(suggestedFriends)];
    this.setState({ suggestedFriends });
  };

  displayResults = id => {
    // console.log(this.state.friendsOfFriends);
    this.directFriendsHandler(id);
    this.friendsOfFriendsHandler(id);
    this.suggestedFriendsHandler(id);
  };

  render() {
    const persons = this.state.persons.map(person => (
      <Persons key={person.id} info={person} display={this.displayResults} />
    ));
    return (
      <div className="App">
        {persons}
        {this.state.directFriends && (
          <Results
            directFriends={this.state.directFriends}
            friendsOfFriends={this.state.friendsOfFriends}
            suggestedFriends={this.state.suggestedFriends}
          />
        )}
      </div>
    );
  }
}

export default App;
