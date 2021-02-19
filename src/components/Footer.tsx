import style from './Footer.module.less';
import packages from '@/../package.json';
import GithubIcon from '@/icons/Github';
import React from 'react';

const Footer: React.FC<{}> = (props) => {
  return (
    <footer className={style.footer}>
      <div className={style.name}>Hangzhou Normal U Online Judge V3</div>
      <div className={style.version}>WebApp: {packages.version} | API: NaN</div>
      <div className={style.icon}>
        <a
          className={style.github}
          title="GitHub"
          target="_blank"
          rel="noreferrer noopener"
          href="https://github.com/hznu-oj"
        >
          <GithubIcon />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
