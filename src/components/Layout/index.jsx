import Settings from "../Setting";

const Layout = ({ children }) => {
  return (
    <div className="w-screen h-screen">
      {children}
      <Settings />
    </div>
  );
};

export default Layout;
