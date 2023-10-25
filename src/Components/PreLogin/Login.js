import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { loginData } from "../../Redux/Actions/dataAction";
import { login } from "../../Services/api";
import CustomLoadingAnimation from "../Common/CustomLoadingAnimation";
import CustomToast from "../Common/CustomToast";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const MySwal = withReactContent(Swal);

  const showRecruiterAlert = () => {
    MySwal.fire({
      title: "Your Application is in review",
      text: "Thank you for showing interest. We have successfully recorded your details. Your profile is being reviewed. We will connect with you soon",
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

  const callLogin = async (values, setSubmitting) => {
    try {
      setLoading(true);
      const loginResp = await login(values);
      if (loginResp?.data?.success) {
        if (loginResp?.data?.data?.userType === 'institute') {
          showRecruiterAlert()
        } else {
          dispatch(loginData(loginResp.data.session));
          navigate("/");
        }
      } else {
        toast(
          <CustomToast
            type="error"
            message={loginResp?.data?.message || "Incorrect credentials"}
          />
        );
      }
    } catch (error) {
      toast(<CustomToast type="error" message={error || error.message} />);
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center login-with-bg" style={{ height: "60vh" }}>
      <div className="container-fluid row py-5">
        <div className="col-12">
          <Formik
            initialValues={{ userName: "", password: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.userName) {
                errors.userName = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                  values.userName
                )
              ) {
                errors.userName = "Invalid username";
              }
              if (!values.password) {
                errors.password = "Required";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              console.log("vivekkk", values);
              callLogin(values, setSubmitting);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-12 text-center">
                    <FormControl
                      sx={{ m: 1, width: isMobile ? "100%" : "36ch" }}
                      variant="outlined"
                    >
                      <InputLabel>Username</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-username"
                        type="text"
                        label="Username"
                        name="userName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.userName}
                      />
                    </FormControl>
                    <div className="color-red">
                      {errors.userName && touched.userName && errors.userName}
                    </div>
                  </div>
                  <div className="col-12 text-center mt-3">
                    <FormControl
                      sx={{ m: 1, width: isMobile ? "100%" : "36ch" }}
                      variant="outlined"
                    >
                      <InputLabel>Password</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                    </FormControl>
                    <div className="color-red">
                      {errors.password && touched.password && errors.password}
                    </div>
                  </div>
                  <div className="col-12 text-center mt-3">
                    <FormControl
                      sx={{ m: 1, width: isMobile ? "100%" : "36ch" }}
                      variant="outlined"
                    >
                      <Button
                        className="m-btn"
                        type="submit"
                        disabled={isSubmitting || !!Object.keys(errors).length}
                        variant="outlined"
                        size="large"
                      >
                        Continue
                      </Button>
                    </FormControl>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </div>
        <div className="col-12 text-center">
          {/* <div className="col-12">OR</div>
          <div className="col-12 text-center mt-3">
            <FormControl sx={{ m: 1, width: isMobile ? "100%" : "36ch" }} variant="outlined">
              <Button variant="outlined" size="large">
                Log in with Google
              </Button>
            </FormControl>
          </div>
          <div className="col-12 text-center mt-1">
            <FormControl sx={{ m: 1, width: isMobile ? "100%" : "36ch" }} variant="outlined">
              <Button variant="outlined" size="large">
                Log in with Facebook
              </Button>
            </FormControl>
          </div> */}
          <div className="col-12 text-center mt-4">
            Don't have account?{" "}
            <u
              className="pointer"
              onClick={() => navigate("/register/candidate")}
            >
              <a>Create Account</a>
            </u>
          </div>
        </div>
      </div>
      <CustomLoadingAnimation isLoading={loading} />
    </div>
  );
};

export default Login;
