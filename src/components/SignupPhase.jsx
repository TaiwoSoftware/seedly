"use client";
import Image from "next/image";
import plantImage from "./images/garden.jpg";
import FormInput from "./FormInput";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPhase() {
  const [username, setUsername] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // New state for loading
  const router = useRouter();

  const handleUserName = (e) => setUsername(e.target.value);
  const handlePhoneNumber = (e) => setPhonenumber(e.target.value);
  const handleUserPassword = (e) => setPassword(e.target.value);
  const handleUserConfirmPassword = (e) => setConfirmPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from submitting by default

    if (!username || !phonenumber || !password || !confirmPassword) {
      setError("Fill in all the necessary details");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true); // Show loader when submitting

    try {
      const checkResponse = await fetch(`https://simon-4636.restdb.io/rest/datauser?q={"phoneNumber":"${phonenumber}"}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-apikey": "66a6c2e12212c7e5b78ea3fd" // Replace with your actual API key
        }
      });

      const checkData = await checkResponse.json();

      if (checkData.length > 0) {
        setError("Phone number already in use");
        setIsLoading(false); // Hide loader if there's an error
        return;
      }

      setError("");

      const data = {
        username: username,
        phoneNumber: phonenumber,
        password: password,
        confirmPassword: confirmPassword,
      };

      const response = await fetch("https://simon-4636.restdb.io/rest/datauser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-apikey": "66a6c2e12212c7e5b78ea3fd", // Replace with your actual API key
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Success:", result);

      router.push('/validUser');
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to submit data");
    } finally {
      setIsLoading(false); // Hide loader after submission is complete
    }
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
          {error && (
            <div className="bg-red-200 text-red-700 p-3 rounded mb-4">
              {error}
            </div>
          )}
          <form className="max-w-full box-border p-2" onSubmit={handleSubmit}>
            <FormInput
              label={"Username:"}
              mainValue={username}
              handleChange={handleUserName}
              inputStyles={"border bg-[#F2F2F2] rounded outline-none w-full p-2"}
              connect={"fName"}
              type={"text"}
            />
            <FormInput
              label={"Phone number"}
              inputStyles={"border bg-[#F2F2F2] outline-none rounded w-full p-2"}
              connect={"number"}
              mainValue={phonenumber}
              handleChange={handlePhoneNumber}
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
            <button
              type="submit"
              className="bg-[#082C08] text-white w-full mt-5 px-2 font-bold text-base rounded py-4"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex justify-center items-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                  Processing...
                </div>
              ) : (
                "Sign up"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
