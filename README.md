# MeEdu

开源在线教育平台：课程展示、详情、购买、章节列表。Express 提供 API，Vue 3 + Vite 提供前端。
**适用人群**：想快速搭建在线课程站点的个人讲师、教育机构与独立开发者。

## 功能特性

- 课程列表 / 详情 / 章节展示
- 购买课程（演示逻辑，可替换为支付网关）
- 数据持久化到 `server/data.json`

## 技术栈与目录结构

**技术栈**：Node.js / Express / Vue 3 / Vite

```
meedu/
├── server/
│   ├── index.js       # Express API
│   └── data.json      # JSON 数据存储
└── client/
    ├── src/           # Vue 3 前端源码
    ├── index.html
    ├── vite.config.js
    └── package.json
```

## 快速开始

### 1. 启动 API

```bash
npm install
npm start
# http://localhost:4000
```

### 2. 启动前端

```bash
cd client
npm install
npm run dev
# http://localhost:5173
```

**部署说明**：前后端分离架构；生产环境可将 `client` 通过 `vite build` 构建为静态文件，由 Express（或任意静态服务器如 Nginx）托管，并将 API 反代至 4000 端口。

## 验证状态

引用 AI Factory 全套件验证报告（[VERIFICATION.md](../../VERIFICATION.md)，2026-09-18，Windows 11 / Node v22.14.0），本机已完成全链路运行验证：

- Node 启动 + HTTP 冒烟：
  - GET /health -> ok
  - GET /api/courses -> 3 门课程
  - GET /api/courses/c1 -> 详情 + 2 章节
  - POST /api/courses/c1/buy -> 购买成功
  - GET /api/purchases?userId=u-smoke -> 2 条购买记录

## API

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/health` | 健康检查 |
| GET | `/api/courses` | 课程列表 |
| GET | `/api/courses/:id` | 课程详情（含章节） |
| POST | `/api/courses/:id/buy` | 购买课程 |
| GET | `/api/purchases` | 购买记录 |

## License

MIT License，详见 [LICENSE](LICENSE)。本项目代码与文档由 AI 辅助生成，仅供参考与学习使用。

## 支持项目

如果这个项目对你有帮助，欢迎赞助支持持续开发：

[![PayPal](https://img.shields.io/badge/Donate-PayPal-00457C?style=flat-square&logo=paypal)](https://paypal.me/Junlong439)
