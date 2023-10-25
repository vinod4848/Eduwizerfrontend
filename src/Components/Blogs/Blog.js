import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getBlogs } from "../../Services/api";
import "./Blogs.css";
function Blogs() {
  const [data, setData] = useState([]);
  // const data = [
  //   {
  //     id: 1,
  //     icon: "/assets/images/png/nikki.jpeg",
  //     title: "The Woman Who Walked Her Dreams",
  //     description:
  //       "Dreams turn into reality when the effort you put are in sincerity. Hard work triumphs. But the time it takes to triumph is long and not so easy.",
  //     author: "Dr. Nikkie Grover",
  //     category: "",
  //   },
  //   {
  //     id: 2,
  //     icon: "/assets/images/png/blog_2.jpeg",
  //     title: "This World Environment Day, let’s go beyond planting trees!",
  //     description:
  //       "Environment Day reminds me that true celebration lies in conscious and sustainable living.",
  //     author: "Reema Sonkar",
  //     category: "",
  //   },
  //   {
  //     id: 3,
  //     icon: "/assets/images/png/moses_collins.jpeg",
  //     title: "Educating others in various aspect is a skill",
  //     description:
  //       "Education is not only the classroom learning in schools and colleges. Every minute we learn something new in life.",
  //     author: "Moses Collins",
  //     category: "",
  //   },
  //   // {
  //   //   icon: "https://img.photographyblog.com/reviews/kodak_pixpro_fz201/photos/kodak_pixpro_fz201_01.jpg",
  //   //   title: "Title",
  //   //   description:
  //   //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dignissim rutrum dui quis malesuada. Nam id dapibus augue. Nulla convallis condimentum orci, et varius eros semper in Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dignissim rutrum dui quis malesuada. Nam id dapibus augue.",
  //   //   author: "author",
  //   //   category: "category",
  //   // },
  //   // {
  //   //   icon: "https://img.photographyblog.com/reviews/kodak_pixpro_fz201/photos/kodak_pixpro_fz201_01.jpg",
  //   //   title: "Title",
  //   //   description:
  //   //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dignissim rutrum dui quis malesuada. Nam id dapibus augue. Nulla convallis condimentum orci, et varius eros semper in Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dignissim rutrum dui quis malesuada. Nam id dapibus augue.",
  //   //   author: "author",
  //   //   category: "category",
  //   // },
  //   // {
  //   //   icon: "https://img.photographyblog.com/reviews/kodak_pixpro_fz201/photos/kodak_pixpro_fz201_01.jpg",
  //   //   title: "Title",
  //   //   description:
  //   //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dignissim rutrum dui quis malesuada. Nam id dapibus augue. Nulla convallis condimentum orci, et varius eros semper in Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dignissim rutrum dui quis malesuada. Nam id dapibus augue.",
  //   //   author: "author",
  //   //   category: "category",
  //   // },
  //   // {
  //   //   icon: "https://img.photographyblog.com/reviews/kodak_pixpro_fz201/photos/kodak_pixpro_fz201_01.jpg",
  //   //   title: "Title",
  //   //   description:
  //   //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dignissim rutrum dui quis malesuada. Nam id dapibus augue. Nulla convallis condimentum orci, et varius eros semper in Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dignissim rutrum dui quis malesuada. Nam id dapibus augue.",
  //   //   author: "author",
  //   //   category: "category",
  //   // },
  // ];

  const getData = async () => {
    try {
      const resp = await getBlogs();
      setData(resp.data.data);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const sideData = [
    {
      content: <img src="Integrate.jpg" width="337px" height="285px" />,
    },
    {
      title: "Other Events",
      content: "",
    },
    {
      title: "Ads",
      content: "",
    },
  ];

  return (
    <Container fluid>
      <div className="row d-flex title mb-2 mx-4">Blogs</div>
      <div className="row">
        <div className="col-9 row m-0 h-100">
          {data.map((element) => {
            return (
              <div className="shadow mb-4 col-sm-3 p-4 border-css mx-2">
                <div className="row">
                  <div className="col-4">
                    <img
                      src={element.image}
                      alt="image"
                      width="100%"
                      className="img-fluid m-2"
                    />
                  </div>
                  <div className="col-8 text-end">
                    <p className=" p-0 m-0 title">{element.title}</p>
                    <p className="text p-0 m-0 ">
                      <small>{element.author}</small>
                    </p>
                    <p className="text p-0 m-0 ">
                      <small>{element.category}</small>
                    </p>
                  </div>
                </div>
                <div className="border-bottom"></div>
                <p className="m-1" style={{ color: "#1C115D" }}>
                  {element.description}
                </p>
                <div className="border-bottom"></div>
                <div className="d-flex justify-content-center m-2 p-1">
                  <Link to={`/blogs-details/${element._id}`}> Know More</Link>
                </div>
              </div>
            );
          })}
        </div>
        <div className="col-3">
          <div className="d-flex flex-column">
            {sideData.map((element) => {
              return (
                <div className="side mb-3 p-2">
                  <div>
                    <strong className="text-break">{element.title}</strong>
                  </div>
                  <div>{element.content}</div>
                  <div className="mt-2 adjust-words">

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

export default Blogs;
