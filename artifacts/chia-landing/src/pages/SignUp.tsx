import { useEffect } from "react";
import { useLocation } from "wouter";

export default function SignUpPage() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    setLocation("/cuenta?tab=register");
  }, [setLocation]);

  return null;
}
