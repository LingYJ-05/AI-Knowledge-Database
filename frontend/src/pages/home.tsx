import { useState } from "react";
import DocumentPanel from "@/components/document-panel";
import ChatPanel from "@/components/chat-panel";
import FilePreview from "@/components/file-preview";
import { useDocuments } from "@/hooks/use-documents";
import { UserMenu } from "@/components/auth/user-menu";
import { Brain, FileText, PanelLeft, PanelRight, X } from "lucide-react";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showPreview, setShowPreview] = useState(true);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-[#fafaf7]">
      {/* Header */}
      <header className="bg-[#fafaf7] border-b border-[#e6e5e0] px-6 py-3">
        <div className="flex items-center justify-between max-w-[1600px] mx-auto">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <img
                src="/mind-logo.svg"
                alt="MindFlow"
                className="w-8 h-8 rounded-md"
              />
              <span className="text-xl font-normal text-[#262520] tracking-tight">
                MindFlow
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Sidebar Toggle */}
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="p-2 rounded-lg hover:bg-[#e6e5e0] transition-colors text-[#807d72] hover:text-[#262520]"
              title={showSidebar ? "隐藏侧边栏" : "显示侧边栏"}
            >
              <PanelLeft className="w-5 h-5" />
            </button>

            {/* Preview Toggle */}
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="p-2 rounded-lg hover:bg-[#e6e5e0] transition-colors text-[#807d72] hover:text-[#262520]"
              title={showPreview ? "隐藏预览" : "显示预览"}
            >
              <PanelRight className="w-5 h-5" />
            </button>

            <UserMenu />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden max-w-[1600px] mx-auto w-full">
        {/* Left Sidebar */}
        {showSidebar && (
          <div className="w-80 border-r border-[#e6e5e0] bg-[#f7f7f4] transition-all duration-300">
            <DocumentPanel
              onFileSelect={setSelectedFile}
              selectedFile={selectedFile}
            />
          </div>
        )}

        {/* Center Chat Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {selectedFile && (
            <div className="bg-[#f7f7f4] border-b border-[#e6e5e0] px-4 py-2 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#807d72]" />
              <span className="text-sm text-[#262520] truncate">
                {selectedFile.filename}
              </span>
              {!showPreview && (
                <button
                  onClick={() => setShowPreview(true)}
                  className="ml-auto text-xs text-[#f54e00] hover:underline"
                >
                  打开预览
                </button>
              )}
            </div>
          )}
          <div className="flex-1 overflow-hidden">
            <ChatPanel />
          </div>
        </div>

        {/* Right Preview Panel */}
        {showPreview && selectedFile && (
          <div className="w-[500px] border-l border-[#e6e5e0] bg-[#f7f7f4] transition-all duration-300 flex flex-col">
            <div className="flex items-center justify-between px-4 py-2 border-b border-[#e6e5e0] bg-white">
              <span className="text-sm font-medium text-[#262520] truncate flex-1 mr-2">
                {selectedFile.filename}
              </span>
              <button
                onClick={() => setShowPreview(false)}
                className="p-1 rounded hover:bg-[#e6e5e0] transition-colors"
              >
                <X className="w-4 h-4 text-[#807d72]" />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <FilePreview selectedFile={selectedFile} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
