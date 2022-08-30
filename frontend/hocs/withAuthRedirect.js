import { useRouter } from "next/router";
import { useAuth } from "../context/auth";
import LoadingScreen from "../components/Layout/Loading";
import { useToast } from "@chakra-ui/react";

function DefaultLoadingFallback() {
  return <LoadingScreen />;
}

/**
 * Support client-side conditional redirecting based on the user's
 * authenticated state.
 *
 * @param WrappedComponent The component that this functionality
 * will be added to.
 * @param LoadingComponent The component that will be rendered while
 * the auth state is loading.
 * @param expectedAuth Whether the user should be authenticated for
 * the component to be rendered.
 * @param location The location to redirect to.
 */
export default function withAuthRedirect({
  WrappedComponent,
  LoadingComponent = DefaultLoadingFallback,
  expectedAuth,
  location,
}) {
  const WithAuthRedirectWrapper = props => {
    const router = useRouter();
    const { loading, isAuthenticated } = useAuth();
    const toast = useToast();

    if (loading) {
      return <LoadingComponent />;
    }
    if (typeof window !== "undefined" && expectedAuth !== isAuthenticated) {
      if (!isAuthenticated) {
        toast({
          title: "You must be signed in to access page",
          position: "top-right",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
      router.push(location);
      return <></>;
    }
    return <WrappedComponent {...props} />;
  };
  return WithAuthRedirectWrapper;
}
