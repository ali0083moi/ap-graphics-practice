"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const CustomCursor = dynamic(() => import("./CustomCursor"), {
  ssr: false,
});

const SmoothScroll = dynamic(() => import("./SmoothScroll"), {
  ssr: false,
});

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout = ({ children }: ClientLayoutProps) => {
  return (
    <>
      <CustomCursor />
      <SmoothScroll>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </SmoothScroll>
    </>
  );
};

export default ClientLayout;
