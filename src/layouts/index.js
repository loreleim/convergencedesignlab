import "typeface-open-sans";
import "typeface-montserrat";
import "../style/global/index.scss";
import "objectFitPolyfill";

import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

import Nav from "../components/nav";
import Footer from "../components/footer/";
import style from "./index.module.scss";

export default function TemplateWrapper({ children, location }) {
  // Gatsby's HTML rendering doesn't use the pathPrefix so we need to check the real URL (which has
  // the pathPrefix) and the URL without the pathPrefix
  const isHomePage =
    location.pathname === `${process.env.GATSBY_BASEURL}/` || location.pathname === "/";

  return (
    <div>
      <Helmet
        title="Convergence Design Lab"
        meta={[
          { name: "description", content: "Convergence Design Lab" },
          { name: "keywords", content: "" }
        ]}
      />
      <Nav isHomePage={isHomePage} />
      <div className={isHomePage ? "" : style.navPadding}>{children()}</div>
      <Footer />
    </div>
  );
}

TemplateWrapper.propTypes = {
  children: PropTypes.func
};
