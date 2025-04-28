import React from "react";
import { Button } from "../components";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

export const ErrorPage = () => {
  return (
    <MainLayout>
          <div className="flex items-center justify-center flex-col h-screen text-[var(--color4)]">
              <img className="absolute opacity-10 pointer-events-none"  src="error_chan.jpeg"></img>
      <div className="text-9xl mb-6">404</div>

      <div className="flex items-center justify-center flex-col">
        <h1 className="text-3xl font-bold mb-4">Whoops, Lỗi rồi TT.</h1>

        <Link to={"/dashboard"}> 
        <Button>
          GO HOME
        </Button>
        </Link>

      </div>
      
    </div>
    </MainLayout>

  );
};
