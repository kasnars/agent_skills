# 微信公众号文章生成示例

## 示例 1：技术科普文章

### 文章信息
- **主题**：Agent工具使用指南
- **目标受众**：技术人员/开发者
- **风格**：轻松科普
- **字数**：约1500字

### 使用方式

#### 方式 1：使用 JSON 配置文件

1. 创建文章内容文件 `article-content.json`：

```json
{
  "title": "🤖 Agent工具使用指南：让你的AI助手真正\"动\"起来！",
  "outputDir": "./output",
  "sections": [
    {
      "paragraphs": [
        { "text": "你是否还在让AI只停留在\"问答\"层面？🤔" },
        { "text": "其实，现在的AI已经不只是聊天机器人那么简单了。通过Agent工具，你可以让AI真正\"动手\"帮你完成各种复杂任务。从自动搜索信息到执行代码，从数据分析到流程自动化，Agent正在重新定义人机协作的边界。" },
        { "text": "今天，我们就来聊聊如何用好Agent工具，让你的AI助手从\"能说会道\"升级为\"能干活的小帮手\"！✨" }
      ]
    },
    {
      "heading": "🧠 什么是Agent？不只是聊天机器人",
      "paragraphs": [
        { "text": "简单来说，Agent就是具备\"自主行动能力\"的AI程序。传统AI只能回答你的问题，而Agent可以：" },
        { "text": "• 主动搜索互联网获取最新信息" },
        { "text": "• 调用外部工具和API完成任务" },
        { "text": "• 分解复杂问题并逐步执行" },
        { "text": "• 在多个步骤间保持上下文记忆" },
        { "text": "打个比方，如果普通AI是\"百科全书\"，那Agent就是\"私人助理\"。它不仅能告诉你怎么做，还能直接帮你去做。💡" }
      ]
    },
    {
      "heading": "🛠️ 主流Agent工具盘点",
      "paragraphs": [
        { "text": "目前市面上有多种Agent工具和框架，各有特色：" },
        { "text": "1. 语言模型内置Agent能力", "bold": true },
        { "text": "像GPT-4、Claude等大模型本身就具备Function Calling能力，可以通过定义工具函数让模型自主调用。" },
        { "text": "2. 专业Agent框架", "bold": true },
        { "text": "LangChain、AutoGPT、BabyAGI等框架提供了更强大的Agent编排能力，适合开发者构建复杂应用。" },
        { "text": "选择哪种工具，主要取决于你的技术背景和使用场景。初学者建议从平台化工具入手，开发者则可以尝试开源框架。🔧" }
      ]
    },
    {
      "heading": "🌟 写在最后",
      "paragraphs": [
        { "text": "Agent工具正在快速进化，今天你觉得复杂的功能，明天可能就变得非常简单。关键在于，你是否愿意主动尝试、持续学习。" },
        { "text": "从一个小场景开始，让Agent帮你完成第一件实事。你会发现，AI不再是遥远的概念，而是实实在在的生产力工具。🚀" },
        { "text": "如果觉得这篇文章对你有帮助，记得点赞❤️、在看👁️、转发🔄，让更多开发者受益！", "bold": true, "color": "FF0000" },
        { "text": "关注我，获取更多AI实战干货！🔥", "bold": true, "color": "FF0000" }
      ]
    }
  ]
}
```

2. 运行生成命令：

```bash
# 首次使用需要安装依赖
npm install docx

# 生成 docx 文件
node scripts/generate-docx.js --content article-content.json
```

#### 方式 2：直接调用 API

```javascript
const { createDocument } = require('./scripts/generate-docx');

async function generateArticle() {
    const articleData = {
        title: "🤖 Agent工具使用指南",
        outputDir: "./output",
        sections: [
            // ... 文章内容
        ]
    };
    
    const outputPath = await createDocument(articleData);
    console.log(`文件已生成：${outputPath}`);
}

generateArticle();
```

### 输出效果

生成的 .docx 文件具有以下特点：
- ✅ 标题：18号字，加粗
- ✅ 小标题：16号字，加粗
- ✅ 正文：12号字，微软雅黑
- ✅ 支持 emoji 表情
- ✅ 支持颜色设置（如红色强调）
- ✅ 标准 Office Open XML 格式
- ✅ 可用 Word/WPS 直接打开
- ✅ 可复制粘贴到微信公众号编辑器

---

## 示例 2：产品推广文章

### 文章信息
- **主题**：2024年最佳效率工具推荐
- **目标受众**：职场人士
- **风格**：实用干货
- **字数**：约2000字

### JSON 配置示例

```json
{
  "title": "💼 2024年职场人必知的10个效率神器",
  "outputDir": "./output",
  "sections": [
    {
      "paragraphs": [
        { "text": "工作效率低？经常加班？可能是你的工具箱该升级了！" },
        { "text": "经过3个月的实测，我精选出10个真正能提升效率的神器。第5个让我的工作效率提升了3倍！" }
      ]
    },
    {
      "heading": "🥇 Top 1-3：核心工具",
      "paragraphs": [
        { "text": "1. 智能写作助手", "bold": true },
        { "text": "AI驱动的内容创作工具，支持自动生成、改写、优化..." }
      ]
    }
  ]
}
```

---

## 常见问题

### Q1: 为什么不用 Markdown 或 HTML？
**A**: 微信公众号编辑器导入 Markdown 或 HTML 会出现乱码。必须使用真正的 .docx 格式（Office Open XML 标准）。

### Q2: 如何在 OpenClaw 等自托管 Agent 中自动发布？
**A**: 参考 `reference.md` 中的自动发布工作流，集成微信公众号 API 即可实现：
1. 生成 .docx 文件
2. 调用 API 上传到草稿箱
3. 删除本地文件
4. 通知用户确认发布

### Q3: 可以自定义字体和样式吗？
**A**: 可以！修改 `generate-docx.js` 中的配置：
- `font`: 字体名称
- `size`: 字号（单位：半点，24 = 12号字）
- `color`: 颜色（十六进制，如 'FF0000'）
- `bold`: 是否加粗

### Q4: 如何批量生成多篇文章？
**A**: 创建多个 JSON 配置文件，然后批量执行：

```bash
for file in articles/*.json; do
    node scripts/generate-docx.js --content "$file"
done
```

---

## 最佳实践

1. **内容准备**：先用 Markdown 写草稿，确认内容后再转为 JSON 格式
2. **样式统一**：创建团队标准的 JSON 模板，确保风格一致
3. **版本管理**：将 JSON 配置文件纳入 Git 管理，.docx 文件忽略
4. **自动化**：集成到 CI/CD 流程，定期自动生成文章
5. **质量保证**：生成后用 Word 打开检查，再导入微信公众号

---

## 文件结构

```
wechat-post-helper/
├── SKILL.md                    # 技能说明
├── examples.md                 # 本文件
├── reference.md                # 详细技术文档
├── scripts/
│   ├── generate-docx.js        # 生成脚本
│   └── publish-draft.js        # 自动发布脚本（可选）
└── package.json                # 依赖配置
```

---

## 下一步

- 查看 [SKILL.md](SKILL.md) 了解完整工作流程
- 查看 [reference.md](reference.md) 了解技术细节和 API 集成
- 直接开始使用：准备你的第一篇文章 JSON 配置
