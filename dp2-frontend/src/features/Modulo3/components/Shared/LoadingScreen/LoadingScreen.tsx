
const LoadingScreen = () => {
  return (
    <div className="vertical-align-parent"
      style={{ height: "calc(100vh - 4rem)" }}>
      <div className="vertical-align-child">
        <div className="spinner-border"
          role="status"
          style={{ display: "block", marginLeft: "auto", marginRight: "auto" }}>
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;