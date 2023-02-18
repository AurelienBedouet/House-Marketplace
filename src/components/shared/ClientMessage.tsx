import { IMessage } from "@/types";
import { MdDelete } from "react-icons/md";

type Props = {
  msg: IMessage;
  onDelete: (id: string) => void;
};

const ClientMessage = (props: Props) => {
  const { name, email, message, createdAt, id } = props.msg;

  const date = new Date(createdAt.toDate()).toUTCString();

  return (
    <div className="flex flex-col gap-4 bg-slate-50 text-gray-900 rounded-xl shadow-xl p-3 sm:p-5">
      <div className="flex flex-col sm:flex-row gap-4 items justify-between">
        <p className="font-semibold">
          From: <span className="font-normal">{name}</span>
        </p>
        <p className="font-semibold">
          Date: <span className="font-normal">{date}</span>
        </p>
      </div>
      <div className="col-span-2">
        <p className="font-semibold">Message:</p>
        <p>{message}</p>
      </div>
      <div className="flex items-center justify-between">
        <p className="font-semibold">
          Contact: <span className="font-normal">{email}</span>
        </p>
        <MdDelete
          size={24}
          color="rgb(37 99 235)"
          onClick={() => props.onDelete(id)}
          className="text-xl cursor-pointer transition duration-300 hover:scale-110"
        />
      </div>
    </div>
  );
};

export default ClientMessage;
