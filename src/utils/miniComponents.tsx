export function LoadingCircle() {
  return <div className="loading-circle"></div>;
}
export function ErrorDisplay({ error }: any) {
  return (
    <div className="error">
      <p className="error-status">{error.errorStatus}</p>
      <p>
        Nothing found for: <br />
        {error.arg}
      </p>
    </div>
  );
}
