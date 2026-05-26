import { useEffect } from "react";
import { useLocation } from "wouter";

export default function SignInPage() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    setLocation("/cuenta");
  }, [setLocation]);

  return null;
}
