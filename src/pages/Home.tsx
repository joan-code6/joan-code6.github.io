import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import ColorBends from '../components/ColorBends.jsx';
import SocialButton from '../components/SocialButton';
import { SiPython, SiDart, SiReact, SiHtml5 } from 'react-icons/si';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Animated background */}
      <div className="bg-canvas">
        <ColorBends
          rotation={45}
          speed={0.2}
          colors={["#dc2626","#8b5cf6"]}
          transparent
          autoRotate={0}
          scale={1}
          frequency={1}
          warpStrength={1}
          mouseInfluence={0.1}
          parallax={0.5}
          noise={0.1}
        />
      </div>

      {/* Main card */}
      <motion.div
        className="portfolio-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="card-content">
          {/* Left column - Profile */}
          <div className="left-column">

            {/* Profile picture */}
            <motion.div
              className="profile-pic"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <img 
                src="https://avatars.githubusercontent.com/u/172996447" 
                alt="Profile"
                className="profile-img"
              />
            </motion.div>

            {/* Name and handle */}
            <motion.div
              className="name-section"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h1 className="name">Bennet Joan Wegener</h1>
              <p className="handle">joan-code he/him</p>
            </motion.div>

            {/* Info section */}
            <motion.div
              className="info-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="info-item">
                <span className="info-label">Location</span>
                <span className="info-value">Germany</span>
              </div>
              <div className="info-item">
                <span className="info-label">Timezone</span>
                <span className="info-value">CET (UTC+1)</span>
              </div>
              <div className="info-item">
                <span className="info-label">School</span>
                <span className="info-value">Adolf Reichwein Gymnasium Heusenstamm</span>
              </div>
            </motion.div>
          </div>

          {/* Right column - Skills, Status, Social */}
          <div className="right-column">

            {/* Skills */}
            <motion.div
              className="skills-section"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <h3 className="section-title">Programming languages</h3>
              <div className="skills-grid">
                {[
                  { name: 'Python', Icon: SiPython, color: '#3776AB' },
                  { name: 'Dart / Flutter', Icon: SiDart, color: '#0175C2' },
                  { name: 'React', Icon: SiReact, color: '#61DAFB' },
                  { name: 'Java', Icon: ({ size = 22 }) => <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16.0497 8.44062C22.6378 3.32607 19.2566 0 19.2566 0C19.7598 5.28738 13.813 6.53583 12.2189 10.1692C11.1312 12.6485 12.9638 14.8193 16.0475 17.5554C15.7749 16.9494 15.3544 16.3606 14.9288 15.7645C13.4769 13.7313 11.9645 11.6132 16.0497 8.44062Z" fill="#E76F00"></path> <path d="M17.1015 18.677C17.1015 18.677 19.0835 17.0779 17.5139 15.3008C12.1931 9.27186 23.3333 6.53583 23.3333 6.53583C16.5317 9.8125 17.5471 11.7574 19.2567 14.1202C21.0871 16.6538 17.1015 18.677 17.1015 18.677Z" fill="#E76F00"></path> <path d="M22.937 23.4456C29.0423 20.3258 26.2195 17.3278 24.2492 17.7317C23.7662 17.8305 23.5509 17.9162 23.5509 17.9162C23.5509 17.9162 23.7302 17.64 24.0726 17.5204C27.9705 16.1729 30.9682 21.4949 22.8143 23.6028C22.8143 23.6029 22.9088 23.5198 22.937 23.4456Z" fill="#5382A1"></path> <path d="M10.233 19.4969C6.41312 18.9953 12.3275 17.6139 12.3275 17.6139C12.3275 17.6139 10.0307 17.4616 7.20592 18.8043C3.86577 20.3932 15.4681 21.1158 21.474 19.5625C22.0984 19.1432 22.9614 18.7798 22.9614 18.7798C22.9614 18.7798 20.5037 19.2114 18.0561 19.4145C15.0612 19.6612 11.8459 19.7093 10.233 19.4969Z" fill="#5382A1"></path> <path d="M11.6864 22.4758C9.55624 22.2592 10.951 21.2439 10.951 21.2439C5.43898 23.0429 14.0178 25.083 21.7199 22.8682C20.9012 22.5844 20.3806 22.0653 20.3806 22.0653C16.6163 22.7781 14.441 22.7553 11.6864 22.4758Z" fill="#5382A1"></path> <path d="M12.6145 25.6991C10.486 25.4585 11.7295 24.7474 11.7295 24.7474C6.72594 26.1222 14.7729 28.9625 21.1433 26.2777C20.0999 25.8787 19.3528 25.4181 19.3528 25.4181C16.5111 25.9469 15.1931 25.9884 12.6145 25.6991Z" fill="#5382A1"></path> <path d="M25.9387 27.3388C25.9387 27.3388 26.8589 28.0844 24.9252 28.6612C21.2481 29.7566 9.62093 30.0874 6.39094 28.7049C5.22984 28.2082 7.40723 27.5189 8.09215 27.3742C8.80646 27.2219 9.21466 27.2503 9.21466 27.2503C7.9234 26.3558 0.868489 29.0067 5.63111 29.7659C18.6195 31.8372 29.3077 28.8331 25.9387 27.3388Z" fill="#5382A1"></path> <path d="M28 28.9679C27.7869 31.6947 18.7877 32.2683 12.9274 31.8994C9.10432 31.6583 8.33812 31.0558 8.32691 31.047C11.9859 31.6402 18.1549 31.7482 23.1568 30.8225C27.5903 30.0016 28 28.9679 28 28.9679Z" fill="#5382A1"></path> </g></svg>, color: '#EA8220' },
                  { name: 'HTML & CSS', Icon: SiHtml5, color: '#E34F26' },
                ].map((skill, index) => (
                  <motion.span
                    key={skill.name}
                    className="skill-tag"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.08, type: 'spring', stiffness: 100 }}
                  >
                    <skill.Icon size={22} style={{ color: skill.color }} aria-hidden />
                    <span>{skill.name}</span>
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Social links */}
            <motion.div
              className="social-section"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <h3 className="section-title">Connect</h3>
              <div className="social-links">
                {[
                  { name: 'GitHub', url: 'https://github.com/joan-code6', type: 'github' },
                  { name: 'Discord', url: 'https://discord.gg/HADC4eBJHR', type: 'discord' },
                  { name: 'Email', url: 'mailto:bennet-wegener@web.de', type: 'email' },
                  { name: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Joke', type: 'wikipedia' },
                ].map((social, index) => (
                  <SocialButton
                    key={social.name}
                    name={social.name}
                    url={social.url}
                    type={social.type as 'github' | 'discord' | 'email' | 'wikipedia'}
                    delay={0.8 + index * 0.1}
                  />
                ))}
              </div>
            </motion.div>

            {/* Portfolio button */}
            <motion.button
              className="portfolio-btn"
              onClick={() => navigate('/portfolio')}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              whileHover={{ scale: 1.02, borderColor: "rgba(255, 255, 255, 0.4)" }}
              whileTap={{ scale: 0.98 }}
            >
              View Portfolio →
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Floating code elements */}
      <motion.div
        className="floating-code"
        style={{ top: '15%', right: '8%' }}
        animate={{
          y: [0, -15, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {'</>'}
      </motion.div>
      <motion.div
        className="floating-code"
        style={{ bottom: '15%', left: '8%' }}
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {'{}'}
      </motion.div>
    </div>
  );
};

export default Home;

