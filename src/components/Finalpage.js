import React, { useContext, useState } from "react";
import { PlayerContext } from "../context/Playercontext";

export default function Finalpage() {
  const { list } = useContext(PlayerContext);

  console.log(list);

  return (
    <>
      <div className="player-list">
        <h3>Picked Players</h3>
        {list.map((i) => {
          return (
            <div className="player" key={i.id}>
              <div className="credits">
                <strong>{i.name}</strong>
                <div>{i.teamName}</div>
              </div>
              <div className="credits">
                <span>credit</span>
                <span>{i.cr}</span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
