import { useLogin } from "../../hooks/useLogin";

const Login = () => {
  const {
    handleSubmit,
    login,
    setName,
    name,
    setEmail,
    email,
    setPassword,
    password,
    isLoading,
    isLoadingLogout,
    setLogin,
    handleLogout,
  } = useLogin();

  return (
    <div className="max-w-7xl mx-auto flex flex-col items-center justify-center h-[90vh] px-2 md:px-4">
      <form
        onSubmit={handleSubmit}
        className="md:w-[400px] border p-8 space-y-6 rounded-xl border-gray-300"
      >
        <h1 className="font-semibold text-4xl text-center text-orange-700">
          {login ? "Log In" : "Sign UP"}
        </h1>
        <p className="text-gray-700 text-lg">
          You {login ? "Login" : "Signup"} to Champaran new customer
        </p>
        <div className="flex flex-col gap-4">
          {!login && (
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Enter your name"
              className="outline-none focus:ring-2 focus:ring-orange-500 rounded-md border border-gray-300 py-2 px-6"
            />
          )}
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter your email"
            className="outline-none focus:ring-2 focus:ring-orange-500 rounded-md border border-gray-300 py-2 px-6"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Enter your password"
            className="outline-none focus:ring-2 focus:ring-orange-500 rounded-md border border-gray-300 py-2 px-6"
          />
        </div>
        <button
          type="submit"
          className="bg-orange-500 w-full rounded-md py-3 text-white"
        >
          {login ? (
            isLoading ? (
              <div className="flex justify-center items-center">
                <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              "Log in"
            )
          ) : isLoading ? (
            <div className="flex justify-center items-center">
              <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            "Sign up"
          )}
        </button>
        <p className="text-sm text-gray-700">
          {login ? "Not" : "Already"} have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => setLogin(!login)}
          >
            {login ? "Signup" : "Login"}
          </span>
        </p>
      </form>
      <button
        onClick={handleLogout}
        className="bg-orange-500 text-white w-full mt-5 py-2 rounded-md md:w-[400px]"
      >
        {isLoadingLogout ? (
          <div className="flex justify-center items-center">
            <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          "Logout"
        )}
      </button>
    </div>
  );
};

export default Login;
