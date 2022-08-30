import { useToast } from "@chakra-ui/toast";
import { createContext, useContext, useEffect, useState } from "react";
import { isBrowser } from "../utils/ssr";
import { useRouter } from "next/router";
import { axiosInstance } from "../services/axios";

const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const getCurrentUser = async () => {
    if (isBrowser) {
      try {
        const response = await axiosInstance.get("/api/auth/me");
        setAuthenticated(response.status === 200);

        if (response.data.status) {
          setUser(response.data.data);
          setLoading(false);
        }
      } catch (error) {
        setUser(false);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, [router.pathname]);

  const login = async payload => {
    try {
      if (isBrowser) {
        const { data } = await axiosInstance.post("/api/auth/login", {
          ...payload,
        });
        const { success, message } = data;

        if (!success) {
          toast({
            title: "Error",
            variant: "left-accent",
            position: "top-right",
            description: message,
            status: "error",
            isClosable: true,
            duration: 4000,
          });
          return;
        }

        if (success) {
          toast({
            title: "Successful Login",
            variant: "left-accent",
            position: "top-right",
            description: message,
            status: "success",
            duration: 4000,
            isClosable: true,
          });

          setUser(data.data);
          setAuthenticated(true);

          router.push("/menu");
        }
      }
    } catch (error) {
      const { message } = error.response.data;
      toast({
        title: "Error",
        variant: "left-accent",
        position: "top-right",
        description: message,
        status: "error",
        isClosable: true,
        duration: 4000,
      });
      return;
    }
  };

  const signup = async payload => {
    try {
      if (isBrowser) {
        const { data } = await axiosInstance.post("/api/auth/register", {
          ...payload,
        });
        const { success, message } = data;

        if (!success) {
          toast({
            title: "Error",
            variant: "left-accent",
            position: "top-right",
            description: message,
            status: "error",
            isClosable: true,
            duration: 4000,
          });
          return;
        }

        if (success) {
          toast({
            title: "Account created.",
            variant: "left-accent",
            position: "top-right",
            description: message,
            status: "success",
            duration: 4000,
            isClosable: true,
          });

          router.push("/login");
        }
      }
    } catch (error) {
      const { message } = error.response.data;
      toast({
        title: "Error",
        variant: "left-accent",
        position: "top-right",
        description: message,
        status: "error",
        isClosable: true,
        duration: 4000,
      });
      return;
    }
  };

  const logout = async () => {
    await axiosInstance.post("/api/auth/logout").then(() => {
      setUser(null);
      setAuthenticated(false);
    });
  };

  return (
    <authContext.Provider
      value={{ login, user, loading, signup, logout, setUser, isAuthenticated }}
    >
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(authContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export function useIsUser() {
  const context = useAuth();
  return context.user;
}
