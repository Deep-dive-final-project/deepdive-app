import Link from "next/link";
import styles from "./navItem.module.css";

interface NavItemProps {
  pathname: string;
  href: string;
  children: React.ReactNode;
}

export default function NavItem({ pathname, href, children }: NavItemProps) {
  // 현재 경로와 href가 일치하면 active 클래스를 추가
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`${styles.linkList} ${isActive ? styles.active : ""}`}
    >
      <li className={styles.list}>{children}</li>
    </Link>
  );
}
