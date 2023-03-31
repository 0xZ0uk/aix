import "../styles/globals.css";
import type { AppType } from "next/app";
import { Poppins } from "next/font/google";
import { cn } from "@aix/ui/src/Utils";

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const App: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <div className={cn("font-sans", poppins.variable)}>
      <Component {...pageProps} />
    </div>
  );
};

export default App;
