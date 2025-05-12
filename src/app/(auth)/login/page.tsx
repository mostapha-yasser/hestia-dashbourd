import LoginForm from "../../../components/loginComponents/LoginForm";
import loginImage from "../../../../public/img/loginImage.svg";
import Image from "next/image";
export default function Login() {
  return (
    <div className="w-full  max-h-screen min-h-screen flex justify-center items-center">
      <div className="w-10/12 flex justify-around gap-3 ">
          <LoginForm />
        <div className="hidden lg:block md:w-5/12 ">
          <Image priority={true} src={loginImage} alt="Login image" />
        </div>
      </div>
    </div>
  );
}
