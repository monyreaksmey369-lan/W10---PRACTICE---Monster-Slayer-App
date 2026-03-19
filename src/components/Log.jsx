import React from "react";

function Log({ log }) {
  return (
    <>
      <section id="log" className="container">
        <h2>Battle Log</h2>
        <ul>
          {log?.map((list, i) => (
            <li key={i}>
              <span className={list.isPlayer ? "log--player" : "log--monster"}>
                {list.isPlayer ? "Player" : "Monster"}
              </span>

              <span>
                {list.isDamage ? "damage" : "health"}
                <span className={list.isDamage ? "log--damage" : "log--heal"}>
                  {list.value} 12
                </span>
              </span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export default Log;