import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AboutUs from "./Components/About-Us";
import Blogs from "./Components/Blogs/Blog";
import BlogDetails from "./Components/Blogs/BlogDetails";
import ContactUs from "./Components/Contact-Us";
import UserDashboard from "./Components/Dashboard/Dashboard";
import Events from "./Components/Events/Event";
import EventDetails from "./Components/Events/EventDetails";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import Dashboard from "./Components/PreLogin/Dashboard";
import Login from "./Components/PreLogin/Login";
import PackageScreen from "./Components/PreLogin/InstitutePackageScreen";
import Signup from "./Components/PreLogin/Signup";
import VerfiyOtp from "./Components/PreLogin/VerfiyOtp";
import CandidateSearch from "./Components/Search-Pages/CandidateSearch";
import CareerCounseling from "./Components/Search-Pages/CareerCounseling";
import InfrastructureSearch from "./Components/Search-Pages/InfrastructureSearch";
import RecruiterJobSearch from "./Components/Search-Pages/RecruiterJobSearch";
import TermsAndConditions from "./Components/Terms-and-Conditions/termsAndConditions";
import CandidateView from "./Components/CandidateView/Candidate";
import UploadCV from "./Components/Upload-CV";
import Protected from "./Protected";
import CandidatePackageScreen from "./Components/PreLogin/CandidatePackageScreen";
import VendorPackageScreen from "./Components/PreLogin/VendorPackageScreen";
import CounsellerPackageScreen from "./Components/PreLogin/CounsellerPackageScreen";
import InstitutePackageScreen from "./Components/PreLogin/InstitutePackageScreen";
import ForgotPassword from "./Components/PreLogin/forgotPassword";
import SetNewPassword from "./Components/PreLogin/SetNewPassword";

function App() {
  const { loginData } = useSelector((store) => store.dataReducer);
  return (
    <div className="App">
      <Header />
      <div>
        <Routes>
          <Route
            path="/"
            exact
            element={
              // <Protected isLoggedIn={loginData}>
              <Dashboard />
              // </Protected>
            }
          />
          <Route
            path="/home"
            exact
            element={
              // <Protected isLoggedIn={loginData}>
              <Dashboard />
              // </Protected>
            }
          />
          {/* <Route path="/home" exact element={<Dashboard />} /> */}
          <Route
            path="/dashboard"
            exact
            element={
              <Protected isLoggedIn={loginData}>
                <UserDashboard />
              </Protected>
            }
          />
          <Route
            path="/contact-us"
            exact
            element={
              // <Protected isLoggedIn={loginData}>
              <ContactUs />
              // </Protected>
            }
          />
          <Route
            path="/about-us"
            element={
              // <Protected isLoggedIn={loginData}>
              <AboutUs />
              // </Protected>
            }
          />
          <Route path="login" exact element={<Login />} />
          <Route path="forgotPassword" exact element={<ForgotPassword />} />
          <Route path="setNewPassword/:token" element={<SetNewPassword />} />
          <Route path="register/:type" exact element={<Signup />} />
          <Route path="verifyotp" exact element={<VerfiyOtp />} />
          <Route
            path="candidatepackageselection"
            element={
              <Protected isLoggedIn={loginData}>
                <CandidatePackageScreen userType="candidate" />
              </Protected>
            }
          />

          <Route
            path="vendorpackageselection"
            element={
              <Protected isLoggedIn={loginData}>
                <VendorPackageScreen userType="vendor" />
              </Protected>
            }
          />

          <Route
            path="counsellerpackageselection"
            element={
              <Protected isLoggedIn={loginData}>
                <CounsellerPackageScreen userType="counseller" />
              </Protected>
            }
          />

          <Route
            path="institutepackageselection"
            element={
              <Protected isLoggedIn={loginData}>
                <InstitutePackageScreen userType="institute" />
              </Protected>
            }
          />

          {/* <Route
            path="/dashboard"
            exact
            element={
              <Protected isLoggedIn={loginData}>
                <UserDashboard />
              </Protected>
            }
          /> */}
          <Route
            path="events"
            element={
              // <Protected isLoggedIn={loginData}>
              <Events />
              // </Protected>
            }
          />
          <Route
            path="events-details"
            element={
              // <Protected isLoggedIn={loginData}>
              <EventDetails />
              // </Protected>
            }
          />
          <Route
            path="blogs"
            element={
              // <Protected isLoggedIn={loginData}>
              <Blogs />
              // </Protected>
            }
          />
          <Route
            path="blogs-details/:id"
            element={
              // <Protected isLoggedIn={loginData}>
              <BlogDetails />
              // </Protected>
            }
          />
          <Route
            path="recruiter-job-search"
            element={
              <Protected isLoggedIn={loginData}>
                <RecruiterJobSearch />
              </Protected>
            }
          />
          <Route
            path="career-counselling/:preference"
            element={
              <Protected isLoggedIn={loginData}>
                <CareerCounseling />
              </Protected>
            }
          />
          <Route
            path="candidate"
            element={
              <Protected isLoggedIn={loginData}>
                <CandidateSearch />
              </Protected>
            }
          />
          <Route
            path="infrastructure-search/:preference"
            element={
              <Protected isLoggedIn={loginData}>
                <InfrastructureSearch />
              </Protected>
            }
          />
          <Route
            path="terms-conditions"
            element={
              // <Protected isLoggedIn={loginData}>
              <TermsAndConditions />
              // </Protected>
            }
          />
          <Route
            path="CandidateView"
            element={
              // <Protected isLoggedIn={loginData}>
              <CandidateView />
              // </Protected>
            }
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
