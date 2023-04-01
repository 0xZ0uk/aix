import "../styles/globals.css";
import type { AppType } from "next/app";
import { Poppins } from "next/font/google";
import { cn } from "@aix/ui/src/Utils";
import { AIXProvider } from "@aix/ui";

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const App: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <AIXProvider
      apiKey={process.env.NEXT_PUBLIC_OPENAI_KEY || ""}
      organization={"org-RzcMAmr34nzpyF4NoVkWj9xF"}
    >
      <div className={cn("font-sans", poppins.variable)}>
        <Component {...pageProps} />
      </div>
    </AIXProvider>
  );
};

export default App;
