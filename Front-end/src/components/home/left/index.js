import LeftLink from "./LeftLink";
import "./style.css";
import { left } from "../../../data/home";
import { ArrowDown1 } from "../../../svg";
import { useState } from "react";
import { Link } from "react-router-dom";
import Shortcut from "./Shortcut";
export default function LeftHome({ user }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="left_home scrollbar">
      <div className="left_link">
        <img src={user?.picture} alt="" />
        <span>
          {user?.first_name} {user?.last_name}
        </span>
      </div>
      {left.slice(0, 8).map((link, i) => (
        <LeftLink
          key={i}
          img={link.img}
          text={link.text}
          notification={link.notification}
        />
      ))}

      {!visible && (
        <div className="left_link hover1" onClick={() => setVisible(true)}>
          <div className="small_circle">
            <ArrowDown1 />
          </div>
          <span>See More</span>
        </div>
      )}
      {visible && (
        <div className="more_left">
          {left.slice(8, left.length).map((link, i) => (
            <LeftLink
              key={i}
              img={link.img}
              text={link.text}
              notification={link.notification}
            />
          ))}
          <div className="left_link hover1" onClick={() => setVisible(false)}>
            <div className="small_circle rotate360">
              <ArrowDown1 />
            </div>
            <span>See Less</span>
          </div>
        </div>
      )}
      <div className="splitter"></div>
      <div className="shortcut">
        <div className="heading">Your Shortcuts</div>
        <div className="edit_shortcut">Edit</div>
      </div>
      <div className="shortcut_list">
        <Shortcut
          link="https://youtube.com/@sancreation"
          img="../../images/ytb.png"
          name="My Youtube Channel"
        />
      </div>

      <div className={`talentify_copyright ${visible && "relative_t_copy"}`}>
        <Link to="/">
          Privacy
          <span> . </span>
        </Link>
        <Link to="/">
          Terms
          <span> . </span>
        </Link>
        <Link to="/">
          Adverstisement
          <span> . </span>
        </Link>
        <Link to="/">
          Cookies
          <span> . </span>
        </Link>
        <Link to="/">More</Link>
        <br />
        ©HBS 2023
      </div>
    </div>
  );
}
