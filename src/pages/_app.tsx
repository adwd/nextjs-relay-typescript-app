import { RelayEnvironmentProvider } from "react-relay/hooks";
import { useEnvironment } from "../lib/relay";

export default function App({ Component, pageProps }) {
  const environment = useEnvironment(pageProps.initialRecords);

  return (
    <RelayEnvironmentProvider environment={environment}>
      <Component {...pageProps} />
    </RelayEnvironmentProvider>
  );
}
