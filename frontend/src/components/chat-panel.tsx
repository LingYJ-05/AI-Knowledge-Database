import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ChatMessage from "@/components/chat-message";
import { MessageSquare, Send, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useChat } from "@/hooks/use-chat";

export default function ChatPanel() {
  const { toast } = useToast();
  const { messages, sendMessage, isLoading, isStreaming, clearChat } =
    useChat();
  const [input, setInput] = useState("");
  const textareaRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${Math.min(Math.max(scrollHeight, 44), 120)}px`;
    }
  }, [input]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      await sendMessage(input);
      setInput("");
    } catch (error) {
      toast({
        title: "消息发送失败",
        description: "发送消息时出现错误，请重试。",
        variant: "destructive",
      });
    }
  };

  const handleClearChat = async () => {
    if (messages.length === 0) return;

    if (confirm("确定要清空聊天记录吗？")) {
      await clearChat();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Chat Container */}
      <div className="flex-1 overflow-y-auto px-8 py-6" ref={chatContainerRef}>
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#f54e00]/10 rounded-xl flex items-center justify-center mx-auto mb-5">
                <MessageSquare className="w-10 h-10 text-[#f54e00]" />
              </div>
              <h3 className="text-xl font-normal text-[#262520] mb-2 tracking-tight">
                智能问答助手
              </h3>
              <p className="text-[#807d72] text-sm text-center max-w-[280px]">
                选择文档后，在下方输入问题开始对话
              </p>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-5">
            {messages.map((message, index) => {
              const isLastMessage = index === messages.length - 1;
              const isMessageStreaming =
                isStreaming && !message.isUser && isLastMessage;

              return (
                <ChatMessage
                  key={message.id}
                  message={message}
                  isStreaming={isMessageStreaming}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-[#e6e5e0] bg-[#fafaf7] px-8 pb-6 pt-4">
        <div className="max-w-3xl mx-auto">
          {messages.length > 0 && (
            <div className="flex justify-end mb-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearChat}
                className="text-[#807d72] hover:text-[#262520] hover:bg-[#e6e5e0] rounded-lg h-8 px-3 text-xs"
              >
                <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                清空对话
              </Button>
            </div>
          )}
          <form className="relative" onSubmit={handleSubmit}>
            <div className="relative bg-white border border-[#e6e5e0] rounded-2xl shadow-sm focus-within:border-[#f54e00] focus-within:ring-1 focus-within:ring-[#f54e00]/20 transition-all">
              <textarea
                ref={textareaRef}
                rows={1}
                className="block w-full rounded-2xl bg-transparent px-5 py-4 text-[#262520] placeholder:text-[#807d72] text-sm resize-none outline-none overflow-hidden min-h-[60px]"
                placeholder="输入您的问题..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                onKeyDown={handleKeyDown}
              />
              <div className="absolute right-2 bottom-2">
                <Button
                  type="submit"
                  size="icon"
                  className="bg-[#262520] hover:bg-[#262520]/90 text-white rounded-xl h-9 w-9 transition-colors"
                  disabled={isLoading || !input.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
