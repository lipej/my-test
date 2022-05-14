import { useForm } from "react-hook-form";
import Input from "../components/input";
import NavBar from "../components/navbar";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { setCookies } from 'cookies-next';

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const result = await axios.post("http://localhost:4001/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success("Login Realizado! Aguarde o redirecionamento!");

      setCookies('token', result.data);

      setTimeout(() => window.location.replace("/secure/user"), 2000);
    } catch (e) {
      toast.error("Ops! =[ Login falhou");
    }
  };

  return (
    <>
      <NavBar title='MyTest' />
      <Toaster />
      <div className='flex justify-center items-center h-screen'>
        <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
          <Input
            register={register("username", { required: true })}
            prop='username'
            error={errors.name ? "Por favor entre com o seu usuário" : null}
            name='usuário'
          />
          <Input
            register={register("password", {
              required: true,
              pattern: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{6,}$/,
            })}
            prop='password'
            name='senha'
            type='password'
          />

          <input className='btn btn-sm mt-2' type='submit' />
        </form>
      </div>
    </>
  );
}
