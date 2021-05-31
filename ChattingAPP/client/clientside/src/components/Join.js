import React from "react";
import { Link } from "react-router-dom";
import AllContext from "../context/AllContext";
import "./Chat.css";

const Join = () => {
  return (
    <AllContext.Consumer>
      {(context) => (
        <div className="container" style={{ display: "initial" }}>
          <div className="row" style={{ justifyContent: "center" }}>
            <div className="col-lg-5 col-md-5 col-sm-12 card text-white bg-dark">
              <div className="card-header text-center">
                <h1 className="display-1">Sign In</h1>
              </div>
              <div className="card-body">
                <form autoComplete="off">
                  <div className="form-group my-2">
                    <label className="form-label">Name:</label>
                    <input
                      placeholder="Name"
                      className="joinInput form-control"
                      type="text"
                      id="Name"
                      autoComplete="off"
                      onChange={(event) => context.setName(event.target.value)}
                    />
                  </div>
                  <div className="form-group my-2">
                    <label className="form-label">Room: </label>
                    <input
                      placeholder="Room"
                      className="joinInput form-control"
                      type="text"
                      id="Room"
                      autoComplete="off"
                      onChange={(event) => context.setRoom(event.target.value)}
                    />
                  </div>
                  <Link
                    to={`/Chat`}
                    onClick={(event) =>
                      !context.name || !context.room
                        ? event.preventDefault()
                        : null
                    }
                  >
                    <button
                      className="btn-outline-primary btn my-2 form-group"
                      type="submit"
                    >
                      Sign In
                    </button>
                  </Link>
                  <div>
                    <p>{context.error !== "" ? `* ${context.error}` : ""}</p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </AllContext.Consumer>
  );
};

export default Join;
