import axios from "axios";
import { GetServerSidePropsContext } from "next";
import NavBar from "../components/navbar";

type Result = {
  status: string;
  email: string;
};

export default function Activation({ status, email }: Result) {
  return (
    <>
      <NavBar title="MyTest" />
      <div className="flex justify-center items-center h-screen">
        <div className="m-4 max-w-screen-md">
          {status === "success" && (
            <h1 className="text-4xl font-bold text-accent text-left">
              Olá! =D
              <br />
              <br />
              Usuário com o e-mail {email}, ativado com sucesso!
            </h1>
          )}
          {status === "error" && (
            <h1 className="text-4xl font-bold text-error">
              Ops! =[
              <br />
              <br />
              Não foi possivel a ativação com dados fornecidos.
              <br />
              <br />
              Verifique a url e tente novamente!
            </h1>
          )}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { email, hash } = context.query;

  try {
    await axios.post("http://localhost:4001/active", { email, hash });
    return { props: { status: "success", email } };
  } catch (err) {
    return { props: { status: "error" } };
  }
}
