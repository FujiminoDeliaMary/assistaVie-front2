import React from "react";
import { Mic, MicOff } from "lucide-react";
import { useVoiceToText } from "react-speakup";

const VoiceToText = () => {
  const { startListening, stopListening, transcript } = useVoiceToText({
    continuous: true,
    lang: "en-US",
  });

  console.log(transcript)

  return (
    <div className="flex flex-col gap-6">
      {" "}
      <div classNam ="flex gap-6">
        <Mic onClick={startListening} role="button" />
        <MicOff onClick={stopListening} role="button" />
      </div>
      <h2>transcript : {transcript}</h2>
    </div>
  );
};

export default VoiceToText;