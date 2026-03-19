import React from "react";

function Entity({enName,per}) {
    return<>
    <section className="container">
      <h2>{enName}</h2>
      <div className="healthbar">
        <div style={{width: `${per}%`}} className="healthbar__value"></div>
      </div>
    </section>
    </>;
}
export default Entity;