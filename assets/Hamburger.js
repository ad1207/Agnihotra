import React from "react";
import { SvgXml } from "react-native-svg";
export default function Hamburger({ dark }) {
  const svg = dark
    ? `<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.5 6H21.5V8H3.5V6ZM3.5 11H21.5V13H3.5V11ZM3.5 16H21.5V18H3.5V16Z" fill="#97D4FF"/>
    </svg>
    `
    : `<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.5 6H21.5V8H3.5V6ZM3.5 11H21.5V13H3.5V11ZM3.5 16H21.5V18H3.5V16Z" fill="black"/>
    </svg>
      
    `;
  const HamburgerSvg = () => <SvgXml xml={svg} width="60%" height="60%" />;

  return <HamburgerSvg />;
}
