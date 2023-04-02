import {
  Configuration,
  CreateChatCompletionResponse,
  CreateChatCompletionResponseChoicesInner,
  CreateCompletionResponseUsage,
  OpenAIApi,
} from "openai";
import type { ChatCompletionRequestMessage } from "openai";
import { createContext, useContext } from "react";
import { type AxiosResponse } from "axios";

type AIXGlobalContext = {
  organization: string;
  apiKey: string;
  onChatCompletion: (
    msgs: ChatCompletionRequestMessage[]
  ) => Promise<AxiosResponse<CreateChatCompletionResponse, any>>;
};

const AIXContext = createContext<AIXGlobalContext>({
  organization: "",
  apiKey: "",
  onChatCompletion: (msgs: ChatCompletionRequestMessage[]) => {
    // Return a dummy Promise that resolves to a default value
    return Promise.resolve({
      data: {
        id: "",
        object: "",
        created: 0,
        model: "",
        choices: [] as Array<CreateChatCompletionResponseChoicesInner>,
        usage: {} as CreateCompletionResponseUsage,
      },
      status: 200,
      statusText: "OK",
      headers: {},
      config: {},
    });
  },
});

export const useAIXContext = () => useContext(AIXContext);

interface AIXProviderProps {
  apiKey: string;
  children: React.ReactElement;
  organization: string;
}

export const AIXProvider: React.FC<AIXProviderProps> = ({
  apiKey,
  children,
  organization,
}) => {
  const configuration = new Configuration({
    organization,
    apiKey,
  });

  const openai = new OpenAIApi(configuration);

  const handleChatCompletion: any = async (
    messages: ChatCompletionRequestMessage[]
  ) =>
    await openai.createChatCompletion({
      messages,
      model: "gpt-3.5-turbo",
    });

  return (
    <AIXContext.Provider
      value={{ apiKey, organization, onChatCompletion: handleChatCompletion }}
    >
      {children}
    </AIXContext.Provider>
  );
};
