import React from 'react'

const Loader = () => {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "auto", height: "100vh" }}>
        <span
              className="spinner-border spinner-border-lm"
              role="status"
              aria-hidden="true"
            >
            </span>
        </div>
  )
}

export default Loader