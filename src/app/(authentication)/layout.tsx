export default function AuthenticationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <div className="absolute inset-0 flex justify-center items-center">
    <div className="absolute inset-0 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
      <div className="w-full flex flex-col justify-center gap-4 max-w-md mx-auto">
        {children}
      </div>
    </div>
  );
}
