import Layout from "./components/Layout";
import LoadingSpinner from "./components/LoadingSpinner";
import { Outlet, useNavigation } from "react-router-dom";

const App = () => {
  const navigation = useNavigation();
  const loading = navigation.state === "loading";
  return (
    <>
      <main className="font-fredoka">
        <Layout>
          <Outlet />
          <LoadingSpinner className="absolute" loading={loading} />
        </Layout>
      </main>
    </>
  );
};

export default App;
