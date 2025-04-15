import React, { useEffect } from 'react'

import ReactDOM from 'react-dom'

export const ConfirmationModal = ({ isOpen, onClose }) => {

    useEffect(() => {
        console.log('Lol')
    }, [])
  if (!isOpen) return null

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg p-6 max-w-md shadow-xl text-center">
        <h2 className="text-xl font-semibold mb-2">Tracking Setup Complete 🎉</h2>
        <p className="text-gray-700 text-base">
          You should receive an email shortly. If you don’t see it, check your spam folder.
        </p>
        <button
          className="mt-4 px-4 py-2 bg-ucla-blue text-white rounded hover:bg-blue-700"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>,
    document.body
  )
}
