'use client';

import dynamic from 'next/dynamic';
import Loading from '@src/components/ui/Loading';

const AdminLayout = dynamic(() => import('@src/components/layouts/AdminLayout'), {
  ssr: false,
  loading: () => <Loading size="large" />,
});

const AdminLayoutPage = ({ children }: { children: React.ReactNode }) => {
  return <AdminLayout>{children}</AdminLayout>;
};

export default AdminLayoutPage;
