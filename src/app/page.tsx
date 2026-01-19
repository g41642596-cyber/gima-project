<<<<<<< Updated upstream
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/reportes");
}
=======
"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { use, useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/auth/login");
  }, [router]);
  
  return null;
}
>>>>>>> Stashed changes
