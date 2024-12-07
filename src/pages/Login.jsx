import React, { useState } from "react";
import { auth, db } from "../config/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [haveAnAccount, setHaveAnAccount] = useState(true);

  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const usersCollectionRef = collection(db, "users");

  const signUpWithEmailAndPassword = async (e) => {
    e.preventDefault();
    try {
      if (name && email && password && confirmPassword) {
        if (password === confirmPassword) {
          createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              const user = userCredential.user;
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
    try {
      await addDoc(usersCollectionRef, {
        name: user.displayName ? user.displayName : name,
        email: user.email ? user.email : email,
        createdAt: new Date(),
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

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-[#faed26] w-[40%] py-4 px-6 rounded-lg h-1/2">
        <h1 className="text-[#121111] text-center font-bold text-2xl">
          CoinScope
        </h1>
        <Toaster position="top-right" />
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
              <button
                onClick={logIn}
                className="card bg-base-100 rounded-box grid p-2 w-3/4 mx-auto place-items-center text-gray-200"
              >
                LogIn
              </button>
              <div className="divider-neutral divider text-[#121111]">OR</div>
              <button
                onClick={signInWithGoogle}
                className="card bg-base-100 rounded-box grid p-2 w-3/4 mx-auto place-items-center text-gray-200"
              >
                LogIn with Google
              </button>
            </div>
            <p
              className="text-[#121111] cursor-pointer my-2"
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
              <button
                onClick={signUpWithEmailAndPassword}
                className="card bg-base-100 rounded-box grid p-2 w-3/4 mx-auto place-items-center text-gray-200"
              >
                SignUp
              </button>
              <div className="divider-neutral divider text-[#121111]">OR</div>
              <button
                onClick={signInWithGoogle}
                className="card bg-base-100 rounded-box grid p-2 w-3/4 mx-auto place-items-center text-gray-200"
              >
                SignUp with Google
              </button>
            </div>
            <p
              className="text-[#121111] cursor-pointer my-2"
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
