"use client"
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();

  async function handleLogout(){
    await fetch("/api/logout",{
      method: "POST",
    });
    router.push("/login");
  }
  return (
    
    <div className="flex flex-col h-screen justify-around p-10">
            <div className="flex p-4 justify-center">
                Hurray! You have logged in successfully!
            </div>
            <div className="flex align-bottom">
              <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
  );
}
