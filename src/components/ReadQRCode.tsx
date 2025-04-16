import { useState } from "react";
import { useZxing } from "react-zxing";

export const ReadQRCode = () => {
  const [text, setText] = useState("");
  const { ref } = useZxing({
    onDecodeResult(result) {
      setText(result.getText());
    },
  });

  return (
    <div>
      <video ref={ref} />
      <p>
        <span>Last result:</span>
        <span>{text}</span>
      </p>
    </div>
  );
};

export default ReadQRCode;
