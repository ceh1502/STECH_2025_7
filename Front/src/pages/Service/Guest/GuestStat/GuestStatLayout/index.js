import { Outlet } from 'react-router-dom';

const GuestStatLayout = () => {
    return (
        <div>
            <h1>Guest Stat Page</h1>
            <p>This is the Guest Stat page content.</p>
            <Outlet />
        </div>
    );
}   
export default GuestStatLayout;