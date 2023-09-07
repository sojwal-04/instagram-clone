import './footer.scss'

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <ul className="footer-links">
          <li>
            <Link to="/about" className="link">
              About
            </Link>
          </li>
          <li>
            <Link to="/blog" className="link">
              Blog
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="link">
              Jobs
            </Link>
          </li>
          <li>
            <Link to="/help" className="link">
              Help
            </Link>
          </li>
          <li>
            <Link to="/api" className="link">
              API
            </Link>
          </li>


          <li>
            <Link to="/privacy" className="link">
              Privacy
            </Link>
          </li>
          <li>
            <Link to="/terms" className="link">
              Terms
            </Link>
          </li>
          <li>
            <Link to="/locations" className="link">
              Locations
            </Link>
          </li>
          <li>
            <Link to="/lite" className="link">
              Instagram Lite
            </Link>
          </li>
          <li>
            <Link to="/threads" className="link">
              Threads
            </Link>
          </li>

          <li>
            <Link to="/contact" className="link">
              Contact uploading and non-users
            </Link>
          </li>
          <li>
            <Link to="/meta-verified" className="link">
              Meta Verified
            </Link>
          </li>
        </ul>
      </div>

      <div className="footer-end">
        <div className="footer-language">
          <select>
            <option>English (UK)</option>
            <option>English (USA)</option>
          </select>
        </div>
        <div className="footer-copyright">
          <span>&copy; 2023 Instagram from Meta</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
