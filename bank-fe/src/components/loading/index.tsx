"use client";
import React from "react";
import { motion } from "framer-motion";
import BankLogo from "./bank-logo";

export interface LoadingScreenProps {
  portal?: boolean;
  className?: string;
  title?: string;
}

export function LoadingScreen({
  portal = true,
  className,
  title,
  ...other
}: LoadingScreenProps) {
  const content = (
    <div className="fixed inset-0 flex items-center justify-center">
      <div
        className={`h-[200px] w-[200px] flex items-center justify-center ${className}`}
        {...other}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <BankLogo />
          {title && (
            <div className="mt-4 text-lg text-muted-foreground">{title}</div>
          )}
        </motion.div>
      </div>
    </div>
  );

  return portal ? <>{content}</> : content;
}

export default LoadingScreen;
