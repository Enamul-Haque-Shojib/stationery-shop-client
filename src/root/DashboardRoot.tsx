
import DashboardLayout from '../layout/DashboardLayout';
import ProtectedRoutes from '../layout/ProtectedRoutes';

const DashboardRoot = () => {
    return (
        <div>
            <ProtectedRoutes role={undefined}>
            <DashboardLayout></DashboardLayout>
            </ProtectedRoutes>
        </div>
    );
};

export default DashboardRoot;