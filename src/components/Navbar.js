import React from "react";
import "./Navbar.css";

const Navbar = () => {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li onClick={() => scrollToSection("home")}>HOME</li>
        <li onClick={() => scrollToSection("favorites")}>FAVORITE RECIPES</li>
        <li onClick={() => scrollToSection("footer")}>ABOUT US</li> {/* Fixed to target footer */}
      </ul>
    </nav>
  );
};

export default Navbar;
