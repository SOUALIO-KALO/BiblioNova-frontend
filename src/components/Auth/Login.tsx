import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import type { LoginData } from "@/types/types";
import { clearError, loginUser } from "@/redux/features/authSlice";
import { useState } from "react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error: serverError } = useSelector(
    (state: RootState) => state.auth
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginData) => {
    dispatch(loginUser(data))
      .then((result) => {
        if (result.meta.requestStatus === "fulfilled") {
          navigate("/");
        }
      })
      .catch((err) => {
        console.error("Erreur de connexion :", err);
      });
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Connexion
        </h2>
      </div>

      {(serverError || errors.email || errors.password) && (
        <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-6 text-red-500 flex flex-col items-center">
          {serverError || errors.email?.message || errors.password?.message}
          <Button onClick={handleClearError} variant="outline" className="ml-2">
            Effacer
          </Button>
        </div>
      )}

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="mt-2">
              <Input
                id="email"
                {...register("email", {
                  required: "L'email est requis",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Email invalide",
                  },
                })}
                type="email"
                autoComplete="email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Mot de passe
            </label>
            <div className="mt-2 relative">
              <Input
                id="password"
                {...register("password", {
                  required: "Le mot de passe est requis",
                })}
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {loading ? "Chargement..." : "Se connecter"}
            </Button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Pas encore de compte ?{" "}
          <Link
            to="/register"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            S'inscrire
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
