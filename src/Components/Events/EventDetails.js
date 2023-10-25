import { Container } from "react-bootstrap";
import "./Events.css";
function EventDetails() {
  const sideData = ["Other Blogs", "Sponsored Posts", "Ads"];

  return (
    <Container fluid>
      <div className="row">
        <div className="col-9">
          <div className="row">
            <div className="col-9">
              <div className="row d-flex title mb-2">Event Title</div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur dignissim rutrum dui quis malesuada. Nam id dapibus
                augue. Nulla convallis condimentum orci, et varius eros semper
                inLorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur dignissim rutrum dui quis malesuada. Nam id dapibus
                augue. Nulla convallis condimentum orci, et varius eros semper
                inLorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur dignissim rutrum dui quis malesuada. Nam id dapibus
                augue. Nulla convallis condimentum orci, et varius eros semper
                inLorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur dignissim rutrum dui quis malesuada. Nam id dapibus
                augue. Nulla convallis condimentum orci, et varius eros semper
                inLorem ipsum dolor sit amet, consectetur
              </p>
            </div>
            <div className="col-3">
              <img
                src="https://img.photographyblog.com/reviews/kodak_pixpro_fz201/photos/kodak_pixpro_fz201_01.jpg"
                alt="image"
                width="100%"
                className="img-fluid"
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-3">
              <img
                src="https://img.photographyblog.com/reviews/kodak_pixpro_fz201/photos/kodak_pixpro_fz201_01.jpg"
                alt="image"
                width="100%"
                className="img-fluid"
              />
            </div>
            <div className="col-9">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur dignissim rutrum dui quis malesuada. Nam id dapibus
                augue. Nulla convallis condimentum orci, et varius eros semper
                inLorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur dignissim rutrum dui quis malesuada. Nam id dapibus
                augue. Nulla convallis condimentum orci, et varius eros semper
                inLorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur dignissim rutrum dui quis malesuada. Nam id dapibus
                augue. Nulla convallis condimentum orci, et varius eros semper
                inLorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur dignissim rutrum dui quis malesuada. Nam id dapibus
                augue. Nulla convallis condimentum orci, et varius eros semper
                inLorem ipsum dolor sit amet, consectetur
              </p>
            </div>
          </div>
        </div>
        <div className="col-3">
          <div className="d-flex flex-column">
            {sideData.map((element, index) => {
              return (
                <div className="side mb-3" key={`b-${index}`}>
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

export default EventDetails;
