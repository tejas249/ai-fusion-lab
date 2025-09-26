"use client"
import { useState } from "react";
import AIModelList from "@/shared/AIModelList";
import Image from "next/image";
import React from "react";
import { Switch } from "@/components/ui/switch"
import { Lock } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";


const AIMultiModel = () => {
  const [aiModelList, setAIModelList] = useState(AIModelList);  

  const onToggleChange = (model, value) => {
    setAIModelList((prev) =>
      prev.map((m) =>
        m.model === model ? { ...m, enable: value } : m
      )
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
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={model.subModel[0].name} />
                  </SelectTrigger>
                  <SelectContent>
                    {model.subModel.map((subModel) => (
                      <SelectItem key={subModel.name} value={subModel.name}>
                        {subModel.name}
                      </SelectItem>
                    ))}
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
          
          {model.premium&&model.enable&&<div className="flex items-center justify-center mt-5">
            <Button> <Lock/> Upgrade To Unlock</Button>
          </div>
         }
        </div>
      ))}
    </div>
  );
};

export default AIMultiModel;
