import { useState, useEffect } from "react";

export function useSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((prev) => !prev);

  // ESC 키로 닫기 + 클린업으로 메모리 누수 방지
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // 사이드바 열릴 때 배경 스크롤 방지
  // overflow: hidden 으로 body 스크롤을 막는다
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return { isOpen, open, close, toggle };
}
