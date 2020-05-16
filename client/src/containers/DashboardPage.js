import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import Dashboard from '../components/dashboard/Dashboard';
import Footer from '../components/footer/Footer';
import Cookies from 'js-cookie';

const DashboardPage = props => {
    // const [loader, setLoader] = React.useState(true);

    // React.useEffect(() => {
    //     const jwtCookie = Cookies.get('jwt_mltst');

    //     console.log('cookie', jwtCookie);
    //     if (jwtCookie !== undefined) {
    //         setLoader(false);
    //     } else {
    //         props.history.push('/sign-in');
    //     }
    // }, []);

    // if (loader) {
    //     return <div style={{ width: '100%', height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><CircularProgress size={70} /></div>;
    // }

    return (
        <React.Fragment>
            <Dashboard />
        </React.Fragment>
    );
}

export default DashboardPage;