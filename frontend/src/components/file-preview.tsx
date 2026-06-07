import { useState } from "react";
import { FileText, AlertCircle } from "lucide-react";
import { getApiBaseUrl } from "@/lib/queryClient";

export default function FilePreview({ selectedFile }) {
  const [previewError, setPreviewError] = useState(false);

  if (!selectedFile) {
    return (
      <div className="h-full flex items-center justify-center bg-[#fafaf7]">
        <div className="text-center">
          <div className="w-16 h-16 bg-white border border-[#e6e5e0] rounded-lg flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-[#807d72]" />
          </div>
          <h3 className="text-sm font-medium text-[#262520] mb-1">选择文档预览</h3>
          <p className="text-xs text-[#807d72]">点击左侧文档库中的文件进行预览</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex-1 overflow-hidden">
        {selectedFile.filename.toLowerCase().endsWith(".pdf") ? (
          <div className="h-full bg-white">
            {previewError ? (
              <div className="flex items-center justify-center h-full bg-[#fafaf7]">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white border border-[#e6e5e0] rounded-lg flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-8 h-8 text-[#807d72]" />
                  </div>
                  <h3 className="text-sm font-medium text-[#262520] mb-1">无法预览文件</h3>
                  <p className="text-xs text-[#807d72]">此文件类型暂不支持在线预览</p>
                </div>
              </div>
            ) : (
              <iframe
                src={`${getApiBaseUrl()}/api/preview/${encodeURIComponent(selectedFile.filename)}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                className="w-full h-full border-0"
                title={`预览 ${selectedFile.filename}`}
                onError={() => setPreviewError(true)}
              />
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full bg-[#fafaf7]">
            <div className="text-center">
              <div className="w-16 h-16 bg-white border border-[#e6e5e0] rounded-lg flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-[#807d72]" />
              </div>
              <h3 className="text-sm font-medium text-[#262520] mb-1">文件预览</h3>
              <p className="text-xs text-[#807d72]">此文件类型暂不支持在线预览</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
