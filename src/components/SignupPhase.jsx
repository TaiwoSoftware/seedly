'use client'
import Image from "next/image";
import plantImage from "./images/garden.jpg";
import FormInput from "./FormInput";
import { useState } from "react";
export default function SignupPhase() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userNumber, setUserNumber] = useState('')
  const [passweord, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleFirstName = (e) => {
    setFirstName(e.target.value)
  }
  const handleLastName = (e) => {
    setLastName(e.target.value)
  }
  const handleUserNumber = (e) => {
    setUserNumber(e.target.value)
  }
  const handleUserPassword = (e) => {
    setPassword(e.target.value)
  }
  const handleUserConfirmPassword = (e) => {
    setConfirmPassword(e.target.value)
  }

  const handleSubmit = () => {
    localStorage.setItem('firstname', firstName)
    localStorage.setItem('lastname', lastName)
    localStorage.setItem('number', userNumber)
    localStorage.setItem('password', passweord)
    localStorage.setItem('confirmPassword', confirmPassword)
  }
  return (
    <div className="grid grid-cols-2">
      <div>
        <Image src={plantImage} className="h-screen" alt="plant image" />
      </div>
      <div className=" p-8">
        <h1 className="text-[#464A3D] text-center mt-10 font-bold text-2xl">
          Signup for an account
        </h1>
        <form className="max-w-full box-border p-2">
          <div className="grid grid-cols-2 gap-10">
            <div>
              <FormInput
                label={"First name:"}
                mainValue={firstName}
                handleChange={handleFirstName}
                inputStyles={
                  "border bg-[#F2F2F2] rounded outline-none w-full p-2"
                }
                connect={"fName"}
                type={"text"}
              />
            </div>
            <div>
              <FormInput
                label={"Last name:"}
                mainValue={lastName}
                handleChange={handleLastName}
                inputStyles={
                  "border bg-[#F2F2F2] rounded outline-none w-full p-2"
                }
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
            mainValue={passweord}
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
          <button type="submit" onClick={handleSubmit} className="bg-[#082C08] text-white w-full mt-5 px-2 font-bold text-base rounded py-4">
            Sign up
          </button>
        </form>
      </div>
    </div>  
  );
}
