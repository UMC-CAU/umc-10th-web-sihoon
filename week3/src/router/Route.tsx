import type { ComponentType } from 'react';

//각 경로에서 보여줄 컴포넌트를 받는 역할

interface RouteProps {
  path: string;
  component: ComponentType;
}

export const Route = ({ component: Component }: RouteProps) => {
  return <Component />;
};