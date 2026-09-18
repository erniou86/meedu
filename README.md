# MeEdu

开源在线教育平台：课程展示、详情、购买、章节列表。Express 提供 API，Vue 3 + Vite 提供前端。

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

## 功能
- 课程列表 / 详情 / 章节展示
- 购买课程（演示逻辑，可替换为支付网关）
- 数据持久化到 `server/data.json`

## API
| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/courses` | 课程列表 |
| GET | `/api/courses/:id` | 课程详情（含章节） |
| POST | `/api/courses/:id/buy` | 购买课程 |
| GET | `/api/purchases` | 购买记录 |

## 目录结构
```
server/          Express API + JSON 数据
client/          Vue 3 + Vite 前端
```

## License
MIT
