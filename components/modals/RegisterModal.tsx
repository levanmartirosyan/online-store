"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  DatePicker,
} from "@heroui/react";
import {
  EyeFilledIcon,
  EyeSlashFilledIcon,
  MailIcon,
  PersonIcon,
  PhoneIcon,
  HomeIcon,
  MapPinIcon,
  LinkIcon,
} from "../icons/icons";
import { useState } from "react";
import MySelect from "../form-items/MySelect";
import { Controller, useForm } from "react-hook-form";
import { RegisterRequest } from "@/types/auth";

export default function RegisterModal({
  isOpen: controlledIsOpen,
  onOpenChange: controlledOnOpenChange,
  hideTrigger = false,
  onRegisterSuccess,
}: {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  hideTrigger?: boolean;
  onRegisterSuccess: (registerreq: RegisterRequest) => void;
}) {
  const disclosure = useDisclosure();
  const [isVisible, setIsVisible] = useState(false);
  const [birthDate, setBirthDate] = useState<any>(null);

  const getAge = (val: any) => {
    if (!val) return 0;
    let dob: Date;
    if (val instanceof Date) dob = val;
    else if (typeof val === "string") dob = new Date(val);
    else if (
      typeof val === "object" &&
      "year" in val &&
      "month" in val &&
      "day" in val
    ) {
      dob = new Date(Number(val.year), Number(val.month) - 1, Number(val.day));
    } else if (
      typeof val === "object" &&
      "toDate" in val &&
      typeof val.toDate === "function"
    ) {
      try {
        dob = val.toDate();
      } catch {
        dob = new Date(String(val));
      }
    } else {
      dob = new Date(String(val));
    }

    if (Number.isNaN(dob.getTime())) return 0;

    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
    return age >= 0 ? age : 0;
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  const isOpen = controlledIsOpen ?? disclosure.isOpen;
  const onOpen = () => {
    if (controlledOnOpenChange) controlledOnOpenChange(true);
    else disclosure.onOpen();
  };
  const onOpenChange = controlledOnOpenChange ?? disclosure.onOpenChange;

  const genders = [
    { key: "MALE", label: "Male" },
    { key: "FEMALE", label: "Female" },
    { key: "OTHER", label: "Other" },
  ];

  const [serverError, setServerError] = useState<string | null>(null);
  const { control, formState, setValue, getValues } = useForm<RegisterRequest>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      age: 0,
      address: "",
      phone: "",
      zipcode: "",
      avatar: "",
      gender: "",
    },
  });

  const { errors, isSubmitting } = formState;

  const handleFormReset = () => {
    setBirthDate(null);
    control._reset();
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        placement="center"
        onOpenChange={onOpenChange}
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Sign Up</ModalHeader>
              <ModalBody>
                <div className="flex gap-4 align-center">
                  <div className="flex flex-col">
                    <Controller
                      control={control}
                      name="firstName"
                      rules={{ required: "First name is required" }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          endContent={
                            <PersonIcon className="text-2xl text-default-400 pointer-events-none shrink-0" />
                          }
                          label="First Name"
                          placeholder="Enter your first name"
                          variant="bordered"
                          type="text"
                          isRequired
                        />
                      )}
                    />
                    {errors.firstName && (
                      <p className="text-sm text-rose-600 mt-1">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <Controller
                      control={control}
                      name="lastName"
                      rules={{ required: "Last name is required" }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          endContent={
                            <PersonIcon className="text-2xl text-default-400 pointer-events-none shrink-0" />
                          }
                          label="Last Name"
                          placeholder="Enter your last name"
                          variant="bordered"
                          type="text"
                          isRequired
                        />
                      )}
                    />
                    {errors.lastName && (
                      <p className="text-sm text-rose-600 mt-1">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                <Controller
                  control={control}
                  name="email"
                  rules={{ required: "Email is required" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      endContent={
                        <MailIcon className="text-2xl text-default-400 pointer-events-none shrink-0" />
                      }
                      label="Email"
                      placeholder="Enter your email"
                      variant="bordered"
                      type="email"
                      isRequired
                    />
                  )}
                />
                {errors.email && (
                  <p className="text-sm text-rose-600 mt-1">
                    {errors.email.message}
                  </p>
                )}

                <Controller
                  control={control}
                  name="password"
                  rules={{ required: "Password is required" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      className="w-full "
                      endContent={
                        <button
                          aria-label="toggle password visibility"
                          className="focus:outline-solid outline-transparent"
                          type="button"
                          onClick={toggleVisibility}
                        >
                          {isVisible ? (
                            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                          ) : (
                            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                          )}
                        </button>
                      }
                      label="Password"
                      placeholder="Enter your password"
                      type={isVisible ? "text" : "password"}
                      variant="bordered"
                    />
                  )}
                />
                {errors.password && (
                  <p className="text-sm text-rose-600 mt-1">
                    {errors.password.message}
                  </p>
                )}
                <div className="flex gap-4 align-center">
                  <div className="flex flex-col">
                    <Controller
                      control={control}
                      name="age"
                      rules={{ required: "Age is required" }}
                      render={({ field }) => (
                        <DatePicker
                          label="Birth date"
                          variant="bordered"
                          showMonthAndYearPickers
                          isRequired
                          value={birthDate as any}
                          onChange={(val: any) => {
                            setBirthDate(val);
                            if (val) {
                              const age = getAge(val);
                              setValue("age", age, { shouldValidate: true });
                              field.onChange(age);
                            } else {
                              setValue("age", 0);
                              field.onChange(0);
                            }
                          }}
                        />
                      )}
                    />
                    {errors.age && (
                      <p className="text-sm text-rose-600 mt-1">
                        {errors.age.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <Controller
                      control={control}
                      name="address"
                      rules={{ required: "Address is required" }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          endContent={
                            <HomeIcon className="text-2xl text-default-400 pointer-events-none shrink-0" />
                          }
                          label="Address"
                          placeholder="Enter your address"
                          type="text"
                          variant="bordered"
                          isRequired
                        />
                      )}
                    />
                    {errors.address && (
                      <p className="text-sm text-rose-600 mt-1">
                        {errors.address.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-4 align-center">
                  <div className="flex flex-col flex-1">
                    <Controller
                      control={control}
                      name="phone"
                      rules={{ required: "Phone number is required" }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          endContent={
                            <PhoneIcon className="text-2xl text-default-400 pointer-events-none shrink-0" />
                          }
                          label="Phone Number"
                          placeholder="Enter your phone number"
                          type="text"
                          variant="bordered"
                          minLength={13}
                          maxLength={13}
                          isRequired
                        />
                      )}
                    />
                    {errors.phone && (
                      <p className="text-sm text-rose-600 mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col flex-1">
                    <Controller
                      control={control}
                      name="zipcode"
                      rules={{ required: "Zip Code is required" }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          endContent={
                            <MapPinIcon className="text-2xl text-default-400 pointer-events-none shrink-0" />
                          }
                          label="Zip Code"
                          placeholder="Enter your zip code"
                          type="text"
                          variant="bordered"
                          isRequired
                        />
                      )}
                    />
                    {errors.zipcode && (
                      <p className="text-sm text-rose-600 mt-1">
                        {errors.zipcode.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-4 align-center">
                  <div className="flex flex-col w-full flex-1">
                    <Controller
                      control={control}
                      name="avatar"
                      rules={{ required: "Avatar URL is required" }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          endContent={
                            <LinkIcon className="text-2xl text-default-400 pointer-events-none shrink-0" />
                          }
                          label="Avatar Url"
                          placeholder="Enter your avatar url"
                          type="text"
                          variant="bordered"
                          isRequired
                        />
                      )}
                    />
                    {errors.avatar && (
                      <p className="text-sm text-rose-600 mt-1">
                        {errors.avatar.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col w-full flex-1">
                    <Controller
                      control={control}
                      name="gender"
                      rules={{ required: "Gender is required" }}
                      render={({ field }) => (
                        <MySelect
                          {...field}
                          options={genders}
                          label="Select Gender"
                          variant="bordered"
                          isRequired={true}
                        />
                      )}
                    />
                    {errors.gender && (
                      <p className="text-sm text-rose-600 mt-1">
                        {errors.gender.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                    isRequired
                  >
                    Agree to terms and conditions
                  </Checkbox>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onPress={() => {
                    onRegisterSuccess(getValues());
                  }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Signing up..." : "Sign Up"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
