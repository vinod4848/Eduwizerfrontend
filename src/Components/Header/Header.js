import { useEffect } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "../../Assests/Logo/logo.svg";
import {
  // loginData as disptachFunction,
  logoutAction,
  profileDataAction,
} from "../../Redux/Actions/dataAction";
import { getProfileFromServer } from "../../Services/api";
import "./index.scss";

function Header() {
  const dispatch = useDispatch();
  const { loginData, profileData } = useSelector((store) => store.dataReducer);

  useEffect(() => {
    if (loginData && !profileData) {
      getProfile();
      // if (loginResp?.data?.success) {
      //   dispatch(loginData(loginResp.data.session));
      //   navigate("/");
      // }
    }
  });

  const getProfile = async () => {
    const profileResp = await getProfileFromServer();
    dispatch(profileDataAction(profileResp.data.data));
    console.log("profileResp", profileResp);
  };

  return (
    //! remove expand if dont want mobile hamburger
    <Navbar
      bg="white"
      expand="lg"
      sticky="top"
      className="mb-3 shadow-on-bottom"
    >
      <Container fluid>
        <Navbar.Brand>
          <Link to="">
            <Image src={Logo} style={{ width: "75px" }} />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="w-100">
          <Nav className="me-auto">
            <Nav.Link>
              <Navbar.Text>
                <Link to="">Home</Link>
              </Navbar.Text>
            </Nav.Link>
            {profileData?.userType !== "candidate" && (
              <Nav.Link>
                <Navbar.Text>
                  <Link to="candidate">Candidate</Link>
                  {/* Candidate */}
                </Navbar.Text>
              </Nav.Link>
            )}
            {/* {profileData?.userType !== "institute" && (
              <Nav.Link>
                <Navbar.Text>
                  <Link to="/recruiter-job-search">Recruiter</Link>
                </Navbar.Text>
              </Nav.Link>
            )} */}
            {profileData?.userType !== "vendor" && (
              <Nav.Link className="p-35">
                <Navbar.Text>
                  <DropdownButton
                    id="dropdown-basic-button-infra"
                    title="Infrastructure"
                    className="header-dropdown-button"
                  >
                    <Dropdown.Item className="p-2">
                      <Link to="/infrastructure-search/financialLoanServices">
                        Financial Loan Services
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item className="p-2">
                      <Link to="/infrastructure-search/smartTechnology">
                        Smart Technology
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item className="p-2">
                      <Link to="/infrastructure-search/integratedCurriculum">
                        Integrated Curriculum
                      </Link>
                    </Dropdown.Item>

                    <Dropdown.Item className="p-2">
                      <Link to="/infrastructure-search/teacherTraining">
                        Teacher Training
                      </Link>
                    </Dropdown.Item>

                    <Dropdown.Item className="p-2">
                      <Link to="/infrastructure-search/academicAuditForSchoolsCollegesUniversitiesPrivateInstitutions">
                        Academic Audit for Schools, Colleges, Universities,
                        Private Institutions
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item className="p-2">
                      <Link to="/infrastructure-search/websiteDevelopment">
                        Website Development
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item className="p-2">
                      <Link to="/infrastructure-search/artificialIntelligence">
                        Artificial Intelligence
                      </Link>
                    </Dropdown.Item>
                  </DropdownButton>
                  {/* <Link to="/infrastructure-search">Infrastructure</Link> */}
                  {/* Infrastructure */}
                </Navbar.Text>
              </Nav.Link>
            )}
            {profileData?.userType !== "counseller" && (
              <Nav.Link className="p-35">
                <Navbar.Text>
                  <DropdownButton
                    id="dropdown-basic-button-infra"
                    title="Counsellors"
                    className="header-dropdown-button"
                  >
                    <Dropdown.Item className="p-2">
                      <Link to="/career-counselling/career">Career</Link>
                    </Dropdown.Item>
                    <Dropdown.Item className="p-2">
                      <Link to="/career-counselling/psychologist">
                        Psychologist
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item className="p-2">
                      <Link to="/career-counselling/schoolOrCollegeCounsellors">
                        School/College Counsellors
                      </Link>
                    </Dropdown.Item>
                  </DropdownButton>
                </Navbar.Text>
              </Nav.Link>
            )}
            {/* <Nav.Link>
              <Navbar.Text>Infrastructure</Navbar.Text>
            </Nav.Link> */}
            <Nav.Link>
              <Navbar.Text>
                <Link to="events">Events</Link>
              </Navbar.Text>
            </Nav.Link>
            <Nav.Link>
              <Navbar.Text>
                <Link to="blogs">Blogs</Link>
              </Navbar.Text>
            </Nav.Link>
            <Nav.Link>
              <Navbar.Text>
                <Link to="/contact-us">Contact Us</Link>
              </Navbar.Text>
            </Nav.Link>
            <Nav.Link>
              <Navbar.Text>
                <Link to="about-us">About Us</Link>
              </Navbar.Text>
            </Nav.Link>

            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Nav className="me-auto">
            {!loginData && (
              <Nav.Link>
                <DropdownButton
                  id="dropdown-basic-button"
                  title="Sign Up"
                  variant="warning"
                  className="text-nowrap"
                >
                  <Dropdown.Item className="p-2">
                    <Link to="/register/candidate">Candidate</Link>
                  </Dropdown.Item>
                  <Dropdown.Item className="p-2">
                    <Link to="/register/counseller">Counseller</Link>
                  </Dropdown.Item>
                  {/* <Dropdown.Item className="p-2">
                    <Link to="/register/student">Student</Link>
                  </Dropdown.Item> */}

                  <Dropdown.Item className="p-2">
                    <Link to="/register/vendor">Vendor</Link>
                  </Dropdown.Item>

                  <Dropdown.Item className="p-2">
                    <Link to="/register/institute">Recruiter</Link>
                  </Dropdown.Item>
                </DropdownButton>
                {/* <Button variant="warning" className="text-nowrap shadow-lg">
                  <Link to="/register/candidate">Sign Up</Link>
                </Button> */}
              </Nav.Link>
            )}
            {!loginData && (
              <Nav.Link>
                <Button variant="warning" className="text-nowrap">
                  <Link to="/login">Login</Link>
                </Button>
              </Nav.Link>
            )}
            {loginData && (
              <Nav.Link>
                <Button variant="warning" className="text-nowrap">
                  <Link to="/dashboard">My Profile</Link>
                </Button>
              </Nav.Link>
            )}
            {loginData && (
              <Nav.Link>
                <Button
                  onClick={() => dispatch(logoutAction())}
                  variant="warning"
                  className="text-nowrap"
                >
                  <Link to="/">Logout</Link>
                </Button>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
