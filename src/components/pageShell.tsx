import type { ReactNode } from "react";
import Header from "./header";
import Navbar from "./navbar";
import CategoryLine from "./categoryLine";

interface PageShellProps {
  children: ReactNode;
  showCategoryLine?: boolean;
}

export default function PageShell({
  children,
  showCategoryLine = true,
}: PageShellProps) {
  return (
    <>
      <Header />
      {showCategoryLine && <CategoryLine />}
      <main className="page-main">{children}</main>
      <Navbar />
    </>
  );
}
