# 微信公众号文章助手 - 快速开始

## 5 分钟快速上手

### 第 1 步：安装依赖

```bash
cd personal/wechat-post-helper
npm install
```

### 第 2 步：准备文章内容

创建文件 `my-article.json`：

```json
{
  "title": "🚀 我的第一篇文章",
  "outputDir": "./output",
  "sections": [
    {
      "paragraphs": [
        { "text": "这是开头段落，引入话题..." },
        { "text": "继续展开说明..." }
      ]
    },
    {
      "heading": "📌 核心内容",
      "paragraphs": [
        { "text": "第一个要点..." },
        { "text": "第二个要点...", "bold": true }
      ]
    },
    {
      "heading": "✨ 总结",
      "paragraphs": [
        { "text": "总结全文，呼吁行动..." },
        { "text": "点赞、在看、转发！", "bold": true, "color": "FF0000" }
      ]
    }
  ]
}
```

### 第 3 步：生成 .docx 文件

```bash
node scripts/generate-docx.js --content my-article.json
```

输出：
```
正在生成 .docx 文件...
✅ 文件已生成：/path/to/output/🚀 我的第一篇文章.docx
💡 提示：可以用 Word 打开后复制到微信公众号编辑器
```

### 第 4 步：导入微信公众号

1. 用 Word 打开生成的 .docx 文件
2. 全选（Ctrl+A）并复制（Ctrl+C）
3. 打开微信公众号编辑器
4. 粘贴（Ctrl+V）
5. 预览检查，确认无误后发布

---

## 完整工作流程

```
用户需求 → 确认细节 → 构建大纲 → 生成 JSON → 生成 .docx → 导入公众号 → 发布
```

### 方式 1：手动流程（适合个人使用）

```
1. 和 Agent 对话，确定文章主题和风格
2. Agent 生成文章 JSON 配置
3. 运行脚本生成 .docx
4. 手动导入微信公众号
```

### 方式 2：自动流程（适合 OpenClaw 等自托管 Agent）

```
1. 用户给出主题
2. Agent 自动生成 JSON
3. Agent 自动运行脚本生成 .docx
4. Agent 调用 API 上传草稿箱
5. Agent 删除本地 .docx
6. Agent 通知用户："已保存到草稿箱，请确认发布"
```

---

## 文件说明

```
wechat-post-helper/
├── SKILL.md              # 📖 技能说明（Agent 读取）
├── examples.md           # 📝 使用示例
├── reference.md          # 🔧 技术文档
├── package.json          # 📦 依赖配置
├── .gitignore            # 🚫 Git 忽略规则
└── scripts/
    ├── generate-docx.js  # ⚙️ 生成脚本
    └── publish-draft.js  # 📮 发布脚本（可选）
```

---

## 常用命令

```bash
# 安装依赖（首次使用）
npm install

# 生成文章
node scripts/generate-docx.js --content article.json

# 发布到草稿箱（需要配置公众号）
node scripts/publish-draft.js ./output/文章标题.docx "文章标题" "作者"
```

---

## 下一步

- 📖 阅读 [SKILL.md](SKILL.md) 了解完整规范
- 📝 查看 [examples.md](examples.md) 了解更多示例
- 🔧 查看 [reference.md](reference.md) 了解技术细节和自动发布

---

## 遇到问题？

### Q: 提示找不到 docx 模块
```bash
npm install docx
```

### Q: Word 打开后乱码
确保使用 `.docx` 扩展名，不要用 `.doc`

### Q: 导入公众号后格式不对
用 Word 打开后全选复制，不要直接导入文件

---

**开始创作你的第一篇文章吧！** 🎉
