"use client";
import React, { useContext, useState } from "react";
import AIModelList from "@/shared/AIModelList";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import { Lock } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SelectLabel } from "@radix-ui/react-select";
import { AiSelectedModelContext } from "@/context/AiSelectedModelContext";
import { db } from "@/config/FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";

const AIMultiModel = () => {
  const [aiModelList, setAIModelList] = useState(AIModelList);
  const { messages, aiSelectedModels, setAiSelectedModels, setMessages } =
    useContext(AiSelectedModelContext);

  // Update selected model in context and Firebase
  const handleModelChange = async (model, value) => {
    setAiSelectedModels((prev) => ({
      ...prev,
      [model.model]: {
        ...prev[model.model],
        modelId: value,
      },
    }));

    // Save to Firestore (replace 'userId' with actual user id if available)
    try {
      await setDoc(
        doc(db, "selectedModels", model.model),
        { modelId: value },
        { merge: true }
      );
    } catch (error) {
      console.error("Error updating model in Firebase:", error);
    }
  };

  const onToggleChange = (model, value) => {
    setAIModelList((prev) =>
      prev.map((m) => (m.model === model ? { ...m, enable: value } : m))
    );
  };

  return (
    <div className="flex flex-1 h-[75vh] border-b">
      {aiModelList.map((model) => (
        <div
          className={`flex flex-col border-r h-full border-b'
            ${model.enable ? "flex-1 min-w-[400px]" : "w-[100px] flex-none"}
            `}
          key={model.model}
        >
          <div className="flex w-full h-[50px] items-center justify-between border-b p-4">
            <div className="flex items-center gap-4">
              <Image
                src={model.icon}
                alt={model.model}
                width={24}
                height={24}
              />

              {model.enable && (
                <Select
                  value={
                    aiSelectedModels[model.model]?.modelId ||
                    model.subModel[0]?.name
                  }
                  onValueChange={(value) => handleModelChange(model, value)}
                  disabled={model.premium}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue>
                      {aiSelectedModels[model.model]?.modelId ||
                        model.subModel[0]?.name}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup className="px-3">
                      <SelectLabel>Free</SelectLabel>
                      {model.subModel.map(
                        (subModel) =>
                          !subModel.premium && (
                            <SelectItem
                              key={subModel.name}
                              value={subModel.name}
                            >
                              {subModel.name}
                            </SelectItem>
                          )
                      )}
                    </SelectGroup>
                    <SelectGroup className="px-3">
                      <SelectLabel>Premium</SelectLabel>
                      {model.subModel.map(
                        (subModel) =>
                          subModel.premium && (
                            <SelectItem
                              key={subModel.name}
                              value={subModel.name}
                              disabled={subModel.premium}
                            >
                              {subModel.name}{" "}
                              {subModel.premium && (
                                <Lock className="inline-block size-4 ml-2 text-gray-400" />
                              )}
                            </SelectItem>
                          )
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            </div>
            <div>
              {model.enable ? (
                <Switch
                  checked={model.enable}
                  onCheckedChange={(v) => onToggleChange(model.model, v)}
                />
              ) : (
                <MessageSquare
                  onClick={() => onToggleChange(model.model, true)}
                  className="text-gray-400 cursor-pointer"
                />
              )}
            </div>
          </div>
          {model.premium && model.enable && (
            <div className="flex items-center justify-center mt-5">
              <Button>
                <Lock /> Upgrade To Unlock
              </Button>
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {Array.isArray(messages?.[model.model]) && messages[model.model].length > 0 ? (
              messages[model.model].map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[90%] whitespace-pre-wrap break-words p-3 rounded-lg shadow-sm ${
                      m.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    {m.role === 'assistant' && (
                      <div className="text-[10px] opacity-70 mb-1">
                        {m.model ?? model.model}
                      </div>
                    )}
                    <div className="text-sm leading-relaxed">{m.content}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-sm text-muted-foreground italic">No messages for {model.model}</div>
            )}
          </div>

        </div>
      ))}
    </div>
  );
};

export default AIMultiModel;
