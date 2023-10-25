import { Button, FormControl } from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { loginData } from "../../Redux/Actions/dataAction";
import { verifyotp } from "../../Services/api";
import CustomLoadingAnimation from "../Common/CustomLoadingAnimation";
import CustomToast from "../Common/CustomToast";

const VerfiyOtp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  // const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleChange = (newValue) => {
    setOtp(newValue);
  };

  const MySwal = withReactContent(Swal);

  const showRecruiterAlert = () => {
    MySwal.fire({
      title: "Registered Successfully",
      text: "Thank you for registering. Our team will contact you",
      icon: "success",
      // confirmButtonText: 'OK'
    });
  };

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

  const callVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const userId = localStorage.getItem("userId");
      if (!userId) {
        toast(<CustomToast type="error" message="Invalid page" />);
        return;
      }
      const verifyOtpResp = await verifyotp({ code: otp, userId });
      console.log("verifyOtpResp==", verifyOtpResp);
      if (verifyOtpResp?.data?.data?.userType === "institute") {
        showRecruiterAlert();
        navigate("/login");
      } else if (verifyOtpResp?.data?.data?.userType === "vendor") {
        dispatch(loginData(verifyOtpResp.data.token));
        navigate("/vendorpackageselection");
      } 
      else if (verifyOtpResp?.data?.data?.userType === "candidate") {
        dispatch(loginData(verifyOtpResp.data.token));
        navigate("/candidatepackageselection");
      } 
      else if (verifyOtpResp?.data?.data?.userType === "counseller") {
        dispatch(loginData(verifyOtpResp.data.token));
        navigate("/counsellerpackageselection");
      } 
      else {
        dispatch(loginData(verifyOtpResp.data.token));
        // localStorage.setItem('session', true) // todo

        navigate("/packageselection");
      }
      console.log("verifyOtpResp :>> ", verifyOtpResp);
    } catch (error) {
      toast(<CustomToast type="error" message={error || error.message} />);
      console.log("error :>> ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="row w-100 otp-with-bg" style={{ padding: "8rem 0" }}>
        <h3 className="col-12 text-center">Enter OPT sent to Email</h3>
        <form onSubmit={(e) => callVerifyOtp(e)}>
          <div className="row justify-content-center mt-3">
            <div className="col-lg-6 col-sm-6 col-12 mt-5 mb-3">
              <MuiOtpInput length={6} value={otp} onChange={handleChange} />
            </div>
          </div>
          <div className="col-12 text-center mt-3 pointer">Resent OTP</div>
          <div className="col-12 text-center mt-3">
            <FormControl
              sx={{ m: 1, width: isMobile ? "100%" : "36ch" }}
              variant="outlined"
            >
              <Button
                type="submit"
                className="m-btn"
                disabled={!(otp.length === 6)}
                variant="outlined"
                size="large"
              >
                Continue
              </Button>
            </FormControl>
          </div>
        </form>
      </div>
      <CustomLoadingAnimation isLoading={loading} />
    </>
  );
};

export default VerfiyOtp;
