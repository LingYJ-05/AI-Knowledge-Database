# MindFlow - 智能知识库系统

MindFlow 是一个基于先进 RAG 技术的智能知识库系统，让您的文档会说话。为企业和个人提供高效的知识管理和智能问答服务。

---

## 项目简介

MindFlow 基于 RAG（Retrieval Augmented Generation）架构，让文档管理变得智能化。用户可以上传 PDF、DOCX、TXT、Markdown 等文档，系统会自动解析、向量化，并构建可查询的知识库。通过友好的聊天界面提问，MindFlow 结合语义检索和大语言模型能力生成精准回答，并标明答案来源，是您的智能知识伙伴。

---

## 主要功能

- **文档上传与管理**
  - 支持多格式文档上传（PDF, DOCX, TXT, MD, HTML）
  - 自动文本解析、分块、嵌入并构建向量索引
  - 显示上传历史与知识库状态
  - 一键清空知识库或刷新索引

- **智能问答系统**
  - 流畅的聊天交互体验
  - 结合向量搜索和大语言模型生成准确答案
  - 附带引用来源，增强可信度

- **现代化界面设计**
  - 分栏式界面（文档区 + 聊天区）
  - 动态视觉效果与流畅动画
  - 响应式设计，支持多设备访问

---

## 技术栈与架构

**后端**：

- FastAPI（Python 3.9+）
- LangChain：大模型应用框架
- FAISS（CPU）：向量检索
- SentenceTransformers：嵌入模型
- DeepSeek API（可替换为 OpenAI 等）
- PyMuPDF, python-docx, dotenv

**前端**：

- React + TypeScript + Vite
- Tailwind CSS
- Framer Motion：动画效果
- @tanstack/react-query：状态管理
- lucide-react：图标库
- wouter：路由

**部署与开发**：

- Vercel（前端）
- Railway（后端）
- Git + VS Code + venv

---

## 快速启动指南（本地运行）

### 环境依赖

- Python 3.9+
- Node.js (建议 LTS)
- Git

### 1. 克隆项目

```bash
git clone https://github.com/LingYJ-05/AI-Knowledge-Database.git
cd AI-Knowledge-Database
```

### 2. 后端启动

````bash
cd backend
python -m venv .venv
.venv\Scripts\activate

### 3. 前端启动

```bash
cd frontend
npm install
npm run dev
````

访问：http://localhost:5173

---

## API 端点简览

- `POST /api/upload_doc/`：上传文档
- `GET /api/documents/`：获取上传列表
- `POST /api/query/`：发送问题并获取回答
- `GET /api/vector_store_size/`：查看索引状态
- `POST /api/reset_vector_store/`：清空知识库

---

## 云部署建议

**后端部署（Railway 或 Render）**

- 使用容器部署（Docker 可选）
- 配置 .env 环境变量（如 DEEPSEEK_API_KEY）
- 持久化 index/ 与 data/ 文件夹

**前端部署（Vercel）**

```bash
npm run build
# 然后连接 Vercel 进行静态部署
```
