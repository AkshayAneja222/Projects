import React, { Component } from "react";
import AllContext from "./AllContext";

class Provider extends Component {
  state = {
    name: "",
    room: "",
    error: "",
  };

  render() {
    return (
      <AllContext.Provider
        value={{
          name: this.state.name,
          room: this.state.room,
          error: this.state.error,
          setName: (name) => {
            this.setState({ name: name });
          },
          setRoom: (room) => {
            this.setState({ room: room });
          },
          setError: (error) => {
            this.setState({ error: error });
          },
        }}
      >
        {this.props.children}
      </AllContext.Provider>
    );
  }
}
export default Provider;
