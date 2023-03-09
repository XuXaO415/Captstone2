import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import UrGuideApi from "../api";
import UserContext from "../context/UserContext";
import { Card } from "react-bootstrap";

/** Match Detail page
 *
 * Renders a potential match's profile
 *
 * Routed at users/username/matches/:user_id
 *
 * Routes -> MatchDetail -> MatchList
 */

function MatchDetail() {
  const { user_id } = useParams();
  const { currentUser } = useContext(UserContext);
  const [matchInfo, setMatchInfo] = useState(null);

  console.debug(
    "MatchDetail=",
    "matchInfo=",
    "currentUser=",
    currentUser,
    "user_id=",
    user_id
  );

  useEffect(
    function getPotentialUserMatches() {
      async function getPotentialMatches() {
        let matchInfo = await UrGuideApi.getPotentialMatches(
          currentUser.username,
          user_id
        );
        console.debug(
          "MatchDetail useEffect getPotentialMatches",
          "matchInfo=",
          matchInfo
        );
      }
      getPotentialMatches();
    },
    [user_id, currentUser.username]
  );

  /** Get user match info */

  // function getMatchInfo() {
  //   async function getMatchInfo() {
  //     let MatchCard = await UrGuideApi.getMatchInfo(user_id);
  //     console.debug("MatchDetail useEffect getMatchInfo", "setMatchInfo=");
  //   }
  //   getMatchInfo();
  // }

  if (!matchInfo) return <p>Loading...</p>;

  return (
    <div className="MatchDetail">
      <Card>
        <Card.Header>Hello!!!!</Card.Header>
        <h3 className="text-center">
          <Link to={`/users/${currentUser.username}/matches`}>
            Back to Matches
          </Link>

          {/* Hey {currentUser.username}, you matched with: {matchInfo.username} */}
        </h3>
        {/* <Card.Link href={`/users/matches/user/${matchInfo.user_id}`} />

        <Card.Img variant="top" src={matchInfo.image_url} /> */}
        {/* <Card.Body>
          <Card.Title>
            {matchInfo.first_name} {matchInfo.last_name}
          </Card.Title>
          <Card.Text>
            <strong>City:</strong> {matchInfo.city}
          </Card.Text>
          <Card.Text>
            <Card.Text>
              <strong>State:</strong> {matchInfo.state}
            </Card.Text>
            <strong>Country:</strong> {matchInfo.country}
          </Card.Text>
          <Card.Text>
            <strong>Zip Code:</strong> {matchInfo.zipCode}
          </Card.Text>
          <Card.Text>
            <strong>Hobbies:</strong> {matchInfo.hobbies}
          </Card.Text>
          <Card.Text>
            <strong>Interests:</strong> {matchInfo.interests}
          </Card.Text>
        </Card.Body> */}
      </Card>
    </div>
  );
}

export default MatchDetail;
