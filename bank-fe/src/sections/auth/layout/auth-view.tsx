import Image from "next/image";

export default function AuthView({
    children,
}: {
    children: React.ReactNode
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2 bg-text6">
      {/* Left side - Image */}
      <div className="flex items-center justify-center">
        <Image
          src="/assets/images/auth/dashboard.png"
          alt="Landscape"
          className="rounded-r-[40px] w-[90%] h-[90%]"
          width={500}
          height={500}
        />
      </div>

      {/* Right side - Login Form */}
      <div className="flex justify-center items-center">
        <div className="flex flex-col py-6 px-16 bg-white/50 w-[90%] rounded-[40px]">
          <div className="space-y-2">
            {/* Logo */}
            <div className="flex justify-start">
              <Image src="/logo.png" alt="Logo" width={84} height={84} />
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
