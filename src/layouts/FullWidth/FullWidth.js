import PropTypes from 'prop-types'
import Header from '~/layouts/components/Header'
import Sidebar from '~/layouts/components/Sidebar'

import classNames from 'classnames/bind'
import styles from './FullWidth.module.scss'

const cx = classNames.bind(styles)

function FullWidth({ children }) {
    return (
        <div className="full-width">
            <Header />
            <div className="container-fluid">
                <div className={cx('wrapper')}>
                    <Sidebar />
                    <div className={cx('content')}>{children}</div>
                </div>
            </div>
        </div>
    )
}

FullWidth.propTypes = {
    children: PropTypes.node.isRequired,
}

export default FullWidth
