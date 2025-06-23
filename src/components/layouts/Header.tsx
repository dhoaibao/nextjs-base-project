import { Button, Layout } from 'antd';
import { SquareChevronLeft, SquareChevronRight } from 'lucide-react';

const { Header } = Layout;

interface HeaderComponentProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  colorBgContainer: string;
}

const HeaderComponent = ({ collapsed, setCollapsed, colorBgContainer }: HeaderComponentProps) => {
  const handleCollapseToggle = () => setCollapsed(!collapsed);

  const headerStyle = {
    padding: 0,
    background: colorBgContainer,
  };

  const buttonStyle = {
    fontSize: '16px',
    width: 64,
    height: 64,
  };

  return (
    <Header style={headerStyle}>
      <Button
        type="text"
        icon={collapsed ? <SquareChevronRight /> : <SquareChevronLeft />}
        onClick={handleCollapseToggle}
        style={buttonStyle}
      />
    </Header>
  );
};

export default HeaderComponent;
