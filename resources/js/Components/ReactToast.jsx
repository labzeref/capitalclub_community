import { toast, ToastContainer } from "react-toastify";
import React from "react";

const ReactToast = (status, message, title = '') => {
  toast[status](
    <div>
      <p className="fw-semibold choice-text ">{title}</p>
      <p className="fw-regular choice-text">
        <div
          dangerouslySetInnerHTML={{ __html: message }}
        />
      </p>

    </div>,
    {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    }
  );

};

export default ReactToast;
