import React, { useState } from "react";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [haveAnAccount, setHaveAnAccount] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-[#faed26] w-[40%] py-4 px-6 rounded-lg h-1/2">
        <h1 className="text-[#121111] text-center font-bold text-2xl">
          CoinScope
        </h1>
        {haveAnAccount ? (
          <>
            <div>
              <p className="text-[#121111] font-semibold">Email:</p>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full p-3"
              />
            </div>
            <div>
              <p className="text-[#121111] font-semibold">Password:</p>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full p-3"
              />
            </div>
            <div className="flex items-center gap-2 my-2">
              <span className="text-[#121111]">Show Password</span>
              <input
                type="checkbox"
                className="checkbox checkbox-sm checkbox-success"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
            <div className="flex w-3/4 mx-auto flex-col mt-3">
              <button className="card bg-base-100 rounded-box grid p-2 w-3/4 mx-auto place-items-center">
                LogIn
              </button>
              <div className="divider-neutral divider text-[#121111]">OR</div>
              <button className="card bg-base-100 rounded-box grid p-2 w-3/4 mx-auto place-items-center">
                LogIn with Google
              </button>
            </div>
            <p
              className="text-[#121111] cursor-pointer"
              onClick={() => setHaveAnAccount(!haveAnAccount)}
            >
              Don't have an account ? <span>SignUp</span>
            </p>
          </>
        ) : (
          <>
            <div>
              <p className="text-[#121111] font-semibold">Name:</p>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered w-full p-3"
              />
            </div>
            <div>
              <p className="text-[#121111] font-semibold">Email:</p>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full p-3"
              />
            </div>
            <div>
              <p className="text-[#121111] font-semibold">Password:</p>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full p-3"
              />
            </div>
            <div>
              <p className="text-[#121111] font-semibold">Confirm Password:</p>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input input-bordered w-full p-3"
              />
            </div>
            <div className="flex items-center gap-2 my-2">
              <span className="text-[#121111]">Show Password</span>
              <input
                type="checkbox"
                className="checkbox checkbox-sm checkbox-success"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>

            <div className="flex w-3/4 mx-auto flex-col mt-3">
              <button className="card bg-base-100 rounded-box grid p-2 w-3/4 mx-auto place-items-center">
                SignUp
              </button>
              <div className="divider-neutral divider text-[#121111]">OR</div>
              <button className="card bg-base-100 rounded-box grid p-2 w-3/4 mx-auto place-items-center">
                SignUp with Google
              </button>
            </div>

            <p
              className="text-[#121111] cursor-pointer"
              onClick={() => setHaveAnAccount(!haveAnAccount)}
            >
              Already have an account ? <span>Login</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
