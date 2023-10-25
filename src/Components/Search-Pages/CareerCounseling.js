import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { searchAPI } from "../../Services/api";
import "./index.css";

function CareerCounseling() {
  const { preference } = useParams();
  const navigate = useNavigate();
  // const data = [
  //   {
  //     name: "Full Name",
  //     image:
  //       "https://img.photographyblog.com/reviews/kodak_pixpro_fz201/photos/kodak_pixpro_fz201_01.jpg",
  //     sponsored: true,
  //     description: "2-3 words",
  //     location: "country",
  //     preferences: "",
  //     expectedCTC: "",
  //     previousCTC: "",
  //     tags: ["Actively looking for Job", "Fresher/Experienced"],
  //   },
  //   {
  //     name: "Full Name",
  //     image:
  //       "https://img.photographyblog.com/reviews/kodak_pixpro_fz201/photos/kodak_pixpro_fz201_01.jpg",
  //     sponsored: false,
  //     description: "2-3 words",
  //     location: "country",
  //     preferences: "",
  //     expectedCTC: "",
  //     previousCTC: "",
  //     tags: ["Actively looking for Job", "Fresher/Experienced"],
  //   },
  //   {
  //     name: "Full Name",
  //     image:
  //       "https://img.photographyblog.com/reviews/kodak_pixpro_fz201/photos/kodak_pixpro_fz201_01.jpg",
  //     sponsored: false,
  //     description: "2-3 words",
  //     location: "country",
  //     preferences: "",
  //     expectedCTC: "",
  //     previousCTC: "",
  //     tags: ["Actively looking for Job", "Fresher/Experienced"],
  //   },
  //   {
  //     name: "Full Name",
  //     image:
  //       "https://img.photographyblog.com/reviews/kodak_pixpro_fz201/photos/kodak_pixpro_fz201_01.jpg",
  //     sponsored: false,
  //     description: "2-3 words",
  //     location: "country",
  //     preferences: "",
  //     expectedCTC: "",
  //     previousCTC: "",
  //     tags: ["Actively looking for Job", "Fresher/Experienced"],
  //   },
  //   {
  //     name: "Full Name",
  //     image:
  //       "https://img.photographyblog.com/reviews/kodak_pixpro_fz201/photos/kodak_pixpro_fz201_01.jpg",
  //     sponsored: false,
  //     description: "2-3 words",
  //     location: "country",
  //     preferences: "",
  //     expectedCTC: "",
  //     previousCTC: "",
  //     tags: ["Actively looking for Job", "Fresher/Experienced"],
  //   },
  //   {
  //     name: "Full Name",
  //     image:
  //       "https://img.photographyblog.com/reviews/kodak_pixpro_fz201/photos/kodak_pixpro_fz201_01.jpg",
  //     sponsored: false,
  //     description: "2-3 words",
  //     location: "country",
  //     preferences: "",
  //     expectedCTC: "",
  //     previousCTC: "",
  //     tags: ["Actively looking for Job", "Fresher/Experienced"],
  //   },
  // ];

  const [data, setData] = useState([]);
  const [initialValues, setInitialValues] = useState({
    // preference: "",
    educationBoard: "",
    location: "",
    expectedCtc: "",
    age: "",
  });

  const ctcMapping = {
    "1to3lpa": "1 - 3 LPA",
    "3to5lpa": "3 - 5 LPA",
    "5to10lpa": "5 - 10 LPA",
    "10to15pa": "10 - 15 LPA",
    "15to25lpa": "15 - 25 LPA",
    "25+lpa": "25+ LPA",
  };

  const sideData = ["Other Events", "Sponsored Posts", "Ads"];

  // const clearAllFilters = () => {
  //   setInitialValues({
  //     category: "",
  //     educationBoard: "",
  //     location: "",
  //     ctc: "",
  //     age: "",
  //   })
  // }

  useEffect(() => {
    callSearch({}, null);
  }, [preference]);

  const callSearch = async (req, setSubmitting) => {
    try {
      const resp = await searchAPI({
        ...req,
        userType: "counseller",
        preference,
      });
      const temp = resp.data.data.map((ele) => {
        return { ...ele, name: ele.firstName + ele.lastName };
      });
      setData(temp);
    } catch (error) {
      console.log("error :>> ", error);
    }
    if (setSubmitting !== null) {
      setSubmitting(false);
    }
  };

  return (
    <Container fluid>
      <div className="row">
        <div className="col-2">
          <div className="bg-warning d-flex flex-column justify-content-center">
            <h2 className="mx-auto my-3">Filters</h2>

            <Formik
              initialValues={initialValues}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                callSearch(values, setSubmitting);
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
                resetForm,
                /* and other goodies */
              }) => (
                <form onSubmit={handleSubmit}>
                  {/* <FormControl
                    variant="outlined"
                    sx={{
                      m: 1,
                      width: "90%",
                    }}
                  >
                    <InputLabel>Preference</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select-preference"
                      value={values.preference}
                      name="preference"
                      label="Preference"
                      onChange={handleChange}
                    >
                      <MenuItem value="school">School</MenuItem>
                      <MenuItem value="college">College</MenuItem>
                      <MenuItem value="private institutions">
                        Private Institutions
                      </MenuItem>
                    </Select>
                  </FormControl> */}
                  <FormControl
                    variant="outlined"
                    sx={{
                      m: 1,
                      width: "90%",
                    }}
                  >
                    <InputLabel>Education Board</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select-educationBoard"
                      value={values.educationBoard}
                      name="educationBoard"
                      onChange={handleChange}
                    >
                      <MenuItem value="icse">ICSE</MenuItem>
                      <MenuItem value="cbse">CBSE</MenuItem>
                      <MenuItem value="igse">IGSE</MenuItem>
                      <MenuItem value="state board">State Board</MenuItem>
                      <MenuItem value="ib">IB</MenuItem>
                      <MenuItem value="cambridge">Cambridge</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl
                    variant="outlined"
                    sx={{
                      m: 1,
                      width: "90%",
                    }}
                  >
                    <InputLabel>Location</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-location"
                      name="location"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.location}
                      label="Location"
                    />
                  </FormControl>
                  <FormControl
                    variant="outlined"
                    sx={{
                      m: 1,
                      width: "90%",
                    }}
                  >
                    <InputLabel>Expected CTC</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select-expectedCtc"
                      value={values.expectedCtc}
                      name="expectedCtc"
                      // label="expectedCtc"
                      onChange={handleChange}
                    >
                      <MenuItem value="1to3lpa">1 to 3 LPA</MenuItem>
                      <MenuItem value="3to5lpa">3 to 5 LPA</MenuItem>
                      <MenuItem value="5to10lpa">5 - 10 LPA</MenuItem>
                      <MenuItem value="10to15pa">10 - 15 LPA</MenuItem>
                      <MenuItem value="15to25lpa">15 - 25 LPA</MenuItem>
                      <MenuItem value="25+lpa">25+ LPA</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl
                    variant="outlined"
                    sx={{
                      m: 1,
                      width: "90%",
                    }}
                  >
                    <InputLabel>Age</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-age"
                      name="age"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.age}
                      label="Age"
                    />
                  </FormControl>
                  <FormControl
                    sx={{
                      m: 1,
                      width: "90%",
                    }}
                  >
                    <Button
                      className="m-btn"
                      type="submit"
                      disabled={isSubmitting}
                      size="large"
                      variant="light"
                    >
                      Search
                    </Button>
                  </FormControl>
                  <FormControl
                    sx={{
                      m: 1,
                      width: "90%",
                    }}
                  >
                    <Button
                      className="m-btn"
                      size="large"
                      variant="light"
                      onClick={resetForm}
                    >
                      Clear all filters
                    </Button>
                  </FormControl>
                </form>
              )}
            </Formik>
          </div>
        </div>
        <div className="col-8 row">
          {data &&
            data.length > 0 &&
            data.map((element) => {
              return (
                <div
                  className="row m-2"
                  style={{ border: "3px solid #000000", borderRadius: "15px", height:"fit-content" }}
                >
                  <div className="col-3">
                  {element.url ? (
                    <img
                      src={element.url}
                      alt="image"
                      width="70%"
                      className="img-fluid m-2 rounded-circle"
                    />
                  ) : (
                    <img
                      src="https://eduwizer.com/static/media/Footer-Logo.378de601513e64a5401175629a647435.svg"
                      alt="sample image"
                      width="70%"
                      className="img-fluid m-2 rounded-circle"
                    />
                  )}
                  </div>
                  <div className="col-9">
                    <div className="d-flex justify-content-between">
                      <div className="title">{element.name}</div>
                      {element.sponsored && (
                        <div className="sponsored p-2">Sponsored Post</div>
                      )}
                    </div>
                    <div className="desc">{element.description}</div>
                    <div className="d-flex justify-content-between">
                      <div className="desc">Location : {element.city}</div>
                      <div className="desc">
                        Preferences : {element.preference}
                      </div>
                    </div>

                    <div className="d-flex justify-content-between">
                      <div className="desc">
                        Expected CTC : {ctcMapping[element.expectedCtc]}
                      </div>
                      <div className="desc">
                        Previous CTC : {ctcMapping[element.ctc]}
                      </div>
                    </div>
                    <div className="d-flex">
                      {element.tags?.map((tag) => {
                        return <div className="tag mx-2 p-2">{tag}</div>;
                      })}
                    </div>
                    <div className="border-bottom my-2"></div>
                    <div className="d-flex justify-content-end p-2">
                      {/* <Button
                      variant="warning"
                      className="text-nowrap shadow-lg m-btn"
                    >
                      Save For Later
                    </Button> */}
                      <Button
                        variant="warning"
                        className="text-nowrap shadow-lg ms-2 m-btn"
                      >
                        <Link to="/contact-us">Contact Now</Link>
                      </Button>
                      <Button
                        variant="warning"
                        className="text-nowrap shadow-lg ms-2 m-btn"
                      >
                        <a href="mailto:ngeduwizer@gmail.com?subject='Need Help'&body='Just popped in to say hello'">Email Us</a>
                      </Button>
                      <Button
                        variant="warning"
                        className="text-nowrap shadow-lg ms-2 m-btn"
                      >
                        <a href="tel:+919167780061">Call Us</a>
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          {(!data || !data?.length) && (
            <>
              <div className="text-center">
                {/* <h5>No data</h5> */}
                <h5 className="mt-2">For enquiries/ services connect with us</h5>
                <div>
                  <Button
                    onClick={() => navigate("/contact-us")}
                    className="w-50 mt-2"
                    variant="warning"
                  >
                    Get In Touch
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="col-2 p-4">
          <div className="d-flex flex-column">
            {sideData.map((element) => {
              return (
                <div className="side mb-3">
                  <strong>{element}</strong>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default CareerCounseling;
