import styles from './Footer.module.scss';
import classNames from 'classnames/bind';
import FooterItem from './FooterItem/FooterItem';
const cx = classNames.bind(styles);
function Footer() {
    return (
        <footer className={cx('wrapper')}>
            <FooterItem text="About" />
            <FooterItem text="Newsroom" />
            <FooterItem text="Contact" />
            <FooterItem text="Careers" />
            <FooterItem text="ByteDance" />
            <FooterItem text="TikTok for Good" />
            <FooterItem text="Advertise" />
            <FooterItem text="Developers" />
            <FooterItem text="Transparency" />
            <FooterItem text="Help" />
            <FooterItem text="Safety" />
            <FooterItem text="Terms" />
            <FooterItem text="Privacy" />
            <FooterItem text="Creator" />
            <FooterItem text="PortalCommunity Guidelines" />
            <div className={cx('footer-copyright')}>© 2022 TikTok</div>
        </footer>
    );
}

export default Footer;
