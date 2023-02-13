const ProgressBar = ({
  bgcolor,
  completed,
}: {
  bgcolor: string;
  completed: number;
}) => {
  return (
    <div className="h-6 w-full bg-gray-300 rounded-[50px] z-0">
      <div
        className={`h-full w-[${completed}%] bg-[${bgcolor}] transition ease-in-out duration-1000 text-right z-10`}
      >
        <span className="px-2 text-white font-medium text-sm">{`${completed}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
