import AdminLayout from '@src/components/layouts/AdminLayout';

const AdminLayoutPage = ({ children }: { children: React.ReactNode }) => {
  return <AdminLayout>{children}</AdminLayout>;
};

export default AdminLayoutPage;
