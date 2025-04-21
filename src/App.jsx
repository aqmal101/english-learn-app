import AppRoutes from "./routes/AppRoutes";
// import Navbar from "./components/Navbar";
import Layout from "./components/Layout";

const App = () => {
  return (
    <>
      <main className="font-fredoka">
        <Layout>
          {/* <Navbar /> */}
          <div>
            <AppRoutes />
          </div>
        </Layout>
      </main>
    </>
  );
};

export default App;
