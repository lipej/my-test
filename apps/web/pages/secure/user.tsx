import axios from "axios";
import { GetServerSidePropsContext } from "next";
import NavBar from "../../components/navbar";
import crypto from "crypto-js";
import Input from "../../components/input";

type Result = {
  username?: string;
  name?: string;
  email?: string;
  gravatarHash?: string;
  error?: string;
};

export default function Activation({
  name,
  username,
  email,
  gravatarHash,
  error,
}: Result) {
  if (error) {
    return (
        <div className='flex justify-center items-center h-screen'>
          <h1 className='text-4xl font-bold text-error text-left'>
            Acesso não autorizado!
          </h1>
        </div>
    );
  }

  return (
    <>
      <NavBar
        title='MyTest'
        avatar={"https://www.gravatar.com/avatar/" + gravatarHash}
      />
      <div className='flex justify-center h-screen pt-8'>
        <div className='m-4 max-w-screen-md'>
          <h1 className='text-4xl font-bold text-accent text-left'>
            Olá, {name?.split(" ")[0]}! =D
            <br />
            <br />
            Esses são os seus dados cadastrados no sistema:
          </h1>
          <div className='flex flex-col justify-center items-center pt-8'>
            <Input value={name} prop='name' field='Nome:' disabled={true} />
            <Input value={email} prop='email' field='E-mail:' disabled={true} />
            <Input
              value={username}
              prop='username'
              field='Usuário:'
              disabled={true}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const { data } = await axios.get("http://localhost:4001/user", {
      headers: {
        Authorization: "Bearer " + context.req.cookies.token,
      },
    });

    const hash = crypto.MD5(data.email).toString();

    return { props: { ...data, gravatarHash: hash } };
  } catch (err) {
    return { props: { error: (err as Error).message } };
  }
}
