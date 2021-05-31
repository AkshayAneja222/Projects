import React, { Component } from "react";
import io from "socket.io-client";
import "./Chat.css";
import AllContext from "../context/AllContext";
import { Redirect } from "react-router-dom";

const ENDPOINT = "192.168.29.32:5000";

class Chat extends Component {
  static contextType = AllContext;
  chatContainer = React.createRef();
  socket = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      message: "",
      name: "",
      room: "",
      users: [],
      correct: true,
    };
  }

  componentDidMount() {
    let { name, room, setError } = this.context;

    if (name !== "" || room !== "") {
      this.setState({ name, room });
      this.socket = io(ENDPOINT);

      this.socket.emit("join", { name, room }, (error) => {
        if (error) {
          this.setState({ correct: false }, () => {
            setError(error);
          });
        }
      });

      this.socket.on("message", (message) => {
        let { messages } = this.state;
        this.setState({ messages: [...messages, message] }, () =>
          this.scrollToMyRef()
        );
      });

      this.socket.on("roomData", ({ users }) => {
        this.setState({ users });
      });
    }
  }

  componentWillUnmount() {
    let { correct } = this.state;
    if (this.socket && correct && this.socket.connected)
      this.socket.disconnect();
  }

  allMessages = () => {
    var index = 0;
    let { messages, name } = this.state;

    var msgs = messages.map((message) => {
      index += 1;
      if (message.user.trim() === name.toLowerCase()) {
        return (
          <div className="d-flex flex-row justify-content-end mb-3" key={index}>
            <p style={{ width: "20%", textAlign: "end" }}>{message.text}</p>
            &nbsp;
            <strong className="capitalize text-warning">{":  You"}</strong>
          </div>
        );
      } else if (message.user.trim() === "admin") {
        return (
          <div
            className="d-flex flex-row justify-content-start mb-3"
            key={index}
          >
            <strong className="capitalize text-danger">
              {message.user + "  :"}
            </strong>
            <>
              &nbsp;
              <p style={{ width: "20%", textAlign: "start" }}>{message.text}</p>
            </>
          </div>
        );
      } else {
        return (
          <div
            className="d-flex flex-row justify-content-start mb-3"
            key={index}
          >
            <strong className="capitalize text-warning">
              {message.user + "  :"}
            </strong>
            &nbsp;
            <p style={{ width: "20%", textAlign: "start" }}>{message.text}</p>
          </div>
        );
      }
    });

    return <div className="text-secondary d-flex flex-column">{msgs}</div>;
  };

  sendMessageButton = () => {
    let { message } = this.state;
    if (message.trim() !== "")
      this.socket.emit("sendMessage", message, () =>
        this.setState({ message: "" })
      );
  };

  sendMessage = (event) => {
    event.preventDefault();

    let { message } = this.state;
    if (message !== "") {
      this.socket.emit("sendMessage", message, () =>
        this.setState({ message: "" })
      );
    }
  };

  scrollToMyRef = () => {
    const scroll =
      this.chatContainer.current.scrollHeight -
      this.chatContainer.current.clientHeight;
    this.chatContainer.current.scrollTo(0, scroll);
  };

  allUsers() {
    let { users } = this.state;
    var usersList = users.map((user) => {
      return <li key={user.id}>{user.name}</li>;
    });

    return <ul>{usersList}</ul>;
  }

  render() {
    let { message, correct } = this.state;
    let { room, name } = this.context;

    return name === "" || room === "" || !correct ? (
      <Redirect to="/" />
    ) : (
      <div id="chatPage" className="text-danger height text-center chatPageCls">
        <div className="row height">
          <div
            id="chatPageHeader"
            className="text-light bg-dark"
            style={{
              top: "0px",
              height: "min-content",
              background: "cadetblue",
            }}
          >
            <h1 style={{ top: "0px" }}>{`**${room}**`}</h1>
          </div>
          <section
            className="col-lg-2 text-light bg-dark"
            style={{ height: "-webkit-fill-available" }}
          >
            {this.allUsers()}
          </section>
          <section
            className="col-lg-10"
            style={{ height: "-webkit-fill-available" }}
          >
            <div
              ref={this.chatContainer}
              style={{ height: "80%", padding: "2px" }}
              className="overflow-auto messages mt-1"
            >
              {this.allMessages()}
            </div>
            <div style={{ height: "10%" }}>
              <input
                style={{ width: "80%", height: "100%", borderRadius: "10px" }}
                value={message}
                onChange={(event) =>
                  this.setState({ message: event.target.value })
                }
                onKeyPress={(event) =>
                  event.key === "Enter" ? this.sendMessage(event) : null
                }
                placeholder="Type message here....."
              />
              <button
                style={{ width: "20%", height: "100%" }}
                onClick={this.sendMessageButton}
                className="btn btn-success"
              >
                SEND
              </button>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default Chat;
