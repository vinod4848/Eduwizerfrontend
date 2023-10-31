import { Button, FormControl, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPackageByCandidate } from "../../Services/api";

const CandidatePackageScreen = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [packages, setPackages] = useState([]);
  console.log(packages, "packs")
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    getPackageByCandidate()
      .then((response) => {
        setPackages(response.data);
        setLoading(false); // Data has been fetched, set loading to false
      })
      .catch((error) => {
        console.error('Error fetching packages for counsellors:', error);
        setLoading(false); // Set loading to false in case of an error
      });
  }, []);

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const continueToPayment = (values) => {
    return new Promise((resolve, reject) => {
      console.log("calling payment function", values);
      navigate("/dashboard");
      resolve();
    });
  };

  return (
    <div className="row py-5 package-with-bg w-100">
      <form onSubmit={continueToPayment}>
        <div
          className="row justify-content-center align-items-center"
          style={{ padding: "8rem 0 0 0" }}
        >
          <div className="col-lg-12 col-sm-none text-center mt-3">
            {loading ? (
              <CircularProgress /> // Display a loading indicator while fetching data
            ) : (
              <div className="package-box p-5 row ">
              <div className="col-12 font-weight-bold">Job Seeker Package</div>
              <div className="col-12">Actual Prize {packages[0].prize}</div>
              <div className="col-12 font-weight-bold">
                {/* <span className="text-decoration-line-through">{packages[0].prize}</span> */}
                {/* <span>Rs. 2999</span> */}
                <span> Special Prize {packages[0].specialPrize}</span>
              </div>
              <div className="col-12">per user per year</div>
            </div>
            )}
            {/* box */}
          </div>
          <div className="col-12 text-center" style={{ margin: "6rem 0 0 0" }}>
            <FormControl sx={{ m: 1, width: "36ch" }} variant="outlined">
              <Button type="submit" variant="outlined" size="large" className="m-btn">
                Continue
              </Button>
            </FormControl>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CandidatePackageScreen;
