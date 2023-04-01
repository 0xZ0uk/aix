import Card from "~/components/Card";
import Header from "~/components/Header";
import Hero from "~/components/Hero";
import Layout from "~/components/Layout";
import { storeItems } from "~/utils/mock";

export default function Web() {
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
