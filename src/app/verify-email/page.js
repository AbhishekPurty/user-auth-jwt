import VerifyEmail from "@/components/VerifyEmail";


export default function Page({ searchParams }) {
  const token = searchParams.token || null; // Retrieve the token from the query parameters

  return <VerifyEmail token={token} />;
}
