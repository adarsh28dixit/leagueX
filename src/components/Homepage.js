import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
//import axios from "axios";
import { PlayerContext } from "../context/Playercontext";

export default function Homepage() {
  const navigate = useNavigate();
  const { setList } = useContext(PlayerContext);

  const [apiData, setApiData] = useState([]);
  const [batsman, setBatsman] = useState([]);
  const [bowler, setBowlers] = useState([]);
  const [keeper, setKeeper] = useState([]);
  const [allRounder, setAllRounder] = useState([]);

  const [totalPlayers, setTotalPlayers] = useState(0);
  const [crLeft, setCrLeft] = useState(100);
  const [melbournePlayer, setMelbournePlayer] = useState(0);
  const [perthPlayer, setPerthPlayer] = useState(0);

  const [teamPlayer, setTeamPlayer] = useState([
    // { id: "", name: "", cr: "", role: "", teamName: "" },
  ]);

  const [bat, setBat] = useState(0);
  const [bowl, setBowl] = useState(0);
  const [keep, setKeep] = useState(0);
  const [allRoun, setAllRoun] = useState(0);

  const [selected, setSelected] = useState([]);

  useEffect(() => {
    fetch(
      "https://leaguex.s3.ap-south-1.amazonaws.com/task/fantasy-sports/Get_All_Players_of_match.json"
    )
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        setApiData(data);
        setBatsman(data.filter((a) => a.role === "Batsman"));
        setBowlers(data.filter((a) => a.role === "Bowler"));
        setKeeper(data.filter((a) => a.role === "Wicket-Keeper"));
        setAllRounder(data.filter((a) => a.role === "All-Rounder"));
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const countPlayer = (
    playerId,
    playerName,
    playerCr,
    playerRole,
    playerTeam
  ) => {
    //console.log(point)

    if (totalPlayers < 11) {
      setSelected([...selected, playerId]);
      if (melbournePlayer <= 7 && perthPlayer <= 7) {
        if (playerTeam === "Melbourne Stars") {
          if (melbournePlayer < 7) {
            if (crLeft >= Number(playerCr)) {
              setMelbournePlayer(melbournePlayer + 1);
              setTotalPlayers(totalPlayers + 1);
              setTeamPlayer([
                ...teamPlayer,
                {
                  id: playerId,
                  name: playerName,
                  cr: playerCr,
                  role: playerRole,
                  teamName: playerTeam,
                },
              ]);
              parseFloat(setCrLeft(crLeft - Number(playerCr)));

              if (playerRole === "Batsman") {
                setBat(bat + 1);
              } else if (playerRole === "Bowler") {
                setBowl(bowl + 1);
              } else if (playerRole === "Wicket-Keeper") {
                setKeep(keep + 1);
              } else {
                setAllRoun(allRoun + 1);
              }
            } else {
              alert("No more credit left");
            }
          } else {
            alert("Only 7 players can be from one team");
          }
        } else {
          if (perthPlayer < 7) {
            if (crLeft >= Number(playerCr)) {
              setPerthPlayer(perthPlayer + 1);
              setTotalPlayers(totalPlayers + 1);
              setTeamPlayer([
                ...teamPlayer,
                {
                  id: playerId,
                  name: playerName,
                  cr: playerCr,
                  role: playerRole,
                  teamName: playerTeam,
                },
              ]);
              parseFloat(setCrLeft(crLeft - Number(playerCr)));
              if (playerRole === "Batsman") {
                setBat(bat + 1);
              } else if (playerRole === "Bowler") {
                setBowl(bowl + 1);
              } else if (playerRole === "Wicket-Keeper") {
                setKeep(keep + 1);
              } else {
                setAllRoun(allRoun + 1);
              }
            } else {
              alert("No more credit left");
            }
          } else {
            alert("Only 7 players can be from one team");
          }
        }
      } else {
        alert("Only 7 players can be from one team");
      }
    } else {
      alert("Players reaches to maximum limit");
    }
  };

  const handleProceed = () => {
    if (bat <= 2) {
      alert("Min 3 and max 7 batsman required");
    } else if (bat > 7) {
      alert("Min 3 and max 7 batsman required");
    } else if (bowl <= 2) {
      alert("Min 3 and max 7 bowlers required");
    } else if (bowl >= 8) {
      alert("Min 3 and max 7 bowlers required");
    } else if (keep < 1) {
      alert("Min 1 and max 5 wicket-keepers required");
    } else if (keep > 5) {
      alert("Min 1 and max 5 wicket-keepers required");
    } else if (allRoun > 4) {
      alert(" max 5 all-rounders required");
    } else {
      setList(teamPlayer);
      navigate("/finalpage");
    }
  };

  // console.log("bat", bat);
  // console.log("bowl", bowl);
  // console.log("keep", keep);
  // console.log("allRoun", allRoun);
  return (
    <div className="homepage">
      <div className="header">
        <h3>Pick Players</h3>
        <div className="score-card">
          <div className="card1">
            <span>{totalPlayers}/11</span>
            <span>Players</span>
          </div>
          <div className="card1">
            <span>{melbournePlayer}</span>
            <span>Melbourne Stars</span>
          </div>
          <div className="card1">
            <span>{perthPlayer}</span>
            <span>Perth Sochers</span>
          </div>
          <div className="card1">
            <span>{`${crLeft}`}</span>
            <span>Cr left</span>
          </div>
        </div>
      </div>

      {/* batsman section */}
      <div className="row1">
        <div className="batsman">
          <h3>Pick 3-7 Batsman</h3>
          {batsman.map((i) => {
            return (
              <div
                className="players"
                key={i.id}
                onClick={(e) =>
                  countPlayer(
                    `${i.id}`,
                    `${i.short_name}`,
                    `${i.event_player_credit}`,
                    `${i.role}`,
                    `${i.team_name}`
                  )
                }
                style={{
                  backgroundColor: selected.includes(`${i.id}`)
                    ? "yellow"
                    : "white",
                }}
              >
                <div className="credits">
                  <strong>{i.short_name}</strong>
                  <div>{i.team_name}</div>
                </div>

                <div className="credits">
                  <span>credit</span>
                  <span>{i.event_player_credit}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* bowler section */}
        <div className="bowler">
          <h3>Pick 3-7 Bowlers</h3>
          {bowler.map((i) => {
            return (
              <div
                className="players"
                key={i.id}
                onClick={(e) =>
                  countPlayer(
                    `${i.id}`,
                    `${i.short_name}`,
                    `${i.event_player_credit}`,
                    `${i.role}`,
                    `${i.team_name}`
                  )
                }
                style={{
                  backgroundColor: selected.includes(`${i.id}`)
                    ? "yellow"
                    : "white",
                }}
              >
                <div className="credits">
                  <strong>{i.short_name}</strong>
                  <div>{i.team_name}</div>
                </div>
                <div className="credits">
                  <span>credit</span>
                  <span>{i.event_player_credit}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="row2">
        {/* all rounder section */}
        <div className="all-rounder">
          <h3>Pick 0-4 All Rounders</h3>
          {allRounder.map((i) => {
            return (
              <div
                className="players"
                key={i.id}
                onClick={(e) =>
                  countPlayer(
                    `${i.id}`,
                    `${i.short_name}`,
                    `${i.event_player_credit}`,
                    `${i.role}`,
                    `${i.team_name}`
                  )
                }
                style={{
                  backgroundColor: selected.includes(`${i.id}`)
                    ? "yellow"
                    : "white",
                }}
              >
                <div className="credits">
                  <strong>{i.short_name}</strong>
                  <div>{i.team_name}</div>
                </div>
                <div className="credits">
                  <span>credit</span>
                  <span>{i.event_player_credit}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* wicket keeper section */}
        <div className="wicket-keeper">
          <h3>Pick 1-5 Wicket Keepers</h3>
          {keeper.map((i) => {
            return (
              <div
                className="players"
                key={i.id}
                onClick={(e) =>
                  countPlayer(
                    `${i.id}`,
                    `${i.short_name}`,
                    `${i.event_player_credit}`,
                    `${i.role}`,
                    `${i.team_name}`
                  )
                }
                style={{
                  backgroundColor: selected.includes(`${i.id}`)
                    ? "yellow"
                    : "white",
                }}
              >
                <div className="credits">
                  <strong>{i.short_name}</strong>
                  <div>{i.team_name}</div>
                </div>
                <div className="credits">
                  <span>credit</span>
                  <span>{i.event_player_credit}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="proceed-btn">
        <button type="submit" onClick={handleProceed} className="button">
          {" "}
          Proceed
        </button>
      </div>
    </div>
  );
}
