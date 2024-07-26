"use client";
import Image from "next/image";
import plantImage from "./images/garden.jpg";
import FormInput from "./FormInput";
import { useState } from "react";
import Link from "next/link";

export default function SignupPhase() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userNumber, setUserNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
  };
  const handleUserNumber = (e) => {
    setUserNumber(e.target.value);
  };
  const handleUserPassword = (e) => {
    setPassword(e.target.value);
  };
  const handleUserConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = () => {
    localStorage.setItem("firstname", firstName);
    localStorage.setItem("lastname", lastName);
    localStorage.setItem("number", userNumber);
    localStorage.setItem("password", password);
    localStorage.setItem("confirmPassword", confirmPassword);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/2">
        <Image src={plantImage} className="h-full w-full object-cover" alt="plant image" />
      </div>
      <div className="p-8 w-full md:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md">
          <h1 className="text-[#464A3D] text-center mt-10 font-bold text-2xl">
            Signup for an account
          </h1>
          <form className="max-w-full box-border p-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10">
              <div>
                <FormInput
                  label={"First name:"}
                  mainValue={firstName}
                  handleChange={handleFirstName}
                  inputStyles={"border bg-[#F2F2F2] rounded outline-none w-full p-2"}
                  connect={"fName"}
                  type={"text"}
                />
              </div>
              <div>
                <FormInput
                  label={"Last name:"}
                  mainValue={lastName}
                  handleChange={handleLastName}
                  inputStyles={"border bg-[#F2F2F2] rounded outline-none w-full p-2"}
                  connect={"lName"}
                  type={"text"}
                />
              </div>
            </div>
            <FormInput
              label={"Phone number"}
              inputStyles={"border bg-[#F2F2F2] outline-none rounded w-full p-2"}
              connect={"number"}
              mainValue={userNumber}
              handleChange={handleUserNumber}
              type={"number"}
            />
            <FormInput
              label={"Password"}
              inputStyles={"border bg-[#F2F2F2] outline-none rounded w-full p-2"}
              connect={"password"}
              mainValue={password}
              handleChange={handleUserPassword}
              type={"password"}
            />
            <FormInput
              label={"Confirm Password"}
              inputStyles={"border bg-[#F2F2F2] outline-none rounded w-full p-2"}
              mainValue={confirmPassword}
              handleChange={handleUserConfirmPassword}
              connect={"cPassword"}
              type={"password"}
            />
            <Link href={"/validUser"}>
              <button
                type="submit"
                onClick={handleSubmit}
                className="bg-[#082C08] text-white w-full mt-5 px-2 font-bold text-base rounded py-4"
              >
                Sign up
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
