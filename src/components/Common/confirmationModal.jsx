import React from "react";
import IconBtn from "./IconBtn";

function ConfirmationModal({ modalData }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <p className="text-lg font-semibold mb-2">{modalData.text1}</p>
        <p className="text-sm text-gray-600 mb-4">{modalData.text2}</p>
        <div className="flex justify-end gap-4">
          <IconBtn
            onClick={() => {
              modalData?.btn1Handler?.();
            }}
            text={modalData?.btn1Text}
          />
          <button
            onClick={() => {
              console.log("Logout canceled");
              modalData?.btn2Handler?.();
            }}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            {modalData?.btn2Text}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
