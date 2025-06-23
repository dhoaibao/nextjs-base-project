import { Spin } from 'antd';

interface LoadingProps {
  size?: 'small' | 'default' | 'large';
}

const Loading = ({ size = 'default' }: LoadingProps) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <Spin size={size} />
      </div>
    </div>
  );
};

export default Loading;
