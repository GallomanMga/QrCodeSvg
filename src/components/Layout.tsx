
import { ReactNode } from "react";
import NavBar from "./Navbar";

interface LayoutProps { 
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps)  {
  return (
    <div>
      <NavBar />

      <div className="container">
        <div className="content">{children}</div>
      </div>
    </div>
  );
};


