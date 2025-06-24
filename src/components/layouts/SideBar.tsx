import { Layout, Menu } from 'antd';
import { LayoutDashboard, Package, User, List } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useThemeStore } from '@src/stores/theme';
import { usePathname } from 'next/navigation';

const { Sider } = Layout;

interface SideBarComponentProps {
  collapsed: boolean;
}

const menuItems = [
  {
    key: 'dashboard',
    icon: <LayoutDashboard />,
    label: 'Dashboard',
  },
  {
    key: 'products-management',
    icon: <Package />,
    label: 'Products Management',
    children: [
      {
        key: 'products',
        icon: <List />,
        label: 'List Products',
      },
    ],
  },
  {
    key: 'users',
    icon: <User />,
    label: 'Users',
  },
];

const SideBarComponent = ({ collapsed }: SideBarComponentProps) => {
  const theme = useThemeStore()(state => state.theme);
  const router = useRouter();
  const pathname = usePathname();

  const defaultSelectedKeys = pathname.split('/').filter(Boolean) || ['dashboard'];

  const handleMenuClick = ({ key }: { key: string }) => {
    router.push(`/${key}`);
  };

  return (
    <Sider width={250} trigger={null} theme={theme} collapsible collapsed={collapsed}>
      <div className="h-16 m-4 bg-gray-700 rounded-lg flex items-center justify-center">
        <div className="text-white font-bold text-lg">{collapsed ? 'A' : 'Admin'}</div>
      </div>
      <Menu
        theme={theme}
        mode="inline"
        defaultSelectedKeys={defaultSelectedKeys}
        onClick={handleMenuClick}
        items={menuItems}
      />
    </Sider>
  );
};

export default SideBarComponent;
