import ReactDOM from "react-dom"
import PropagateLoader from "react-spinners/PropagateLoader"

export const Loader = ({ text, loading }) => {
  if (!loading) return null;

  return ReactDOM.createPortal(
    <div className="fixed top-0 left-0 w-screen h-screen z-50 bg-black opacity-65 flex items-center justify-center">
      <div className="text-center relative bottom-10 w-3/5">
        <PropagateLoader
          color="white"
          loading={loading}
          size={30}
          aria-label="Loading Spinner"
          speedMultiplier={0.8}
        />
        <p className="mt-20 text-2xl font-medium text-white tracking-wider">
          {text}
        </p>
      </div>
    </div>,
    document.body
  )
}
