import { RotatingLines } from "react-loader-spinner";

function Loader() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <RotatingLines
        visible={true}
        height="96"
        width="96"
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
      />
    </div>
  );
}

export default Loader;
