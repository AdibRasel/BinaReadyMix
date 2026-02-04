
function NotFound() {
  return (
    <div
      className="d-flex align-items-center justify-content-center text-center"
      style={{
        height: "100vh",
        backgroundColor: "#f8f9fa",
        padding: "20px",
      }}
    >
      <div>
        <h1
          className="display-1 text-danger fw-bold"
          style={{ fontSize: "7rem" }}
        >
          404
        </h1>
        <h2 className="mb-3">Oops! Page Not Found</h2>
        <p className="text-muted mb-4">
          The page you're looking for doesn't exist or you don't have access to it.
        </p>
        
      </div>
    </div>
  );
}

export default NotFound;
