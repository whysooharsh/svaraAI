import { useVoice, type ConnectOptions } from "@humeai/voice-react";
import { AnimatePresence, motion } from "framer-motion";
import CallButton from "../ui/button";
import { useState } from "react";

interface StartCallProps {
  apiKey: string;
  configId: string;
}

export default function StartCall({ apiKey, configId }: StartCallProps) {
  const { status, connect } = useVoice();
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    if (status.value === "connected" || status.value === "connecting" || isConnecting) {
      return;
    }

    setIsConnecting(true);

    const connectOptions: ConnectOptions = {
      auth: { type: "apiKey", value: apiKey },
      configId: configId,
    };

    try {
      await connect(connectOptions);
    } catch {
      alert("Unable to connect. Please check microphone permissions and try again.");
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <AnimatePresence>
      {status.value !== "connected" && (
        <motion.div
          className="fixed inset-0 p-4 flex items-center justify-center bg-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.5 }}
          >
            <CallButton
              className="z-50 flex items-center gap-1.5 rounded-full"
              onClick={handleConnect}
              disabled={isConnecting || status.value === "connecting"}
              variant="connect"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}