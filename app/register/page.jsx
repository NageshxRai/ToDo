"use client";
import { Context } from "../../components/ClientSide";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";

const page = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(Context);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      const data = await res.json();
      if (!data.success) {
        toast.error(data.message);
      } else {
        setUser(data.user);
        toast.success(data.message);
      }
    } catch (error) {
      toast.error("An error occurred during sign up.");
    }
  };

  if (user._id) {
    router.push("/");
    return null;
  }

  return (
    <div className="login">
      <section>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Enter Username"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <input
            type="email"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button type="submit">Sign Up</button>
          <p>OR</p>
          <Link href={"/login"}>
            <button>Login</button>
          </Link>
        </form>
      </section>
    </div>
  );
};

export const metadata = {
  title: "Sign Up",
  description: "Register Page",
};

export default page;
