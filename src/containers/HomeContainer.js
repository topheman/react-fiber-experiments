import React from "react";
import { Link } from "@reach/router";

const HomeContainer = () => (
  <div>
    <p>
      <span role="img" aria-label="home">
        🏠
      </span>{" "}
      Welcome
    </p>
    <ol>
      <li>
        <Link to="/regular">Regular loading/render</Link>
      </li>
    </ol>
  </div>
);

export default HomeContainer;
