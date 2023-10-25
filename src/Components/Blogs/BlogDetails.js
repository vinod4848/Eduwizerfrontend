import draftToHtml from "draftjs-to-html";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getBlogsById } from "../../Services/api";
import "./Blogs.css";

function BlogDetails() {
  const sideData = ["Other Blogs", "Sponsored Posts", "Ads"];
  const { id } = useParams();

  const [data, setData] = useState();

  const getData = async (id) => {
    try {
      const resp = await getBlogsById(id);
      const some = draftToHtml(JSON.parse(resp.data.data[0].data));
      setData({ ...resp.data.data[0], data: some });
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  useEffect(() => {
    getData(id);
  }, [id]);

  return (
    <Container fluid>
      <div className="row">
        <div className="col-9">
          <div className="row">
            <div className="col-9">
              <div className="row d-flex title mb-2 m-0">{data?.title}</div>
              <b>{data?.description}</b>
              <p
                className="mt-2"
                dangerouslySetInnerHTML={{ __html: data?.data }}
              ></p>
            </div>
            <div className="col-3">
              <img
                src={data?.image}
                alt="image"
                width="100%"
                className="img-fluid"
              />
            </div>
          </div>
          <div className="row mt-3"></div>
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

export default BlogDetails;
