import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDocuments } from "@/hooks/use-documents";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  Loader2,
  RefreshCw,
  Trash2,
  Upload,
  Search,
  FileText,
  ChevronRight,
  ChevronDown,
  File,
} from "lucide-react";
import { queryClient, getApiBaseUrl } from "@/lib/queryClient";

export default function DocumentPanel({ onFileSelect, selectedFile }) {
  const { toast } = useToast();
  const { documents, isLoading, refetch } = useDocuments();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const uploadFiles = async (files) => {
    setIsUploading(true);

    try {
      const baseApiUrl = getApiBaseUrl();

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        const validTypes = [
          "application/pdf",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "text/plain",
        ];
        if (!validTypes.includes(file.type)) {
          toast({
            title: "文件类型无效",
            description: `${file.name} 不是支持的文件类型，仅支持PDF、DOCX和TXT文件`,
            variant: "destructive",
          });
          continue;
        }

        const maxSize = 100 * 1024 * 1024;
        if (file.size > maxSize) {
          toast({
            title: "文件太大",
            description: `${file.name} 超过100MB限制`,
            variant: "destructive",
          });
          continue;
        }

        toast({
          title: `上传中 (${i + 1}/${files.length})`,
          description: `${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`,
        });

        const formData = new FormData();
        formData.append("file", file);

        const uploadUrl = `${baseApiUrl}/api/upload_doc/`;
        const response = await fetch(uploadUrl, {
          method: "POST",
          body: formData,
          credentials: "omit",
        });

        if (!response.ok) {
          throw new Error(`上传 ${file.name} 失败`);
        }

        console.log(`文件 ${file.name} 上传成功`);
      }

      queryClient.invalidateQueries({
        queryKey: [`${baseApiUrl}/api/documents`],
      });
      queryClient.invalidateQueries({
        queryKey: [`${baseApiUrl}/api/vector_store_size`],
      });

      toast({
        title: "上传成功",
        description: "文档已上传并正在处理中",
      });
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "上传失败",
        description: error instanceof Error ? error.message : "无法上传文档",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleUploadClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.accept = ".pdf,.docx,.doc,.txt";
    input.onchange = (e) => {
      const target = e.target;
      if (target.files && target.files.length > 0) {
        uploadFiles(target.files);
      }
    };
    input.click();
  };

  const refreshIndex = async () => {
    try {
      setIsRefreshing(true);
      await apiRequest("POST", "/api/reset_vector_store", {});
      await refetch();
      toast({
        title: "索引已刷新",
        description: "知识库已成功刷新。",
      });
    } catch (error) {
      toast({
        title: "刷新失败",
        description: "无法刷新知识库。请重试。",
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const clearKnowledgeBase = async () => {
    if (!confirm("确定要清空知识库吗？此操作将删除所有文档且无法撤销。")) {
      return;
    }

    try {
      setIsClearing(true);
      await apiRequest("DELETE", "/api/reset_vector_store", {});
      queryClient.invalidateQueries({
        queryKey: [`${getApiBaseUrl()}/api/vector_store_size`],
      });
      queryClient.invalidateQueries({
        queryKey: [`${getApiBaseUrl()}/api/documents`],
      });
      toast({
        title: "知识库已清空",
        description: "所有文档已从知识库中移除。",
      });
    } catch (error) {
      toast({
        title: "清空失败",
        description: "无法清空知识库。请重试。",
        variant: "destructive",
      });
    } finally {
      setIsClearing(false);
    }
  };

  const filteredDocuments = documents.filter((doc) =>
    doc.filename.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleDeleteDocument = async (filename) => {
    if (!confirm(`确定要删除 "${filename}" 吗？`)) {
      return;
    }

    try {
      await apiRequest("DELETE", `/api/documents/${filename}`, {});
      queryClient.invalidateQueries({
        queryKey: [`${getApiBaseUrl()}/api/documents`],
      });
      queryClient.invalidateQueries({
        queryKey: [`${getApiBaseUrl()}/api/vector_store_size`],
      });
      toast({
        title: "文档已删除",
        description: `${filename} 已从知识库中移除。`,
      });
    } catch (error) {
      toast({
        title: "删除失败",
        description: "无法删除文档。请重试。",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#f7f7f4]">
      {/* Header */}
      <div className="p-5 border-b border-[#e6e5e0]">
        <Button
          className="w-full bg-[#f54e00] hover:bg-[#d04200] text-white rounded-lg h-10 px-4 text-sm font-medium transition-colors mb-4"
          onClick={handleUploadClick}
          disabled={isUploading}
        >
          {isUploading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              上传中...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4 mr-2" />
              上传文档
            </>
          )}
        </Button>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#807d72]" />
          <Input
            placeholder="搜索文档..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 text-sm bg-white border border-[#e6e5e0] rounded-lg h-10 focus-visible:ring-1 focus-visible:ring-[#f54e00] focus-visible:border-[#f54e00] text-[#262520] placeholder:text-[#807d72]"
          />
        </div>
      </div>

      {/* Documents List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="mb-2">
          <h3 className="text-xs font-medium text-[#807d72] uppercase tracking-wider">
            文档库 ({filteredDocuments.length})
          </h3>
        </div>
        <div className="space-y-1">
          {filteredDocuments.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="w-10 h-10 text-[#807d72] mx-auto mb-3 opacity-50" />
              <p className="text-xs text-[#807d72]">
                {searchQuery ? "没有找到匹配的文档" : "暂无文档"}
              </p>
            </div>
          ) : (
            filteredDocuments.map((doc) => (
              <div
                key={doc.filename}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg cursor-pointer transition-all group ${
                  selectedFile?.filename === doc.filename
                    ? "bg-[#f54e00]/10 border border-[#f54e00]/20"
                    : "hover:bg-[#e6e5e0]/50 border border-transparent"
                }`}
                onClick={() => onFileSelect(doc)}
              >
                <File className="w-4 h-4 flex-shrink-0 text-[#807d72]" />
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm truncate ${
                      selectedFile?.filename === doc.filename
                        ? "text-[#f54e00] font-medium"
                        : "text-[#262520]"
                    }`}
                  >
                    {doc.filename}
                  </p>
                  {doc.file_size && (
                    <p className="text-xs text-[#807d72]">
                      {(doc.file_size / 1024 / 1024).toFixed(1)} MB
                    </p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteDocument(doc.filename);
                  }}
                  className="opacity-0 group-hover:opacity-100 text-[#807d72] hover:text-[#f54e00] hover:bg-[#f54e00]/10 p-1.5 h-auto transition-opacity rounded-md"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-[#e6e5e0]">
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={refreshIndex}
            disabled={isRefreshing}
            className="flex-1 bg-white border border-[#e6e5e0] hover:bg-[#e6e5e0]/50 hover:border-[#e6e5e0] text-[#262520] rounded-lg h-9"
          >
            {isRefreshing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearKnowledgeBase}
            disabled={isClearing || documents.length === 0}
            className="flex-1 bg-white border border-[#e6e5e0] hover:bg-[#e6e5e0]/50 hover:border-[#e6e5e0] text-[#262520] rounded-lg h-9"
          >
            {isClearing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
