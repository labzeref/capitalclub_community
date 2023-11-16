import { toast, ToastContainer } from "react-toastify";

const ReactToast = (status, message ,title='' ) => {
    toast[status](
        <div>
          <p className="fw-medium fs-medium">{title}</p>
          <p className="fw-medium fs-small">{message}</p>
        </div>,
        {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );

};

export default ReactToast;
