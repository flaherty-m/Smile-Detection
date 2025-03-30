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
    <div className="card" style={{ maxWidth: "750px", margin: "0 auto" }}>
      <div className="card-header text-center">Found Smile</div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-6 d-flex align-items-center justify-content-center">
            <img
              src={image}
              alt="Detected Smile"
              className="img-fluid"
              style={{ maxWidth: "100%" }}
            />
          </div>
          <div className="col-md-6">
            <h5 className="text-center">Smile Coordinates</h5>
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
      </div>
    </div>
  );
};

export default SmileViewer;
