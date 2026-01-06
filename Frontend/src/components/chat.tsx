import { VoiceProvider } from "@humeai/voice-react";
import Messages from "./message";
import Controls from "./controls";
import StartCall from "./startCall";

export default function ChatInterface() {
  const apiKey = import.meta.env.VITE_HUME_API_KEY || "";
  const configId = import.meta.env.VITE_HUME_CONFIG_ID || "";

  if (!apiKey || !configId) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">Missing API credentials. Check your .env file.</p>
      </div>
    );
  }

  return (
    <div className="relative grow flex flex-col mx-auto w-full overflow-hidden h-screen">
      <VoiceProvider>
        <Messages />
        <Controls />
        <StartCall apiKey={apiKey} configId={configId} />
      </VoiceProvider>
    </div>
  );
}
