import "./index.css";

import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import Subscribe from "../../Components/Subscribe";
import { contactUs } from "../../Services/api";
import { toast } from "react-toastify";
import CustomToast from "../Common/CustomToast";

const ContactUs = () => {
  const [name, setName] = useState("");
  const ref = useRef(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  console.log(message, "msgg")
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

  const sendContactUsMessage = async () => {
    if(name.length===0){
      alert("enter your name")
    }else if(email.length===0){
      alert("enter your email")
    }else if(phone.length===0){
      alert("enter your phone number")
    }else if(message.length===0){
      alert("enter a message")
    }
    console.log("send message");
    await contactUs({
      name,
      email,
      phone,
      message,
    });
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
    toast(
      <CustomToast
        type="success"
        message={`Thank you.
    Our team will get back to you shortly`}
      />
    );
  };

  return (
    <div className="contact-us page">
      <section className="opener row">
        <div
          className={
            isMobile ? "col-md-6 col-sm-12 text-center" : "col-md-6 col-sm-12"
          }
        >
          <div className="opener-content-head mt-2">Contact Us</div>
          <h1 className="opener-title mt-2">
            <b>
              We'd love to<br></br>hear from you.
            </b>
          </h1>
          <div
            className={isMobile ? "opener-foot fs-1 mt-2" : "opener-foot mt-2"}
          >
            So, let’s have a conversation.
          </div>
          <Button
            onClick={(e) => {
              ref.current?.scrollIntoView({ behavior: "smooth" });
            }}
            className="w-50"
            variant="warning"
          >
            Get In Touch
          </Button>
        </div>
        <div className="col-md-6 col-sm-12 text-end">
          <img
            src="/assets/images/png/contact-us.png"
            style={{ width: "100%" }}
          ></img>
        </div>
      </section>

      <section className="other-ways">
        <h2 className="other-ways-head">Other Ways To Reach Out</h2>
        <div className="other-ways-content">
          <div className="other-way">
            <div className="text">
              <div>
                <a href="tel:+919167780061">+91 9167780061</a>
              </div>
              <div>
                <a href="tel:+919167864061">+91 9167864061</a>
              </div>
            </div>
            <img className="icon" alt="" src="/assets/images/svg/phone.svg" />
          </div>
          {/* <div className="other-way">
            <div className="text">+91 123456789</div>
            <img className="icon" alt="" src="/assets/images/svg/phone.svg" />
          </div> */}
          <div className="other-way">
            <div className="text">
              <div>
                <a href="mailto:recruitments@eduwizer.biz">
                  recruitments@eduwizer.biz
                </a>
              </div>
              <div>
                <a href="mailto:info@eduwizer.biz">info@eduwizer.biz</a>
              </div>
              <div>
                <a href="mailto:ceo@eduwizer.biz">ceo@eduwizer.biz</a>
              </div>
            </div>
            <img className="icon" alt="" src="/assets/images/svg/email.svg" />
          </div>
          <div className="other-way">
            <div className="text">
              <a
                href="https://www.eduwizer.com/"
                target="_blank"
                rel="noreferrer"
              >
                www.eduwizer.com
              </a>
            </div>
            <img className="icon" alt="" src="/assets/images/png/website.png" />
          </div>
          <div className="other-way">
            <div className="text" style={{color: '#1c115d'}}>
              Enam Sambhav, C-20, G Block Rd, G Block BKC, Bandra Kurla Complex, Bandra Eat, Mumbai. Maharashtra 400051
            </div>
            {/* <img className="icon" alt="" src="/assets/images/png/website.png" /> */}
          </div>
        </div>
      </section>

      <section className="follow-us">
        <h2 className="follow-us-head">Follow Us </h2>
        <div className="follow-us-content">
          <a
            href="https://www.facebook.com/Eduwizer/"
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="icon"
              alt=""
              src="/assets/images/svg/facebook.svg"
            />
          </a>

          {/* <img className="icon" alt="" src="/assets/images/svg/youtube.svg" />
          <img className="icon" alt="" src="/assets/images/svg/twitter.svg" /> */}
          <a
            href="https://www.linkedin.com/in/dr-nikkie-grover-37bb5521/"
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="icon"
              alt=""
              src="/assets/images/svg/LinkedIn_icon_circle.svg"
            />
          </a>
          <a
            href="https://www.instagram.com/eduwizer_social_media_team_/"
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="icon"
              alt=""
              src="/assets/images/svg/instagram.svg"
            />
          </a>
        </div>
      </section>

      <Subscribe bg={false} subHead={false}></Subscribe>

      <div className="message-us no-side-gap mb-2 py-4" ref={ref}>
        <div className="message-us-container">
          <div className="message-head row m-0">
            <div className="m-input-container col-12 col-md-12 col-lg-6">
              <input
                required
                className="m-input"
                value={name}
                placeholder=""
                onChange={(evt) => setName(evt.target.value)}
              />
              <div className="title">Your Name</div>
            </div>
            <div className="m-input-container  col-12 col-md-12 col-lg-6">
              <input
                required
                className="m-input"
                value={phone}
                type="number"
                placeholder=""
                onChange={(evt) => setPhone(evt.target.value)}
              />
              <div className="title">Phone number</div>
            </div>
          </div>
          <div className="message-head row m-0">
            <div className="m-input-container  col-12 col-md-12 col-lg-12">
              <input
                required
                className="m-input"
                value={email}
                placeholder=""
                onChange={(evt) => setEmail(evt.target.value)}
              />
              <div className="title">Email Address</div>
            </div>
          </div>
          <div className="message-head row m-0">
            <div className=" m-input-container  col-12 col-md-12 col-lg-12">
              <textarea
                required
                className="m-input"
                value={message}
                placeholder=""
                onChange={(evt) => setMessage(evt.target.value)}
              />
              <div className="title">Your Message</div>
            </div>
          </div>
          <div className="message-head row m-0">
            <Button variant="warning" type = "submit" onClick={() => sendContactUsMessage()}>
              <div className="btn-text p-1.5">Send Message</div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
