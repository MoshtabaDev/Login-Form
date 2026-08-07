import styles from "./NotFound.module.css";
import { Link } from "react-router-dom";

import errorPic from "../../Pics/404.png";

function NotFound() {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.errorPic}>
          <img src={errorPic} alt="404Pic" />
        </div>
        <div className={styles.titr}>
          <h2>Page Not Found</h2>
          <p>
            The page you're looking for doesn't exist or may have been moved.
          </p>
        </div>
        <div className={styles.buttons}>
          <Link to={"../Login"} className={styles.button}>
            Go to Login
          </Link>
          <Link to={"../"} className={styles.button}>
            Create Account
          </Link>
        </div>
        <br />
      </div>
    </div>
  );
}

export default NotFound;
