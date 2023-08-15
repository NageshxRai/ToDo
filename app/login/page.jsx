"use client";
import { Context } from "../../components/ClientSide";

import Link from "next/link";
import { useRouter } from "next/navigation";

import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";

const page = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(Context);

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!data.success) return toast.error(data.message);
      setUser(data.user);
      toast.success(data.message);
      console.log(data);
    } catch (error) {
      return toast.error(error);
    }
  };
  if (user._id) return router.push("/");
  return (
    <div className="login">
      <section>
        <form onSubmit={loginHandler}>
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
          <button type="submit">Login</button>
          <p>OR</p>
          <Link href={"/register"}>
            <button>Sign Up</button>
          </Link>
        </form>
      </section>
    </div>
  );
};

export const metadata = {
  title: "Login",
  description: "Login Page",
};

export default page;
