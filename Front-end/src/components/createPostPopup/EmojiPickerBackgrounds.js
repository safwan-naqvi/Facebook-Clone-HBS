import Picker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";

export default function EmojiPickerBackgrounds({ setText, user, text, type2 }) {
  const [picker, setPicker] = useState(false);
  const textRef = useRef(null);
  const [cursorPosition, setCursorPosition] = useState();
  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);
  const handleEmoji = ({ emoji }, e) => {
    const ref = textRef.current;
    ref.focus();
    const start = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setText(newText);
    setCursorPosition(start.length + emoji.length);
  };
  return (
    <>
      <div className={type2 ? "images_input" : ""}>
        <div className={!type2 ? "flex_center" : ""}>
          <textarea
            ref={textRef}
            maxLength="100"
            value={text}
            placeholder={`What's on your mind, ${user?.first_name}`}
            className={`post_input ${type2 && "input2"} scrollbar`}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>
        <div className={!type2 ? "post_emojis_wrap" : ""}>
          {picker && (
            <div
              className={`comment_emoji_picker ${
                type2 ? "movepicker2" : "rlmove"
              }`}
            >
              <Picker onEmojiClick={handleEmoji} />
            </div>
          )}
          {!type2 && <img src="../../../icons/colorful.png" alt="" />}
          <i
            className={`emoji_icon_large ${type2 ? "moveleft" : ""}`}
            onClick={() => {
              setPicker((prev) => !prev);
            }}
          ></i>
        </div>
      </div>
    </>
  );
}
