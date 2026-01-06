import { useVoice } from "@humeai/voice-react";
import EndCallButton from "../ui/endCallButton";
import { Mic, MicOff } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Toggle } from "../ui/toggle";
import MicFFT from "./micFFT";
import { cn } from "../utils";
import { useNavigate } from "react-router-dom";

export default function Controls() {
  const voice = useVoice();
  const navigate = useNavigate();

  if (!voice || !voice.status) return null;

  const { disconnect, status, isMuted, unmute, mute, micFft, messages } = voice;
  const safeMicFft = Array.isArray(micFft) ? micFft : [];

  const handleEndCall = async () => {
    const validMessages = messages.filter(
      (msg) => msg.type === "user_message" || msg.type === "assistant_message"
    );

    console.log("Total messages:", messages.length);
    console.log("Valid messages:", validMessages.length);

    let transcript = "";
    let emotions: Record<string, number> = {};

    if (validMessages.length > 0) {
      transcript = validMessages
        .map((msg) => {
          const role = msg.type === "user_message" ? "User" : "Assistant";
          const content = "message" in msg ? msg.message?.content || "" : "";
          return `${role}: ${content}`;
        })
        .filter((line) => line.includes(": ") && line.split(": ")[1].trim())
        .join("\n");

      const userMessages = validMessages.filter((msg) => msg.type === "user_message");
      userMessages.forEach((msg) => {
        if ("models" in msg && msg.models?.prosody?.scores) {
          const scores = msg.models.prosody.scores;
          Object.entries(scores).forEach(([emotion, score]) => {
            emotions[emotion] = (emotions[emotion] || 0) + (score as number);
          });
        }
      });

      if (userMessages.length > 0) {
        Object.keys(emotions).forEach((key) => {
          emotions[key] = emotions[key] / userMessages.length;
        });
      }
    }

    console.log("Transcript:", transcript);
    console.log("Emotions:", Object.keys(emotions).length);

    try {
      const res = await fetch("http://localhost:5000/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript: transcript || "No conversation", emoData: emotions }),
      });

      const data = await res.json();
      console.log("Gemini response:", data);

      sessionStorage.setItem(
        "svaraInsights",
        JSON.stringify({
          transcript: transcript || "No conversation recorded",
          emotions,
          analysis: data.response || "Analysis unavailable",
          timestamp: Date.now(),
        })
      );
      console.log("Data saved to sessionStorage");
    } catch (err) {
      console.error("Error calling Gemini:", err);
      sessionStorage.setItem(
        "svaraInsights",
        JSON.stringify({
          transcript: transcript || "No conversation recorded",
          emotions,
          analysis: "Could not generate analysis. Please try again.",
          timestamp: Date.now(),
        })
      );
    }

    disconnect?.();
    navigate("/insights");
  };

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 w-full p-4 pb-6 flex items-center justify-center",
        "bg-gradient-to-t from-card via-card/90 to-card/0"
      )}
    >
      <AnimatePresence>
        {status.value === "connected" && (
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            className="p-4 bg-card border border-border/50 rounded-full flex items-center gap-4"
          >
            <Toggle
              className="rounded-full"
              pressed={!isMuted}
              onPressedChange={() => (isMuted ? unmute?.() : mute?.())}
            >
              {isMuted ? <MicOff className="size-4" /> : <Mic className="size-4" />}
            </Toggle>

            <div className="relative grid h-8 w-48 shrink-0 grow-0">
              <MicFFT fft={safeMicFft} className="fill-current" />
            </div>

            <EndCallButton
              className="flex items-center gap-1 rounded-full"
              onClick={handleEndCall}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
