import { useNavigate } from "react-router-dom";

export const BookNowBtn = () => {
  const navigate = useNavigate();

  return (
    <button className={"book-now-btn"} onClick={()=>navigate('/booking')}>
      Book Now
    </button>
  );
};
