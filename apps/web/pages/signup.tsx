import { useForm } from "react-hook-form";
import Input from "../components/input";
import NavBar from "../components/navbar";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:4001/user", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Cadastro realizado com sucesso, cheque seu e-mail");

      setTimeout(() => window.location.replace("/"), 2000);
    } catch (e) {
      toast.error("Cadastro falhou =[ cheque os dados e tente novamente!");
    }
  };

  return (
    <>
      <NavBar title='MyTest' />
      <Toaster />
      <div className='flex justify-center items-center h-screen'>
        <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
          <Input
            register={register("name", { required: true, minLength: 5 })}
            prop='name'
            error={
              errors.name ? "Por favor entre com o seu nome completo" : null
            }
            name='nome'
          />
          <Input
            register={register("email", {
              required: true,
              pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            })}
            prop='email'
            name='e-mail'
            type='email'
          />
          <Input
            register={register("username", { required: true })}
            prop='username'
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
