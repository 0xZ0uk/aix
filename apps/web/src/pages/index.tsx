import React from "react";
import Card from "~/components/Card";
import Header from "~/components/Header";
import Hero from "~/components/Hero";
import Layout from "~/components/Layout";
import { useToast } from "~/hooks/use-toast";
import { debugObject } from "~/utils/debug";
import { Action, useActionsQueue } from "~/utils/stores/actions";
import { useConversationStore } from "~/utils/stores/conversation";
import { useShop } from "~/utils/stores/shop";

export default function Web() {
  const { messages } = useConversationStore();
  const { queue, onPushToQueue, onClearAction } = useActionsQueue();
  const { items, filterItems, resetItems } = useShop();

  const { toast } = useToast();

  React.useEffect(() => {
    const len = queue.length;
    const action = queue[len - 1];

    console.log(action);

    if (len > 0) {
      toast({
        title: `DEBUG::${action?.name}`,
        description: !!action?.parameters && debugObject(action?.parameters),
        variant: "success",
      });

      console.log("params::", action?.parameters);

      queue.map((action: Action) => {
        switch (action.name) {
          case "GET_ITEMS":
            resetItems();
            onClearAction("GET_ITEMS");
            break;
          case "GET_ITEMS_WITH_FILTER":
            filterItems(action?.parameters);
            onClearAction("GET_ITEMS_WITH_FILTER");
            break;
          default:
            break;
        }
      });
    }
  }, [queue]);

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
        {items.map((item) => {
          return <Card {...item} />;
        })}
      </div>
    </Layout>
  );
}
