import "./message.css";
import { format } from "timeago.js";

export default function Message({ msg, own, typing }) {
  return (
    <div className="messages">
      <div className="messagetime">{format(msg.createdAt)}</div>
      <div className={own ? "msgbox own" : "msgbox"}>
        <div className="message">
          {/* <img className="messageimg" src="./PICITY.png" alt="" /> */}
          <p className="messagetext"> {msg.text}</p>
          {typing === true && "typing..."}
        </div>
      </div>
    </div>
  );
}
