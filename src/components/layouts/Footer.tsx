import { Layout } from 'antd';

const { Footer: AntdFooter } = Layout;

const FooterComponent = () => {
  const currentYear = new Date().getFullYear();

  return (
    <AntdFooter className="text-center">
      Admin Dashboard ©{currentYear} Created by Duong Hoai Bao
    </AntdFooter>
  );
};

export default FooterComponent;
