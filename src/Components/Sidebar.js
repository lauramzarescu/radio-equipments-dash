import React from "react";
import "../styles/Sidebar.css"

export const Sidebar = ({ width, height, children }) => {

    return (
        <>
          <div className="side-bar" style={{ width: width, minHeight: height, backgroundColor:'#254053'}}>
              <React.Fragment>{children}</React.Fragment>
          </div>
        </>
    );
};