import React, { ReactNode, Fragment, useState } from "react";
import { useLayout } from "@/context/layout";
import Footer from "../footer";
import Header from "../header";
import { SessionProvider } from "next-auth/react";

type Props = {
  showBreadcrumb: boolean;
  children: ReactNode;
};

const LandingLayout = ({ showBreadcrumb, children }: Props) => {
  const {
    isLoading,
    sheetContent,
    setSheetContent,
    dialogContent,
    setDialogContent,
  } = useLayout();
  const showSheet = sheetContent !== null;
  const showDialog = dialogContent !== null;

  return (
    <SessionProvider>
      <Fragment>
        <Header />
        {children}
        <Footer />
      </Fragment>
    </SessionProvider>
  );
};

export default LandingLayout;
