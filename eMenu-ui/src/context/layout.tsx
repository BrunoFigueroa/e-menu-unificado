import { PropsWithChildren, ReactNode, createContext, useContext, useState } from "react";

export type Content = {
  title: string;
  node: ReactNode;
} | null;

export type LayoutContextType = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  sheetContent: Content;
  setSheetContent: (sheetContent: Content) => void;
  dialogContent: Content;
  setDialogContent: (dialogContent: Content) => void;
};

const LayoutContext = createContext<LayoutContextType>({
  isLoading: false,
  setIsLoading: (isLoading: boolean) => {},
  sheetContent: null,
  setSheetContent: (sheetContent: Content) => {},
  dialogContent: null,
  setDialogContent: (dialogContent: Content) => {},
});

const LayoutProvider = (props: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sheetContent, setSheetContent] = useState<Content>(null);
  const [dialogContent, setDialogContent] = useState<Content>(null);

  const layoutContextValue = {
    isLoading,
    setIsLoading,
    sheetContent,
    setSheetContent,
    dialogContent,
    setDialogContent,
  };

  return <LayoutContext.Provider value={layoutContextValue}>{props.children}</LayoutContext.Provider>;
};

export const useLayout = () => useContext(LayoutContext);

export default LayoutProvider;