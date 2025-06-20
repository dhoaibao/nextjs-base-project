import { Layout } from 'antd';

const { Footer: AntdFooter } = Layout;

const Footer = () => {
  return <AntdFooter> B-Shoes ©{new Date().getFullYear()} Created by Duong Hoai Bao</AntdFooter>;
};

export default Footer;
