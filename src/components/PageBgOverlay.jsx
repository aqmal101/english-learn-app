const PageBgOverlay = ({ className }) => {
  return (
    <div
      className={`fixed inset-0 z-10 bg-white opacity-50 m-20 ${className}`}
    ></div>
  );
};

export default PageBgOverlay;
