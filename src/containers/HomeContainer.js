import React from "react";
import { Link } from "@reach/router";

const HomeContainer = () => (
  <div>
    <p>
      <span role="img" aria-label="home">
        🏠
      </span>{" "}
      This is the home page.
    </p>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/regular">Regular loading/render</Link>
      </li>
    </ul>
  </div>
);

export default HomeContainer;
