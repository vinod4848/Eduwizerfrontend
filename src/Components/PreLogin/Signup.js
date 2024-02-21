import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import {
  Autocomplete,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { sendotp, signup } from "../../Services/api";
import {
  getAllCitiesOfACountry,
  getCountries,
  getStates,
} from "../../Utils/countriesAndStates";
import CustomLoadingAnimation from "../Common/CustomLoadingAnimation";
import CustomToast from "../Common/CustomToast";
import UploadFile from "./UploadFile";
import { Label } from "reactstrap";

const Signup = () => {
  const MySwal = withReactContent(Swal);

  const showOTPAlert = () => {
    MySwal.fire({
      title: "OTP sent",
      text: "Kindly check your mail and enter OTP",
      icon: "success",
      // confirmButtonText: 'OK'
    });
  };
  const navigate = useNavigate();
  const { type } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [preferenceDropdownOptions, setPreferenceDropdownOptions] = useState(
    []
  );
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  useEffect(() => {
    const setPreferenceOptions = () => {
      if (type === "vendor") {
        setPreferenceDropdownOptions([
          { name: "Financial loan services", value: "financialLoanServices" },
          { name: "Smart Technology", value: "smartTechnology" },
          { name: "Integrated Curriculum", value: "integratedCurriculum" },
          { name: "Teacher Training", value: "teacherTraining" },
          {
            name: "Academic Audit for Schools, Colleges, Universities, Private Institutions",
            value:
              "academicAuditForSchoolsCollegesUniversitiesPrivateInstitutions",
          },
          { name: "Website Development", value: "websiteDevelopment" },
          { name: "Artificial Intelligence", value: "artificialIntelligence" },
        ]);
      } else if (type === "counseller") {
        setPreferenceDropdownOptions([
          { name: "Career", value: "career" },
          { name: "Psychologist", value: "psychologist" },
          {
            name: "School/College Counsellors",
            value: "schoolOrCollegeCounsellors",
          },
        ]);
      } else {
        setPreferenceDropdownOptions([
          { name: "School", value: "school" },
          { name: "College", value: "college" },
          { name: "University", value: "university" },
          { name: "Private Institutions", value: "privateInstitutions" },
        ]);
      }
    };

    if (type) {
      setInitialValues(); // Assuming this is defined elsewhere
      setPreferenceOptions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  useEffect(() => {
    const countries = getCountries();
    setCountries(countries);
  }, []);

  const setStatesDropdown = (country) => {
    const states = getStates(country);
    setStates(states);
  };
  const setCitiesDropdown = (country) => {
    const cities = getAllCitiesOfACountry(country);
    setCities(cities);
  };
  const signupTypeAndFieldsMappings = {
    candidate: [
      "firstName",
      "lastName",
      "userName",
      "password",
      "email",
      "url",
      "resume",
      "fileType",
      "phone",
      "pincode",
      "state",
      "country",
      "city",
      "preference",
      "age",
      "experience",
      "board",
    ],
    student: [
      "firstName",
      "lastName",
      "userName",
      "password",
      "email",
      "url",
      "resume",
      "fileType",
      "phone",
      "pincode",
      "state",
      "country",
      "city",
      "preference",
      "age",
    ],
    vendor: [
      "firstName",
      "lastName",
      "userName",
      "password",
      "email",
      "url",
      "resume",
      "fileType",
      "phone",
      "pincode",
      "state",
      "country",
      "city",
      "preference",
      "board",
    ],
    counseller: [
      "firstName",
      "lastName",
      "userName",
      "password",
      "email",
      "url",
      "resume",
      "fileType",
      "phone",
      "pincode",
      "state",
      "country",
      "city",
      "preference",
      "age",
      "experience",
      "board",
    ],
    institute: [
      "firstName",
      "lastName",
      "userName",
      "password",
      "email",
      "url",
      "resume",
      "fileType",
      "phone",
      "pincode",
      "state",
      "country",
      "city",
      "preference",
      "board",
    ],
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const callRegister = async (values, setSubmitting) => {
    try {
      setLoading(true);
      const signupResp = await signup(values);
      const userId = signupResp?.data?.data?._id;
      console.log("signupResp :>> ", signupResp, userId);
      if (userId) {
        const sendOtpResp = await sendotp({ userId });
        localStorage.setItem("userId", userId);
        showOTPAlert();
        navigate("/verifyotp");
        console.log("sendOtpResp :>> ", sendOtpResp);
      } else {
        // showAlert()
        toast(
          <CustomToast
            type="error"
            message={signupResp?.data?.message || "Error while signing up"}
          />
        );
      }
    } catch (error) {
      toast(<CustomToast type="error" message={error || error.message} />);
      console.log("error :>> ", error);
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  const validateTheForm = (values, errors) => {
    const requiredFields = {
      firstName: "FirstName",
      lastName: "LastName",
      userName: "Username",
      password: "Password",
      email: "Email",
      phone: "Phone",
      pincode: "Pincode",
      country: "Country",
      state: "State",
      city: "City",
      url: "Profile Image",
      resume: "Resume",
      preference: "Preference",
    };

    for (const field in requiredFields) {
      if (!values[field]) {
        errors[field] = `${requiredFields[field]} Required`;
      }
    }

    switch (type) {
      case "candidate":
      case "counseller":
        if (!values.age) {
          errors.age = "Age Required";
        }
        if (!values.experience) {
          errors.experience = "Experience Required";
        }
        if (!values.board) {
          errors.board = "Board Required";
        }
        break;
      case "student":
        if (!values.age) {
          errors.age = "Age Required";
        }
        break;
      case "vendor":
      case "institute":
        if (!values.board) {
          errors.board = "Board Required";
        }
        break;
      default:
        break;
    }

    return errors;
  };

  const setInitialValues = () => {
    let initialValues = {
      firstName: "",
      lastName: "",
      userName: "",
      password: "",
      email: "",
      url: "",
      resume: "",
      fileType: "",
      phone: "",
      pincode: "",
      country: "",
      state: "",
      city: "",
      preference: "",
    };
    switch (type) {
      case "candidate":
      case "counseller":
        initialValues = {
          ...initialValues,
          age: "",
          experience: "",
          board: "",
        };
        break;
      case "student":
        initialValues = {
          ...initialValues,
          age: "",
        };
        break;
      case "vendor":
      case "institute":
        initialValues = {
          ...initialValues,
          board: "",
        };
        break;
      default:
        break;
    }
    return initialValues;
  };

  return (
    <>
      <div className="row col-12 py-5 signup-with-bg">
        <h3 className="col-12 text-center text-capitalize">
          Sign up as {type}
        </h3>
        <div className="col-12">
          <Formik
            initialValues={setInitialValues()}
            validate={(values) => {
              const errors = {};
              return validateTheForm(values, errors);
            }}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              values.userType = type;
              callRegister(values, setSubmitting);
              // setSubmitting(false)
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
              setFieldValue,
              /* and other goodies */
            }) => (
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-none col-lg-3" />
                  <div className="col-md-12 col-lg-6 row">
                    {signupTypeAndFieldsMappings[type].includes(
                      "firstName"
                    ) && (
                      <div className="col-12 col-md-12 col-lg-6 text-center mt-3">
                        <FormControl
                          sx={{ m: 1, width: "36ch" }}
                          variant="outlined"
                        >
                          <InputLabel>First Name*</InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-firstName"
                            type="text"
                            label="First Name"
                            name="firstName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.firstName}
                          />
                        </FormControl>
                        <div className="color-red">
                          {errors.firstName &&
                            touched.firstName &&
                            errors.firstName}
                        </div>
                      </div>
                    )}
                    {signupTypeAndFieldsMappings[type].includes("lastName") && (
                      <div className="col-12 col-md-12 col-lg-6 text-center mt-3">
                        <FormControl
                          sx={{ m: 1, width: "36ch" }}
                          variant="outlined"
                        >
                          <InputLabel>Last Name*</InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-lastName"
                            type="text"
                            label="Last Name"
                            name="lastName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.lastName}
                          />
                        </FormControl>
                        <div className="color-red">
                          {errors.lastName &&
                            touched.lastName &&
                            errors.lastName}
                        </div>
                      </div>
                    )}
                    {signupTypeAndFieldsMappings[type].includes("url") && (
                      <div className="col-12 col-md-12 col-lg-6 text-center d-flex align-items-center mt-4">
                        <Label> Upload Profile*</Label>
                        <UploadFile
                          accept=".png,.jpg,.jpeg,.mp4,.avi,.mov,.wmv,.flv,.webm,.mkv,.ogg,.ogv,.youtube"
                          editData={{
                            url: values.url,
                            fileType: values.fileType,
                          }}
                          uploadFileProp={(file, url, fileType) => {
                            if (file.size < 1024 * 1024) {
                              setFieldValue("url", url);
                              setFieldValue("fileType", fileType);
                              Swal.fire({
                                icon: "success",
                                title: "Success",
                                text: "Your profile photo  has been uploaded successfully!",
                              });
                            }
                          }}
                        />
                        <div className="color-red">
                          {errors.url && touched.url && errors.url}
                        </div>
                        {values.url && values.url.size < 1024 * 1024 && (
                          <label className="color-red">
                            Upload an image smaller than 1 MB | Image format
                            should be [.png, .jpg, or .jpeg]
                          </label>
                        )}
                      </div>
                    )}
                    {signupTypeAndFieldsMappings[type].includes("resume") && (
                      <div className="col-12 col-md-12 col-lg-6 text-center d-flex align-items-center mt-4">
                        <Label> Upload Resume*</Label>
                        <UploadFile
                          accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          editData={{
                            resume: values.resume,
                            fileType: values.fileType,
                          }}
                          uploadFileProp={(file, resume, fileType) => {
                            const allowedTypes = [
                              "application/pdf",
                              "application/msword",
                              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                            ];
                            if (
                              allowedTypes.includes(file.type) &&
                              file.size < 1024 * 1024
                            ) {
                              setFieldValue("resume", resume);
                              setFieldValue("fileType", fileType);
                              Swal.fire({
                                icon: "success",
                                title: "Success",
                                text: "Your resume has been uploaded successfully!",
                              });
                            }
                          }}
                        />
                        <div className="color-red">
                          {errors.resume && touched.resume && errors.resume}
                        </div>
                        {values.resume && values.resume.size < 1024 * 1024 && (
                          <label className="color-red">
                            Upload a file smaller than 1 MB | File format should
                            be [.pdf, .doc, or .docx]
                          </label>
                        )}
                      </div>
                    )}

                    {signupTypeAndFieldsMappings[type].includes("userName") && (
                      <div className="col-12 col-md-12 col-lg-6 text-center mt-3">
                        <FormControl
                          sx={{ m: 1, width: "36ch" }}
                          variant="outlined"
                        >
                          <InputLabel>Username*</InputLabel>
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
                          {errors.userName &&
                            touched.userName &&
                            errors.userName}
                        </div>
                      </div>
                    )}
                    {signupTypeAndFieldsMappings[type].includes("password") && (
                      <div className="col-12 col-md-12 col-lg-6 text-center mt-3">
                        <FormControl
                          sx={{ m: 1, width: "36ch" }}
                          variant="outlined"
                        >
                          <InputLabel>Password*</InputLabel>
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
                          {errors.password &&
                            touched.password &&
                            errors.password}
                        </div>
                      </div>
                    )}
                    {signupTypeAndFieldsMappings[type].includes("email") && (
                      <div className="col-12 col-md-12 col-lg-6 text-center mt-3">
                        <FormControl
                          sx={{ m: 1, width: "36ch" }}
                          variant="outlined"
                        >
                          <InputLabel>Email*</InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-Email"
                            type="text"
                            label="Email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                          />
                        </FormControl>
                        <div className="color-red">
                          {errors.email && touched.email && errors.email}
                        </div>
                      </div>
                    )}
                    {signupTypeAndFieldsMappings[type].includes("phone") && (
                      <div className="col-12 col-md-12 col-lg-6 text-center mt-3">
                        <FormControl
                          sx={{ m: 1, width: "36ch" }}
                          variant="outlined"
                        >
                          <InputLabel>Phone Number*</InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-phone"
                            type="text"
                            label="Phone Number"
                            name="phone"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.phone}
                          />
                        </FormControl>
                        <div className="color-red">
                          {errors.phone && touched.phone && errors.phone}
                        </div>
                      </div>
                    )}
                    {signupTypeAndFieldsMappings[type].includes("age") && (
                      <div className="col-12 col-md-12 col-lg-6 text-center mt-3">
                        <FormControl
                          sx={{ m: 1, width: "36ch" }}
                          variant="outlined"
                        >
                          <InputLabel>Age*</InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-age"
                            type="text"
                            label="Age"
                            name="age"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.age}
                          />
                        </FormControl>
                        <div className="color-red">
                          {errors.age && touched.age && errors.age}
                        </div>
                      </div>
                    )}
                    {signupTypeAndFieldsMappings[type].includes(
                      "experience"
                    ) && (
                      <div className="col-12 col-md-12 col-lg-6 text-center mt-3">
                        <FormControl
                          sx={{ m: 1, width: "36ch" }}
                          variant="outlined"
                        >
                          <InputLabel>Experience*</InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-experience"
                            type="text"
                            label="Experience"
                            name="experience"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.experience}
                          />
                        </FormControl>
                        <div className="color-red">
                          {errors.experience &&
                            touched.experience &&
                            errors.experience}
                        </div>
                      </div>
                    )}
                    {signupTypeAndFieldsMappings[type].includes("pincode") && (
                      <div className="col-12 col-md-12 col-lg-6 text-center mt-3">
                        <FormControl
                          sx={{ m: 1, width: "36ch" }}
                          variant="outlined"
                        >
                          <InputLabel>Pin code *</InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-pincode"
                            type="text"
                            label="Pin code"
                            name="pincode"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.pincode}
                          />
                        </FormControl>
                        <div className="color-red">
                          {errors.pincode && touched.pincode && errors.pincode}
                        </div>
                      </div>
                    )}
                    {signupTypeAndFieldsMappings[type].includes("country") && (
                      <div className="col-12 col-md-12 col-lg-6 text-center mt-3">
                        <FormControl
                          sx={{ m: 1, width: "36ch" }}
                          variant="outlined"
                        >
                          <Autocomplete
                            id="demo-simple-select-country"
                            value={values.country}
                            name="country"
                            disablePortal
                            onChange={(e, value) => {
                              setFieldValue("country", value);
                              setFieldValue("city", null);
                              setCitiesDropdown(value);
                              setStatesDropdown(value);
                            }}
                            options={countries}
                            renderInput={(params) => (
                              <TextField {...params} label="Country*" />
                            )}
                          />
                        </FormControl>
                        <div className="color-red">
                          {errors.country && touched.country && errors.country}
                        </div>
                      </div>
                    )}
                    {signupTypeAndFieldsMappings[type].includes("state") && (
                      <div className="col-12 col-md-12 col-lg-6 text-center mt-3">
                        <FormControl
                          sx={{ m: 1, width: "36ch" }}
                          variant="outlined"
                        >
                          <Autocomplete
                            id="demo-simple-select-state"
                            value={values.state}
                            name="state"
                            disablePortal
                            onChange={(e, value) => {
                              setFieldValue("state", value);
                              setFieldValue("city", null);
                              setCitiesDropdown(value);
                            }}
                            options={states}
                            renderInput={(params) => (
                              <TextField {...params} label="State *" />
                            )}
                          />
                        </FormControl>
                        <div className="color-red">
                          {errors.state && touched.state && errors.state}
                        </div>
                      </div>
                    )}
                    {signupTypeAndFieldsMappings[type].includes("city") && (
                      <div className="col-12 col-md-12 col-lg-6 text-center mt-3">
                        <FormControl
                          sx={{ m: 1, width: "36ch" }}
                          variant="outlined"
                        >
                          {/* <InputLabel id="demo-simple-select-label">
                            City
                          </InputLabel> */}
                          <Autocomplete
                            // labelId="demo-simple-select-label"
                            id="demo-simple-select-city"
                            value={values.city}
                            name="city"
                            // label="City"
                            disablePortal
                            // onChange={handleChange}
                            // inputValue={values.city}
                            // onInputChange={(event, newInputValue) => {
                            //   handleChange(newInputValue);
                            // }}
                            onChange={(e, value) =>
                              setFieldValue("city", value)
                            }
                            options={cities}
                            renderInput={(params) => (
                              <TextField {...params} label="City*" />
                            )}
                          />
                          {/* {cities.map((city) => (
                              <MenuItem value={city}>{city}</MenuItem>
                            ))} */}
                          {/* </Autocomplete> */}
                        </FormControl>
                        <div className="color-red">
                          {errors.city && touched.city && errors.city}
                        </div>
                      </div>
                    )}
                    {signupTypeAndFieldsMappings[type].includes("board") && (
                      <div className="col-12 col-md-12 col-lg-6 text-center mt-3">
                        <FormControl
                          sx={{ m: 1, width: "36ch" }}
                          variant="outlined"
                        >
                          <InputLabel id="demo-simple-select-label">
                            Board*
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select-board"
                            value={values.board}
                            name="board"
                            label="Board"
                            onChange={handleChange}
                          >
                            <MenuItem value="icse">ICSE</MenuItem>
                            <MenuItem value="cbse">CBSE</MenuItem>
                            <MenuItem value="igse">IGSE</MenuItem>
                            <MenuItem value="state board">State Board</MenuItem>
                            <MenuItem value="ib">IB</MenuItem>
                            <MenuItem value="cambridge">Cambridge</MenuItem>
                            {/* <MenuItem value="Mumbai Board">
                              Mumbai Board
                            </MenuItem>
                            <MenuItem value="Gujarat Board">
                              Gujarat Board
                            </MenuItem> */}
                          </Select>
                        </FormControl>
                        <div className="color-red">
                          {errors.board && touched.board && errors.board}
                        </div>
                      </div>
                    )}
                    {signupTypeAndFieldsMappings[type].includes(
                      "preference"
                    ) && (
                      <div className="col-12 col-md-12 col-lg-6 text-center mt-3">
                        <FormControl
                          sx={{ m: 1, width: "36ch" }}
                          variant="outlined"
                        >
                          <InputLabel id="demo-simple-select-label">
                            {type === "vendor"
                              ? "Sector/Industry"
                              : type === "counseller"
                              ? "Counseller Type"
                              : "Preference*"}
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select-preference"
                            value={values.preference}
                            name="preference"
                            label={
                              type === "vendor"
                                ? "Sector/Industry"
                                : type === "counseller"
                                ? "Counseller Type"
                                : "Preference*"
                            }
                            onChange={handleChange}
                          >
                            {preferenceDropdownOptions.map((pref) => (
                              <MenuItem value={pref.value}>
                                {pref.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        <div className="color-red">
                          {errors.preference &&
                            touched.preference &&
                            errors.preference}
                        </div>
                      </div>
                    )}
                    <div className="col-12 text-center mt-3">
                      <FormControl
                        sx={{ m: 1, width: "36ch" }}
                        variant="outlined"
                      >
                        <Button
                          type="submit"
                          // disabled={
                          //   isSubmitting || !!Object.keys(errors).length
                          // }
                          variant="outlined"
                          size="large"
                        >
                          Continue
                        </Button>
                      </FormControl>
                    </div>
                  </div>
                  <div className="col-md-none col-lg-3" />
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
      <CustomLoadingAnimation isLoading={loading} />
    </>
  );
};

export default Signup;
