import React from "react";
import "./Footer.css";
const Footer = () => {
  return (
    <div className="layout-footer">
      <div className="footer sonary-container">
        <div className="links-wrapper">
          <div className="links-container menu-links">
            <div className="menu-links-title">Menu Links</div>

            <a className="text" href="https://sonary.com/about/">
              About Us
            </a>

            <a className="text" href="https://sonary.com/b/">
              Partners
            </a>

            <a className="text" href="https://sonary.com/contact-us/">
              Contact Us
            </a>
          </div>
          <div className="links-container quick-links">
            <div className="quick-links-title">Quick Links</div>
            <a className="text" href="https://sonary.com/terms-of-use/">
              Terms of Use
            </a>

            <a className="text" href="https://sonary.com/privacy-policy/">
              Privacy Policy
            </a>

            <a className="text" href="https://sonary.com/how-we-rate/">
              How We Rate
            </a>

            <a className="text" href="https://sonary.com/ccpa-privacy-notice/">
              CCPA Privacy Notice
            </a>

            <a className="text cookie_settings">Cookie Settings</a>
          </div>
        </div>
        <div className="right-text">
          <div className="title-logos">
            <div className="big-logo">
              <img
                alt="Sonary-logo"
                loading="lazy"
                width="295"
                height="46"
                decoding="async"
                data-nimg="1"
                src="https://sonary.com/img/icons/Logo_White.svg"
                style={{ color: "transparent" }}
              />
            </div>
            <div className="logos">
              <a href="https://www.linkedin.com/company/sonary-com/">
                <img
                  alt="linkedin"
                  loading="lazy"
                  width="32"
                  height="32"
                  decoding="async"
                  data-nimg="1"
                  src="https://sonary.com/img/icons/Social/linkedin-icon-black.svg"
                  style={{ color: "transparent" }}
                />
              </a>
              <a href="https://www.facebook.com/sonarydotcom">
                <img
                  alt="facebook"
                  loading="lazy"
                  width="32"
                  height="32"
                  decoding="async"
                  data-nimg="1"
                  src="https://sonary.com/img/icons/Social/facebook-icon-black.svg"
                  style={{ color: "transparent" }}
                />
              </a>
              <a href="https://twitter.com/sonarydotcom">
                <img
                  alt="twitter"
                  loading="lazy"
                  width="32"
                  height="32"
                  decoding="async"
                  data-nimg="1"
                  src="https://sonary.com/img/icons/Social/twitter-icon-black.svg"
                  style={{ color: "transparent" }}
                />
              </a>
            </div>
          </div>
          <div className="footer-text">
            <p>

            This website is owned and operated by ryze beyond ltd. Reproduction
            of this website, in whole or in part, is strictly prohibited. This
            website is an informative comparison site that aims to offer its
            users find helpful information regarding the products and offers
            that will be suitable for their needs. We are able to maintain a
            free, high-quality service by receiving advertising fees from the
            brands and service providers we review on this website (though we
            may also review brands we are not engaged with). These advertising
            fees, combined with our criteria and methodology, such as the
            conversion rates, impact the placement and position of the brands
            within the comparison table. In the event rating or scoring are
            assigned by us, they are based on either the methodology we
            specifically explain herein, or, where no specific formula is
            presented - the position in the comparison table. We make the best
            efforts to keep the information up-to-date, however, an offer’s
            terms might change at any time. We do not compare or include all
            service providers, brands and offers available in the market.
            </p>
            <div className="right-reserved">All rights reserved © 2023</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
