import LoginForm from "@/components/loginForm/loginForm";
import NavbarLogin from "@/components/navbarLogin/navbarLogin";

export default function Login() {
  return (
    <>
    <div className="h-screen w-screen bg-no-repeat bg-cover" >
      <NavbarLogin /> 
      <LoginForm />

    </div>
    </>
  );
}
