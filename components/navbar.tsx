"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { useState } from "react";
import LogInModal from "@/components/modals/LogInModal";
import RegisterModal from "./modals/RegisterModal";
import { useUserStore } from "@/stories/User";
import { useService } from "@/services/api/UseService";
import { HttpMethod } from "@/enums/HttpMethod";
import auth from "@/services/endpoints/auth";
import { LogInRequest, RegisterRequest } from "@/types/auth";

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

  const { setTokens, user, setUser, clearUser } = useUserStore();

  const LogIn = async (loginreq: LogInRequest) => {
    try {
      const response = await useService(
        auth.AuthLogin,
        HttpMethod.POST,
        loginreq
      );
      const data = response?.data;

      const token = data ?? null;

      if (token) {
        setTokens({
          accessToken: token.access_token,
          refreshToken: token.refresh_token,
        });

        const response = await useService(auth.Auth, HttpMethod.GET);
        const userData = response?.data;
        console.log("User Data:", userData);
        if (userData) {
          setUser(userData);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const Register = async (registerBody: RegisterRequest) => {
    const response = await useService(
      auth.AuthRegister,
      HttpMethod.POST,
      registerBody
    );
    const data = response?.data ?? response;

    return { raw: data };
  };

  return (
    <Navbar shouldHideOnScroll>
      <NavbarBrand>
        <AcmeLogo />
        <p className="font-bold text-inherit">ACME</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/products">
            Products
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link color="foreground" href="/cart">
            Cart
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {user ? (
          <NavbarContent as="div" justify="end">
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform cursor-pointer"
                  color="secondary"
                  name={user.firstName}
                  size="sm"
                  src={user.avatar}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{user.email}</p>
                </DropdownItem>
                <DropdownItem key="settings" href="/profile">
                  My Settings
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  onClick={() => {
                    setTokens({ accessToken: null, refreshToken: null });
                    clearUser();
                  }}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarContent>
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
                onLogInSuccess={(loginreq) => {
                  LogIn(loginreq);
                  setLoginOpen(false);
                }}
                hideTrigger
              />
            </NavbarItem>
            <NavbarItem>
              <Button
                as={Link}
                color="primary"
                href="#"
                variant="flat"
                onPress={() => {
                  setRegisterOpen(true);
                }}
              >
                Sign Up
              </Button>
              <RegisterModal
                isOpen={registerOpen}
                onOpenChange={setRegisterOpen}
                onRegisterSuccess={(registerreq) => {
                  Register(registerreq);
                  setRegisterOpen(false);
                }}
                hideTrigger
              />
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
};
