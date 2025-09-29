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

export const AiSelectedModelContext = createContext({
  aiSelectedModels: {},
  setAiSelectedModels: () => {},
});

export const AiSelectedModelProvider = ({ children }) => {
  const [aiSelectedModels, setAiSelectedModels] = useState(getDefaultSelectedModels());

  return (
    <AiSelectedModelContext.Provider value={{ aiSelectedModels, setAiSelectedModels }}>
      {children}
    </AiSelectedModelContext.Provider>
  );
};