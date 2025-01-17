import Link from "next/link";

export default function Home() {
  return (
    // <div className="flex w-screen h-screen justify-center ">
    //   <div className="content-center">
    //     <button className="text-2xl">
    //       <Link href={"/login"}>
    //         Login
    //       </Link>
    //     </button>
    //   </div>
    // </div>
    <div className="flex justify-center flex-col p-10">
            <div>
                Hurray! You have logged in successfully!
            </div>
        </div>
  );
}
