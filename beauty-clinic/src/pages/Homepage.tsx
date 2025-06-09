import mainVideo from "../assets/mainVideo.mp4";
import aboutUsImage from "../assets/aboutUsImage.png";
import { useNavigate } from "react-router-dom";
import { TreatmentCard } from "../component/TreatmentCard";
import massage from "../assets/Massage.png";

export const Homepage = () => {
  const navigate = useNavigate();
  return (
    <div className="home-main-div">
      <div className={"main-video-container"}>
        <video
          className="main-video"
          src={mainVideo}
          controls
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="video-overlay">
          <h1>Serenity Beauty Sanctuary</h1>
          <p className="home-slogan">We are not a beauty clinic!</p>
          <p className="home-slogan">We are a sanctuary of transformation.</p>
          <p className="home-slogan">
            We are your trusted destination for advanced skincare and cosmetic
            treatments.
          </p>
        </div>
      </div>
      <div className={"about-us-div"}>
        <div className={"about-us-text"}>
          <p className="headline">
            Welcome to Serenity, where we are the crossover result of science,
            art, and magic.
          </p>
          <p>
            We are founded on the revolutionary idea that you deserve to glow
            like the divine being you are. Our clinic employs techniques so
            advanced, even NASA would raise an eyebrow. We orchestrate
            symphonies of skin treatment that makes you look younger than a
            newborn. Our team of cosmetic alchemists who combine clinical
            precision with an uncanny sixth sense for beauty.
          </p>
          <p>
            Our commitment? Radiance without compromise. We blend turquoise
            tranquility with cutting-edge technology in an atmosphere so serene,
            even your stress will file for early retirement. If you've ever
            dreamed of skin so luminous it could guide ships through fog,
            Serenity is your final destination.
          </p>
          <p>
            Dare to glow? We thought so.{" "}
            <span
              className="book-now-span"
              onClick={() => navigate("/booking")}
            >
              Book now!
            </span>
          </p>
        </div>
        <div className={"about-us-image"}>
          <img
            src={aboutUsImage}
            alt="Glowing Face"
            className="about-us-image"
          />
        </div>
      </div>
      <div className="treatments-main-div">
        <h2>Our Treatments</h2>
        <div className="treatments">
          <TreatmentCard
            title={"PRP"}
            description={"..."}
            image={massage}
            link={""}
          />
          <TreatmentCard
            title={"Thread Lift"}
            description={"..."}
            image={massage}
            link={""}
          />
          <TreatmentCard
            title={"Massage"}
            description={"..."}
            image={massage}
            link={""}
          />
          <TreatmentCard
            title={"Pedicure"}
            description={"..."}
            image={massage}
            link={""}
          />
        </div>
      </div>
      <div className="locations-main-div">
        <h2>Our Locations</h2>
        <div className="locations">
          <div>
            <h3>Serenity CBD</h3>
            <p>123 Queen St, Sydney NSW</p>
            <p>Mon - Sun: 9AM - 6PM</p>
          </div>
          <div>
            <h3>Serenity Chatswood</h3>
            <p>88 Northern Blvd, Chatswood NSW</p>
            <p>Tue - Sat: 9AM - 6PM</p>
            <p>Sun: 10AM - 2PM</p>
          </div>
          <div>
            <h3>Serenity Parramatta</h3>
            <p>42 Garden Lane, Parramatta NSW</p>
            <p>Mon - Fri: 9AM - 5PM</p>
            <p>Sat - Sun: 10AM - 2PM</p>
          </div>
          <div>
            <h3>Serenity Bondi</h3>
            <p>4 Old South Head Rd, Bondi NSW</p>
            <p>Wed - Sun: 9AM - 7PM</p>
          </div>
        </div>
      </div>
    </div>
  );
};
