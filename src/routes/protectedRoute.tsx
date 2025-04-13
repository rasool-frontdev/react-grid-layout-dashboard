import React, { FC } from 'react'
import { Navigate } from "react-router-dom";

import { useAuthStore } from "@/store/auth.store";

const ProtectedRoute:FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated()) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return (
    <>{children}</>
  )
}

export default ProtectedRoute