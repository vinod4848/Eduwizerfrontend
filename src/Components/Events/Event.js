import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { getEvents } from "../../Services/api";
import "./Events.css";
function Events() {
  const [data, setData] = useState([]);

  const sideData = [
    {
      content: <img src="Integrate.jpg" width="337px" height="285px" />,
    },
    {
      title: "Sponsored Posts",
      content: "",
    },
    {
      title: "Ads",
      content: "",
    },
  ];

  const getEvent = async () => {
    try {
      const resp = await getEvents();
      setData(resp.data.data);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  useEffect(() => {
    getEvent();
  }, []);
  return (
    <Container fluid>
      <div className="row d-flex title mb-2 mx-4">Events</div>
      <div className="row">
        <div className="col-9">
          {data.map((element, index) => {
            return (
              <div className="shadow mb-4" key={`a-${index}`}>
                <div className="row">
                  <div className="col-3 p-2">
                    <img
                      src={element.image}
                      alt="image"
                      
                      width="100%"
                      className="m-2"
                    />
                  </div>
                  <div className="col-9 p-2">
                    <h4 style={{ color: "#1C115D" }}>
                      <strong>{element.title}</strong>
                    </h4>
                    <p className="m-1" style={{ color: "#1C115D" }}>
                      {element.description}
                    </p>
                    {/* <p className="m-1"> {element.location}</p>
                    <div className="d-flex justify-content-between m-2">
                      <div>{element.time}</div>
                      <div>{element.price}</div>
                    </div> */}
                  </div>
                </div>
                <div className="border-bottom"></div>
                {/* <div className="d-flex justify-content-center m-2 p-1">
                  <Link to="/events-details">See More</Link>
                </div> */}
              </div>
            );
          })}
        </div>
        <div className="col-3">
          <div className="d-flex flex-column">
            {sideData.map((element, index) => {
              return (
                <div className="side mb-3 p-2" key={`b-${index}`}>
                  <div>
                    <strong className="text-break">{element.title}</strong>
                  </div>
                  <div>{element.content}</div>
                  <div className="mt-2 adjust-words">
                    {/* For entries, connect with{" "}
                    <a href="tel:+919167780061">+91 9167780061</a> /{" "}
                    <a href="tel:+919820989758">+91 9820989758</a> or mail to{" "}
                    <a href="mailto:portaleduwizer@gmail.com">
                      portaleduwizer@gmail.com
                    </a>{" "}
                    / <a href="mailto:ceo@eduwizer.biz">ceo@eduwizer.biz</a> */}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Events;
