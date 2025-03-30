import React from "react";
import { SmileCoordinates } from "./types";

interface Props {
  image?: string;
  coords?: SmileCoordinates[];
}

const SmileViewer: React.FC<Props> = ({ image, coords }) => {
  // Hide the component if no smile is detected
  if (!image || !coords || coords.length === 0) return null;

  return (
    <div className="card" style={{ maxWidth: "350px", margin: "0 auto" }}>
      <div className="card-header text-center">
        Found Smile
      </div>
      <div className="card-body">
        <img
          src={image}
          alt="Detected Smile"
          className="img-fluid mb-3"
          style={{ display: "block", margin: "0 auto" }}
        />
        <h5 className="card-title text-center">Smile Coordinates</h5>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr className="text-center">
                <th>Property</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {coords.map((coord, index) => (
                <React.Fragment key={index}>
                  <tr className="text-center">
                    <td>h</td>
                    <td>{coord.h}</td>
                  </tr>
                  <tr className="text-center">
                    <td>w</td>
                    <td>{coord.w}</td>
                  </tr>
                  <tr className="text-center">
                    <td>x</td>
                    <td>{coord.x}</td>
                  </tr>
                  <tr className="text-center">
                    <td>y</td>
                    <td>{coord.y}</td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SmileViewer;
