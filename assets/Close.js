import React from "react";
import { SvgXml } from "react-native-svg";
export default function Close() {
  const svg = `<svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M19 1.88L17.12 0L9.66671 7.45333L2.21337 0L0.333374 1.88L7.78671 9.33333L0.333374 16.7867L2.21337 18.6667L9.66671 11.2133L17.12 18.6667L19 16.7867L11.5467 9.33333L19 1.88Z" fill="#00396F"/>
  </svg>
  `;
  const CloseSvg = () => <SvgXml xml={svg} width="60%" height="60%" />;

  return <CloseSvg />;
}
