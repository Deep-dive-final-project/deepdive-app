import Link from "next/link";
import styles from "./navItem.module.css";

interface NavItemProps {
  pathname: string;
  href: string;
  children: React.ReactNode;
}

export default function NavItem({ pathname, href, children }: NavItemProps) {
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={`${styles.linkList} ${isActive ? styles.active : ""}`}
    >
      <li className={styles.list}>{children}</li>
    </Link>
  );
}
