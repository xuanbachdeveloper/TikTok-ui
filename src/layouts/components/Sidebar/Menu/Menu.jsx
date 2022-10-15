import PropTypes from 'prop-types';
import './Menu.module.scss';

function Menu({ children }) {
    return <nav className="Menu">{children}</nav>;
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Menu;
