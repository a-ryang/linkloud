import { GithubLogo } from "../icons";

import classes from "./footer.module.css";

export function Footer() {
  return (
    <footer className={classes.footer}>
      <div className={classes["footer-inner"]}>
        <div className={classes.copyright}>Copyright linkloud. All rights reserved</div>
        <div className={classes.github}>
          <a
            aria-label="linkloud github"
            target="_blank"
            href="https://github.com/linkloud/linkloud.io"
            rel="noopener noreferrer"
          >
            <GithubLogo size={24} color="gray" />
          </a>
        </div>
      </div>
    </footer>
  );
}
