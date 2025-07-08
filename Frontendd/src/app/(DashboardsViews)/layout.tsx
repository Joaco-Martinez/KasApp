import ChatbotPrueba  from "../../components/ChatBot/chatbot";
import Navbar from "@/components/navbar/navbar";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
       <div className="bg-white h-16">
        <Navbar />
       </div>
      <main className="flex-1">{children}</main>
              <ChatbotPrueba />
    </div>
  );
}
