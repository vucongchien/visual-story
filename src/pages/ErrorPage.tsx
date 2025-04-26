import React from "react";
import { Button } from "../components";
import { Link } from "react-router-dom";

export const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center flex-col h-screen text-[var(--color4)]">
      <div className="text-9xl mb-6">404</div>

      <div className="flex items-center justify-center flex-col">
        <h1 className="text-3xl font-bold mb-4">Whoops, that page is gone.</h1>
        <Link to={"/dashboard"}> 
        <Button>
          GO HOME
        </Button>
        </Link>

      </div>
    </div>
  );
};
