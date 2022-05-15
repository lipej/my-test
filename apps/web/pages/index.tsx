import NavBar from "../components/navbar";

export default function Web() {
  return (
    <>
      <NavBar title="MyTest" />
      <div className="flex justify-center items-center h-screen">
        <a href="/signup" className="btn m-2">
          Cadastro
        </a>
        <a href="/login" className="btn m-2">
          Login
        </a>
      </div>
    </>
  );
}
