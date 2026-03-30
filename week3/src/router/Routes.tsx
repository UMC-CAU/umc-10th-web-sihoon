import {Children, cloneElement, isValidElement,
        useEffect, useMemo, useState, type ReactElement, type ReactNode,
} from 'react';

interface RouteProps {
  path: string;
  component: React.ComponentType;
}

interface RoutesProps {
  children: ReactNode;
}

export const Routes = ({ children }: RoutesProps) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleRouteChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  const activeRoute = useMemo(() => {
    const routes = Children.toArray(children).filter(
      (child): child is ReactElement<RouteProps> =>
        isValidElement<RouteProps>(child) &&
        typeof child.props.path === 'string'
    );

    return routes.find((route) => route.props.path === currentPath);
  }, [children, currentPath]);

  if (!activeRoute) return <h1>404</h1>;

  return cloneElement(activeRoute);
};