import React, { createContext, useState } from "react";
import AIModelList from "@/shared/AIModelList";

// Initialize default selected models for each AI model
const getDefaultSelectedModels = () => {
  const defaults = {};
  AIModelList.forEach((model) => {
    defaults[model.model] = {
      modelId: model.subModel[0]?.name || "",
    };
  });
  return defaults;
};

// ✅ Add messages and setMessages to context
export const AiSelectedModelContext = createContext({
  aiSelectedModels: {},
  setAiSelectedModels: () => {},
  messages: {},
  setMessages: () => {},
});

export const AiSelectedModelProvider = ({ children }) => {
  const [aiSelectedModels, setAiSelectedModels] = useState(getDefaultSelectedModels());
  const [messages, setMessages] = useState({}); // ✅ Add this

  return (
    <AiSelectedModelContext.Provider
      value={{
        aiSelectedModels,
        setAiSelectedModels,
        messages,
        setMessages, // ✅ Provide it here
      }}
    >
      {children}
    </AiSelectedModelContext.Provider>
  );
};
