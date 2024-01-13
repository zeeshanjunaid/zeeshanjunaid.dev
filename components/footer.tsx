import { Container } from "./container";
import React from "react";

export const Footer = () => {
  return (
    <footer className="py-8">
      <Container className="px-5 text-center flex justify-center">
        <div className="overflow-hidden rounded-xl px-3 sm:px-5 py-2 relative">
          <div className="backdrop-blur-md bg-lightBorderColor dark:bg-darkBorderColor opacity-25 absolute top-0 left-0 right-0 bottom-0 w-full h-full z-10" />
          <p className="text-center text-3 font-switzer font-light text-dark dark:text-light z-20 inline">
            &copy; {new Date().getFullYear()} Zeeshan Junaid. All rights
            reserved
          </p>
        </div>
      </Container>
    </footer>
  );
};
