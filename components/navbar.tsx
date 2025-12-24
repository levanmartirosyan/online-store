"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@heroui/react";
import { useEffect, useState } from "react";
import LogInModal from "@/components/modals/LogInModal";
import RegisterModal from "./modals/RegisterModal";

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export const NavbarComponent = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [user, setUser] = useState<{
    name?: string;
    avatar?: string;
    email?: string;
  } | null>(null);

  useEffect(() => {
    // hydrate user from localStorage
    try {
      const raw = localStorage.getItem("user");
      if (raw) setUser(JSON.parse(raw));
    } catch (e) {
      // ignore
    }

    // listen for login events
    const onLogin = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail) setUser(detail);
    };
    window.addEventListener("user:login", onLogin as EventListener);
    return () =>
      window.removeEventListener("user:login", onLogin as EventListener);
  }, []);

  return (
    <Navbar shouldHideOnScroll>
      <NavbarBrand>
        <AcmeLogo />
        <p className="font-bold text-inherit">ACME</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Products
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link color="foreground" href="#">
            Cart
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {user ? (
          <>
            <NavbarItem className="hidden lg:flex items-center gap-2">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name ?? "avatar"}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-default-200" />
              )}
              <span className="hidden md:inline">
                {user.name ?? user.email}
              </span>
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem className="lg:flex">
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setLoginOpen(true);
                }}
              >
                Login
              </Link>
              <LogInModal
                isOpen={loginOpen}
                onOpenChange={setLoginOpen}
                hideTrigger
              />
            </NavbarItem>
            <NavbarItem>
              <Button
                as={Link}
                color="primary"
                href="#"
                variant="flat"
                onClick={(e) => {
                  e.preventDefault();
                  setRegisterOpen(true);
                }}
              >
                Sign Up
              </Button>
              <RegisterModal
                isOpen={registerOpen}
                onOpenChange={setRegisterOpen}
                hideTrigger
              />
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
};
