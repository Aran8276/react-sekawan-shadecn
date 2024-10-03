import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { ChangeEvent, ReactNode } from "react";

interface SelfProps {
  children: ReactNode;
  searchHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function Layout(props: SelfProps) {
  return (
    <div className="grid h-screen w-full pl-[56px]">
      <Sidebar />
      <div className="flex flex-col">
        <Header searchHandler={props.searchHandler} />
        <main className="overflow-auto p-4">{props.children}</main>
      </div>
    </div>
  );
}
