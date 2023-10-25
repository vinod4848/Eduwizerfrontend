import Image from "react-bootstrap/Image";
import { useNavigate } from "react-router-dom";
import Logo from "../../Assests/Images/Footer-Logo.svg";
import Face from "../../Assests/Images/facebook.svg";
import Insta from "../../Assests/Images/instagram.svg";
import Linkedin from "../../Assests/Images/LinkedIn_icon_circle.svg";
// import Twitter from "../../Assests/Images/twitter.svg";
// import Youtube from "../../Assests/Images/youtube.svg";
import { useEffect, useState } from "react";
import "./Footer.css";

const Footer = () => {
  const navigate = useNavigate();

  const [width, setWidth] = useState(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;
  return (
    <footer>
      {isMobile ? (
        <>
          <div className="footer-container" style={{ marginBottom: "50px" }}>
            <div
              className="footer-links-container"
              style={
                isMobile
                  ? {
                      "grid-template-columns": "1fr ",
                      marginTop: 0,
                    }
                  : {}
              }
            >
              <div className="footer-links">
                <Image
                  src={Logo}
                  style={isMobile ? { height: "50%" } : {}}
                  className="footer-logo-icon"
                />
                <p className="footer-logo-text">
                  Millions of jobs. Search by what matters to you and find the
                  one that's right for you.
                </p>
              </div>
              <div className="footer-links" style={{ marginTop: "-35%" }}>
                <div className="footer-links-head">Quick Links</div>
                <div className="footer-links-content">
                  <a href="/infrastructure-search/financialLoanServices">Infrastructure</a>
                  <a onClick={() => navigate("/career-counselling/career")}>
                    Career Counselling
                  </a>
                  {/* <a href="/blog">Blog</a>
              <a href="/events">Events</a> */}
                </div>
              </div>
              <div className="footer-links">
                <div className="footer-links-head">Other Menus</div>
                <div className="footer-links-content">
                  <a onClick={() => navigate("/terms-conditions")}>
                    Terms And Conditions
                  </a>
                  {/* <a href="/terms-of-use">Terms Of Use</a>
              <a href="/privacy-policy">Privacy Policy</a> */}
                </div>
              </div>
              <div className="footer-links">
                <div className="footer-links-head">More</div>
                <div className="footer-links-content">
                  <a onClick={() => navigate("/contact-us")}>Contact Us</a>
                  <a onClick={() => navigate("/events")}>Events</a>
                  <a onClick={() => navigate("/blogs")}>Blogs</a>
                </div>
              </div>
              <div className="d-lg-none footer-links">
                <div className="footer-links-head">Follow Us</div>
                <div
                  className="footer-links-content social-links d-flex justify-content-center"
                  style={{ gap: "5px", paddingTop: "10px" }}
                >
                  <a
                    href="https://www.instagram.com/eduwizer_social_media_team_/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image src={Insta} width="100%" />
                    {/* <img className="social-icon" alt="" src="/instagram.svg" /> */}
                  </a>
                  <a
                    href="https://www.facebook.com/Eduwizer/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image src={Face} width="100%" />
                    {/* <img className="social-icon" alt="" src="/facebook.svg" /> */}
                  </a>
                  <a
                    href="https://www.linkedin.com/in/dr-nikkie-grover-37bb5521/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image
                      // src={'assets/images/svg/linkedin.svg'}
                      src={Linkedin}
                      width="32px"
                    />
                  </a>
                  {/* <a href="/youtube">
                <Image
                  src={Youtube}
                  width="100%"
                  style={{ position: "relative" }}
                />
              </a>
              <a href="/twitter">
                <Image
                  src={Twitter}
                  width="100%"
                  style={{ position: "relative" }}
                />
              </a> */}
                </div>
              </div>
            </div>
          </div>
          <div
            className="footer-cin-number"
            // style={{ position: "fixed", bottom: 0 }}
          >
            CIN Number - U74999MH2018PTC309935
          </div>
        </>
      ) : (
        <>
          <div className="footer-container">
            <div
              className="footer-logo"
              style={isMobile ? { marginBottom: "-30%" } : {}}
            >
              <Image
                src={Logo}
                style={isMobile ? { height: "20%" } : {}}
                className="footer-logo-icon"
              />
              <p className="footer-logo-text">
                Millions of jobs. Search by what matters to you and find the one
                that's right for you.
              </p>
            </div>
            <div
              className="footer-links-container"
              style={
                isMobile
                  ? {
                      "grid-template-columns": "1fr ",
                      marginTop: 0,
                    }
                  : {}
              }
            >
              <div className="footer-links">
                <div className="footer-links-head">Quick Links</div>
                <div className="footer-links-content">
                  <a href="/infrastructure-search/financialLoanServices">Infrastructure</a>
                  <a onClick={() => navigate("/career-counselling/career")}>
                    Career Counselling
                  </a>
                  {/* <a href="/blog">Blog</a>
              <a href="/events">Events</a> */}
                </div>
              </div>
              <div className="footer-links">
                <div className="footer-links-head">Other Menus</div>
                <div className="footer-links-content">
                  <a onClick={() => navigate("/terms-conditions")}>
                    Terms And Conditions
                  </a>
                  {/* <a href="/terms-of-use">Terms Of Use</a>
              <a href="/privacy-policy">Privacy Policy</a> */}
                </div>
              </div>
              <div className="footer-links">
                <div className="footer-links-head">More</div>
                <div className="footer-links-content">
                  <a onClick={() => navigate("/contact-us")}>Contact Us</a>
                  <a onClick={() => navigate("/events")}>Events</a>
                  <a onClick={() => navigate("/blogs")}>Blogs</a>
                </div>
              </div>
              <div className="d-lg-none footer-links">
                <div className="footer-links-head">Follow Us</div>
                <div
                  className="footer-links-content social-links d-flex justify-content-center"
                  style={{ gap: "5px", paddingTop: "10px" }}
                >
                  <a
                    href="https://www.instagram.com/eduwizer_social_media_team_/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image src={Insta} width="100%" />
                    {/* <img className="social-icon" alt="" src="/instagram.svg" /> */}
                  </a>
                  <a
                    href="https://www.facebook.com/Eduwizer/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image src={Face} width="100%" />
                    {/* <img className="social-icon" alt="" src="/facebook.svg" /> */}
                  </a>
                  <a
                    href="https://www.linkedin.com/in/dr-nikkie-grover-37bb5521/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image
                      // src={'assets/images/svg/linkedin.svg'}
                      src={Linkedin}
                      width="32px"
                    />
                  </a>
                  {/* <a href="/youtube">
                <Image
                  src={Youtube}
                  width="100%"
                  style={{ position: "relative" }}
                />
              </a>
              <a href="/twitter">
                <Image
                  src={Twitter}
                  width="100%"
                  style={{ position: "relative" }}
                />
              </a> */}
                </div>
              </div>
            </div>
            <div className={isMobile ? "d-none" : "footer-logo d-lg-flex"}>
              <div className="footer-links">
                <div className="footer-links-head">Follow Us</div>
                <div
                  className="footer-links-content social-links d-flex"
                  style={{ gap: "5px", paddingTop: "10px" }}
                >
                  <a
                    href="https://www.instagram.com/eduwizer_social_media_team_/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image src={Insta} width="100%" />
                    {/* <img className="social-icon" alt="" src="/instagram.svg" /> */}
                  </a>
                  <a
                    href="https://www.facebook.com/Eduwizer/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image src={Face} width="100%" />
                    {/* <img className="social-icon" alt="" src="/facebook.svg" /> */}
                  </a>
                  <a
                    href="https://www.linkedin.com/in/dr-nikkie-grover-37bb5521/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image
                      // src={'assets/images/svg/linkedin.svg'}
                      src={Linkedin}
                      width="32px"
                    />
                  </a>
                  {/* <a href="/youtube">
                <Image
                  src={Youtube}
                  width="100%"
                  style={{ position: "relative" }}
                />
              </a>
              <a href="/twitter">
                <Image
                  src={Twitter}
                  width="100%"
                  style={{ position: "relative" }}
                />
              </a> */}
                </div>
              </div>
            </div>
          </div>
          <div className="footer-cin-number">
            CIN Number - U74999MH2018PTC309935
          </div>
        </>
      )}
    </footer>
  );
};

export default Footer;
