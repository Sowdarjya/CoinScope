import React, { useContext, useState } from "react";
import { auth, db } from "../config/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { CryptoCurrency } from "../context/CryptoCurrencyContext";
import { getDoc } from "firebase/firestore";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [haveAnAccount, setHaveAnAccount] = useState(true);

  const { setUser } = useContext(CryptoCurrency);

  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const signUpWithEmailAndPassword = async (e) => {
    e.preventDefault();
    try {
      if (name && email && password && confirmPassword) {
        if (password === confirmPassword) {
          createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              const user = userCredential.user;
              user.displayName = name;
              toast.success("Account Created", {
                style: {
                  padding: "16px",
                  color: "#faed26",
                  background: "#121111",
                  border: "3px solid #faed26",
                },
                iconTheme: {
                  primary: "#faed26",
                  secondary: "#121111",
                },
              });
              setUser(true);
              addUser(user);
              setTimeout(() => {
                navigate("/");
              }, 2000);
            })
            .catch((error) => {
              const errorMessage = error.message;
              toast.error(errorMessage, {
                style: {
                  padding: "16px",
                  color: "#faed26",
                  background: "#121111",
                  border: "3px solid #faed26",
                },
                iconTheme: {
                  primary: "#faed26",
                  secondary: "#121111",
                },
              });
            });
        } else {
          toast.error("Password and confirm password do not match", {
            style: {
              padding: "16px",
              color: "#faed26",
              background: "#121111",
              border: "3px solid #faed26",
            },
            iconTheme: {
              primary: "#faed26",
              secondary: "#121111",
            },
          });
        }
      } else {
        toast.error("All fields are mandatory", {
          style: {
            padding: "16px",
            color: "#faed26",
            background: "#121111",
            border: "3px solid #faed26",
          },
          iconTheme: {
            primary: "#faed26",
            secondary: "#121111",
          },
        });
      }
    } catch (error) {
      toast.error(error.message, {
        style: {
          padding: "16px",
          color: "#faed26",
          background: "#121111",
          border: "3px solid #faed26",
        },
        iconTheme: {
          primary: "#faed26",
          secondary: "#121111",
        },
      });
    }
  };

  const signInWithGoogle = async (e) => {
    e.preventDefault();
    try {
      signInWithPopup(auth, provider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user;
          toast.success("Success", {
            style: {
              padding: "16px",
              color: "#faed26",
              background: "#121111",
              border: "3px solid #faed26",
            },
            iconTheme: {
              primary: "#faed26",
              secondary: "#121111",
            },
          });
          setUser(true);
          addUser(user);
          setTimeout(() => {
            navigate("/");
          }, 2000);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.customData.email;
          const credential = GoogleAuthProvider.credentialFromError(error);
          toast.success(errorMessage, {
            style: {
              padding: "16px",
              color: "#faed26",
              background: "#121111",
              border: "3px solid #faed26",
            },
            iconTheme: {
              primary: "#faed26",
              secondary: "#121111",
            },
          });
        });
    } catch (error) {
      toast.error(error.message, {
        style: {
          padding: "16px",
          color: "#faed26",
          background: "#121111",
          border: "3px solid #faed26",
        },
        iconTheme: {
          primary: "#faed26",
          secondary: "#121111",
        },
      });
    }
  };

  const logIn = async (e) => {
    e.preventDefault();
    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          toast.success("Successfully logged in", {
            style: {
              padding: "16px",
              color: "#faed26",
              background: "#121111",
              border: "3px solid #faed26",
            },
            iconTheme: {
              primary: "#faed26",
              secondary: "#121111",
            },
          });
          setUser(true);
          setTimeout(() => {
            navigate("/");
          }, 2000);
        })
        .catch((error) => {
          const errorMessage = error.message;
          toast.error(errorMessage, {
            style: {
              padding: "16px",
              color: "#faed26",
              background: "#121111",
              border: "3px solid #faed26",
            },
            iconTheme: {
              primary: "#faed26",
              secondary: "#121111",
            },
          });
        });
    } else {
      toast.error("All fields are mandatory", {
        style: {
          padding: "16px",
          color: "#faed26",
          background: "#121111",
          border: "3px solid #faed26",
        },
        iconTheme: {
          primary: "#faed26",
          secondary: "#121111",
        },
      });
      setLoading(false);
    }
  };

  const addUser = async (user) => {
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    try {
      if (!userDoc.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : name,
          email: user.email ? user.email : email,
          createdAt: new Date(),
        });
      }
    } catch (error) {
      toast.error(error.message, {
        style: {
          padding: "16px",
          color: "#faed26",
          background: "#121111",
          border: "3px solid #faed26",
        },
        iconTheme: {
          primary: "#faed26",
          secondary: "#121111",
        },
      });
      console.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4 py-6">
      <div className="bg-[#faed26] w-full max-w-md rounded-lg shadow-md py-6 px-6 sm:px-8">
        <h1 className="text-[#121111] text-center font-bold text-2xl sm:text-3xl mb-6">
          CoinScope
        </h1>

        <Toaster position="top-right" />

        <div className="space-y-4">
          {haveAnAccount ? (
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="login-email"
                  className="text-[#121111] font-semibold block mb-2"
                >
                  Email
                </label>
                <input
                  id="login-email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input input-bordered w-full p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#121111]"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="login-password"
                  className="text-[#121111] font-semibold block mb-2"
                >
                  Password
                </label>
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input input-bordered w-full p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#121111]"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input
                    id="show-password"
                    type="checkbox"
                    className="checkbox checkbox-sm checkbox-success"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                  />
                  <label
                    htmlFor="show-password"
                    className="text-[#121111] select-none"
                  >
                    Show Password
                  </label>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={logIn}
                  className="w-full bg-[#121111] text-[#faed26] py-2 rounded-md 
                             hover:bg-opacity-90 transition-colors duration-300"
                >
                  Log In
                </button>

                <div className="flex items-center justify-center space-x-3">
                  <div className="flex-grow border-t border-[#121111]"></div>
                  <span className="text-[#121111] text-sm">OR</span>
                  <div className="flex-grow border-t border-[#121111]"></div>
                </div>

                <button
                  onClick={signInWithGoogle}
                  className="w-full bg-[#121111] text-[#faed26] py-2 rounded-md 
                             hover:bg-opacity-90 transition-colors duration-300 
                             flex items-center justify-center gap-2"
                >
                  <FcGoogle className="text-xl" />
                  Log In with Google
                </button>
              </div>

              <p
                className="text-[#121111] text-center cursor-pointer mt-4"
                onClick={() => setHaveAnAccount(!haveAnAccount)}
              >
                Don't have an account?{" "}
                <span className="font-bold">Sign Up</span>
              </p>
            </form>
          ) : (
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="signup-name"
                  className="text-[#121111] font-semibold block mb-2"
                >
                  Name
                </label>
                <input
                  id="signup-name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input input-bordered w-full p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#121111]"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="signup-email"
                  className="text-[#121111] font-semibold block mb-2"
                >
                  Email
                </label>
                <input
                  id="signup-email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input input-bordered w-full p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#121111]"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="signup-password"
                  className="text-[#121111] font-semibold block mb-2"
                >
                  Password
                </label>
                <input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input input-bordered w-full p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#121111]"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="confirm-password"
                  className="text-[#121111] font-semibold block mb-2"
                >
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input input-bordered w-full p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#121111]"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input
                    id="show-signup-password"
                    type="checkbox"
                    className="checkbox checkbox-sm checkbox-success"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                  />
                  <label
                    htmlFor="show-signup-password"
                    className="text-[#121111] select-none"
                  >
                    Show Password
                  </label>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={signUpWithEmailAndPassword}
                  className="w-full bg-[#121111] text-[#faed26] py-2 rounded-md 
                             hover:bg-opacity-90 transition-colors duration-300"
                >
                  Sign Up
                </button>

                <div className="flex items-center justify-center space-x-3">
                  <div className="flex-grow border-t border-[#121111]"></div>
                  <span className="text-[#121111] text-sm">OR</span>
                  <div className="flex-grow border-t border-[#121111]"></div>
                </div>

                <button
                  onClick={signInWithGoogle}
                  className="w-full bg-[#121111] text-[#faed26] py-2 rounded-md 
                             hover:bg-opacity-90 transition-colors duration-300 
                             flex items-center justify-center gap-2"
                >
                  <FcGoogle className="text-xl" />
                  Sign Up with Google
                </button>
              </div>

              <p
                className="text-[#121111] text-center cursor-pointer mt-4"
                onClick={() => setHaveAnAccount(!haveAnAccount)}
              >
                Already have an account?{" "}
                <span className="font-bold">Log In</span>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
