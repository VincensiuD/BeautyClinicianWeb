import mainVideo from '../assets/mainVideo.mp4';

export const Homepage = () => {
    return (
      <div className='home-main-div' >
        <div className={'main-video-container'}>
        <video
          className='main-video'
          src={mainVideo}
          controls
          autoPlay
          muted
          loop
          playsInline
        />
        <div className='video-overlay'>
        <h1>Welcome to Serenity Beauty Clinic</h1>
        <p>Your trusted destination for advanced skincare and cosmetic treatments.</p>
        </div>
      </div>
      </div>
    );
  };