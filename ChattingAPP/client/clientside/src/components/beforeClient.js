import AllContext from "../context/AllContext";
import Chat from "./Chat";

const beforeClient = () => {
  return (
    <AllContext.Consumer>
      {(context) => {
        <div>
          <Chat name={context.name} room={context.room} />
        </div>;
      }}
    </AllContext.Consumer>
  );
};
export default beforeClient;
