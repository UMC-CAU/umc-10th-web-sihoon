import type { MouseEvent, ReactNode } from 'react';

//새로고침 없이 URL만 바꾸는 역할

interface LinkProps {
  to: string;
  children: ReactNode;
}

export const Link = ({ to, children }: LinkProps) => {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (window.location.pathname === to) return;

    window.history.pushState({}, '', to);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  );
};