import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Eye, EyeOff } from "lucide-react";
import type { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { clearError, registerUser } from "@/redux/features/authSlice";
import type { RegisterData } from "@/types/types";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error: serverError } = useSelector(
    (state: RootState) => state.auth
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const onSubmit = (data: RegisterData) => {
    console.log("Formulaire soumis", data); // Débogage
    const { firstName, lastName, email, password } = data;
    dispatch(registerUser({ firstName, lastName, email, password })).then(
      (result) => {
        if (result.meta.requestStatus === "fulfilled") {
          navigate("/");
        }
      }
    );
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Inscription
        </h2>
      </div>

      {serverError && (
        <div className="flex flex-col items-center sm:mx-auto sm:w-full sm:max-w-sm mt-6 text-red-500">
          {serverError}
          <Button
            onClick={handleClearError}
            variant="outline"
            className="w-fit ml-2"
          >
            Effacer
          </Button>
        </div>
      )}

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Prénom
              </label>
              <div className="mt-2">
                <Input
                  id="firstName"
                  {...register("firstName", {
                    required: "Le prénom est requis",
                  })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.firstName && (
                  <p className="text-red-500">{errors.firstName.message}</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Nom
              </label>
              <div className="mt-2">
                <Input
                  id="lastName"
                  {...register("lastName", { required: "Le nom est requis" })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.lastName && (
                  <p className="text-red-500">{errors.lastName.message}</p>
                )}
              </div>
            </div>
          </div>

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
                  pattern: { value: /^\S+@\S+$/i, message: "Email invalide" },
                })}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
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
                  minLength: {
                    value: 8,
                    message:
                      "Le mot de passe doit contenir au moins 8 caractères",
                  },
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*\d)/,
                    message:
                      "Le mot de passe doit contenir une majuscule et un chiffre",
                  },
                })}
                type={showPassword ? "text" : "password"}
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
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Confirmer le mot de passe
            </label>
            <div className="mt-2 relative">
              <Input
                id="confirmPassword"
                {...register("confirmPassword", {
                  required: "La confirmation du mot de passe est requise",
                  validate: (value) =>
                    value === password ||
                    "Les mots de passe ne correspondent pas",
                })}
                type={showConfirmPassword ? "text" : "password"}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
              {errors.confirmPassword && (
                <p className="text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          <div>
            <Button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {loading ? "Chargement..." : "S'inscrire"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
