import { parseGPTJSON } from "@aix/ui/src/Utils";
import React from "react";
import Card from "~/components/Card";
import Header from "~/components/Header";
import Hero from "~/components/Hero";
import Layout from "~/components/Layout";
import { useToast } from "~/hooks/use-toast";
import { debugObject } from "~/utils/debug";
import { storeItems } from "~/utils/mock";
import { useConversationStore } from "~/utils/stores/conversation";

export default function Web() {
  const { messages } = useConversationStore();
  const [actionQueue, setActionQueue] = React.useState<any[]>([]);

  const { toast } = useToast();

  React.useEffect(() => {
    const lastMessage = messages[messages.length - 1];

    if (lastMessage?.action) {
      setActionQueue([...actionQueue, lastMessage?.action]);
    }
  }, [messages]);

  React.useEffect(() => {
    const len = actionQueue.length;

    if (len > 0) {
      toast({
        title: `DEBUG::${actionQueue[len - 1].name}`,
        description: debugObject(actionQueue[len - 1].parameters),
        variant: "success",
      });
    }
  }, [actionQueue]);

  return (
    <Layout className="p-8">
      <Header
        menu={[
          { label: "Home", url: "/" },
          { label: "Shop", url: "/shop" },
          { label: "About", url: "/about" },
          { label: "Support", url: "/support" },
        ]}
      />
      <Hero>
        <div className="text-4xl font-bold">AIX Hero</div>
      </Hero>
      <div className="grid grid-cols-4 gap-4">
        {storeItems.map((item) => {
          return <Card {...item} />;
        })}
      </div>
    </Layout>
  );
}
