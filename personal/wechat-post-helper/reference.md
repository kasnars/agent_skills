# 技术参考文档

## 目录
- [生成脚本详解](#生成脚本详解)
- [数据结构说明](#数据结构说明)
- [自动发布工作流](#自动发布工作流)
- [微信公众号 API 集成](#微信公众号-api-集成)
- [故障排查](#故障排查)

---

## 生成脚本详解

### 核心依赖

```bash
npm install docx
```

**为什么选择 docx 库？**
- ✅ 生成真正的 Office Open XML 格式（.docx）
- ✅ 完美支持中文和 emoji
- ✅ 可编程控制所有样式
- ✅ 无乱码问题
- ❌ 不支持 HTML 格式的 .doc（会导致导入乱码）

### 脚本架构

```
generate-docx.js
├── parseArgs()           # 解析命令行参数
├── createDocument()      # 创建文档核心函数
│   ├── 添加标题
│   ├── 遍历章节
│   │   ├── 添加小标题
│   │   └── 添加段落
│   └── 生成文件
└── main()                # 主入口
```

### 样式配置

```javascript
// 标题样式
{
    size: 36,        // 18号字（单位：半点）
    bold: true,
    font: '微软雅黑'
}

// 小标题样式
{
    size: 32,        // 16号字
    bold: true,
    font: '微软雅黑'
}

// 正文样式
{
    size: 24,        // 12号字
    font: '微软雅黑'
}

// 强调文字
{
    size: 24,
    bold: true,
    color: 'FF0000', // 红色
    font: '微软雅黑'
}
```

---

## 数据结构说明

### 文章数据结构

```typescript
interface ArticleData {
    title: string;           // 文章标题（包含 emoji）
    outputDir: string;       // 输出目录
    sections: Section[];     // 章节列表
}

interface Section {
    heading?: string;        // 小标题（可选）
    paragraphs: Paragraph[]; // 段落列表
}

interface Paragraph {
    text: string;            // 段落文本
    bold?: boolean;          // 是否加粗
    color?: string;          // 文字颜色（十六进制）
    isCode?: boolean;        // 是否为代码块（使用等宽字体和背景色）
}
```

### 完整示例

```json
{
  "title": "🤖 Agent工具使用指南",
  "outputDir": "./output",
  "sections": [
    {
      "paragraphs": [
        { "text": "开头引入..." }
      ]
    },
    {
      "heading": "📌 核心内容",
      "paragraphs": [
        { "text": "正文段落1" },
        { "text": "加粗强调", "bold": true },
        { "text": "红色强调", "color": "FF0000" }
      ]
    }
  ]
}
```

---

## 自动发布工作流

### 适用场景

仅适用于 **OpenClaw 等高自由度自托管 Agent**，具备以下条件：
- ✅ 有服务器运行环境
- ✅ 可安装额外依赖
- ✅ 有微信公众号 API 访问权限
- ✅ 可执行文件操作

### 工作流程

```
1. 生成 .docx 文件
   ↓
2. 转换为微信公众号格式
   ↓
3. 调用 API 上传草稿
   ↓
4. 删除本地 .docx 文件
   ↓
5. 通知用户确认发布
```

### 实现步骤

#### 步骤 1：安装微信公众号 SDK

```bash
npm install wechat-api
```

#### 步骤 2：配置公众号信息

创建 `wechat-config.json`：

```json
{
  "appId": "your-app-id",
  "appSecret": "your-app-secret",
  "token": "your-token"
}
```

#### 步骤 3：创建发布脚本

创建 `scripts/publish-draft.js`：

```javascript
const fs = require('fs');
const path = require('path');
const WechatAPI = require('wechat-api');

// 读取配置
const config = JSON.parse(fs.readFileSync('wechat-config.json', 'utf8'));
const api = new WechatAPI(config.appId, config.appSecret);

/**
 * 上传文章到草稿箱
 * @param {string} docxPath - .docx 文件路径
 * @param {string} title - 文章标题
 * @param {Object} options - 可选参数
 * @param {string} options.author - 作者名（默认 "Qoder"）
 * @param {string} options.coverMediaId - 封面图 media_id（默认从素材库获取）
 * @param {boolean} options.showCover - 是否显示封面（默认 1）
 */
async function publishToDraft(docxPath, title, options = {}) {
    const {
        author = 'Qoder',           // 默认作者名为 Agent 名称
        coverMediaId = null,        // 封面图 media_id，null 表示从素材库选择
        showCover = 1               // 默认显示封面
    } = options;
    
    try {
        console.log('📤 正在上传到草稿箱...');
        
        // 1. 读取 .docx 文件
        const docxBuffer = fs.readFileSync(docxPath);
        
        // 2. 上传文章内容（获取 content media_id）
        const uploadResult = await api.uploadPermanentMaterial('article', docxBuffer, {
            filename: `${title}.docx`
        });
        
        const contentMediaId = uploadResult.media_id;
        console.log(`✅ 文章内容上传成功，media_id: ${contentMediaId}`);
        
        // 3. 如果没有指定封面，从素材库获取第一个永久图片素材
        let thumbMediaId = coverMediaId;
        if (!thumbMediaId) {
            console.log('🖼️  未指定封面图，正在从素材库获取...');
            const materials = await api.getPermanentMaterials('image', 0, 1);
            if (materials.item_count > 0) {
                thumbMediaId = materials.item[0].media_id;
                console.log(`✅ 已从素材库获取封面图，media_id: ${thumbMediaId}`);
            } else {
                console.warn('⚠️  素材库中没有图片，将使用默认封面');
                // 可以上传一个默认封面图
                thumbMediaId = contentMediaId; // 临时使用内容 media_id
            }
        }
        
        // 4. 创建草稿
        const draft = {
            articles: [{
                title: title,
                author: author,
                content: docxBuffer.toString('base64'),
                content_source_url: '',
                digest: '',
                show_cover_pic: showCover,
                thumb_media_id: thumbMediaId
            }]
        };
        
        const draftResult = await api.createDraft(draft);
        console.log(`✅ 草稿创建成功，media_id: ${draftResult.media_id}`);
        console.log(`📝 作者: ${author}`);
        console.log(`🖼️  封面图 media_id: ${thumbMediaId}`);
        
        // 5. 删除本地文件
        fs.unlinkSync(docxPath);
        console.log('🗑️  本地文件已清理');
        
        // 6. 返回结果
        return {
            success: true,
            mediaId: draftResult.media_id,
            author: author,
            coverMediaId: thumbMediaId,
            message: '文章已保存到草稿箱，请登录公众号后台确认并发布'
        };
        
    } catch (error) {
        console.error('❌ 发布失败：', error.message);
        return {
            success: false,
            error: error.message
        };
    }
}

// 命令行接口
if (require.main === module) {
    const args = process.argv.slice(2);
    const [docxPath, title] = args;
    
    // 解析可选参数
    const options = {};
    for (let i = 2; i < args.length; i += 2) {
        if (args[i].startsWith('--')) {
            const key = args[i].slice(2);
            options[key] = args[i + 1];
        }
    }
    
    if (!docxPath || !title) {
        console.log('用法: node publish-draft.js <docx文件路径> <标题> [选项]');
        console.log('\n选项:');
        console.log('  --author <作者名>        设置作者名（默认: Qoder）');
        console.log('  --cover <media_id>       设置封面图 media_id（默认: 从素材库获取）');
        console.log('  --showCover <0|1>        是否显示封面（默认: 1）');
        console.log('\n示例:');
        console.log('  node publish-draft.js ./article.docx "文章标题"');
        console.log('  node publish-draft.js ./article.docx "文章标题" --author "张三" --cover "MEDIA_ID"');
        process.exit(1);
    }
    
    const publishOptions = {
        author: options.author || 'Qoder',
        coverMediaId: options.cover || null,
        showCover: options.showCover !== undefined ? parseInt(options.showCover) : 1
    };
    
    publishToDraft(docxPath, title, publishOptions).then(result => {
        if (result.success) {
            console.log('\n🎉 发布成功！');
            console.log(result.message);
            console.log(`📝 作者: ${result.author}`);
            console.log(`🖼️  封面图 media_id: ${result.coverMediaId}`);
        } else {
            console.error('\n❌ 发布失败');
            console.error(result.error);
            process.exit(1);
        }
    });
}

module.exports = { publishToDraft };
```

#### 步骤 4：集成到生成流程

修改 `generate-docx.js`，在生成完成后调用发布：

```javascript
const { publishToDraft } = require('./publish-draft');

async function main() {
    // ... 生成 .docx 文件
    
    const outputPath = await createDocument(articleData);
    console.log(`✅ 文件已生成：${outputPath}`);
    
    // 如果是自托管 Agent，自动发布
    if (process.env.AUTO_PUBLISH === 'true') {
        const result = await publishToDraft(
            outputPath,
            articleData.title,
            articleData.author || ''
        );
        
        if (result.success) {
            console.log(`\n📮 ${result.message}`);
        }
    }
}
```

### 环境变量

```bash
# 启用自动发布
export AUTO_PUBLISH=true

# 公众号配置
export WECHAT_APP_ID=your-app-id
export WECHAT_APP_SECRET=your-app-secret
```

---

## 微信公众号 API 集成

### 官方 API 文档

- [素材管理](https://developers.weixin.qq.com/doc/offiaccount/Asset_Management/New_temporary_materials.html)
- [草稿箱](https://developers.weixin.qq.com/doc/offiaccount/Draft_Box/Add_draft.html)

### 核心 API

#### 1. 获取 Access Token

```javascript
async function getAccessToken(appId, appSecret) {
    const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.access_token;
}
```

#### 2. 上传永久素材

```javascript
async function uploadPermanentMaterial(accessToken, type, buffer) {
    const url = `https://api.weixin.qq.com/cgi-bin/material/add_material?access_token=${accessToken}&type=${type}`;
    
    const formData = new FormData();
    formData.append('media', buffer, {
        filename: 'article.docx',
        contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    });
    
    const response = await fetch(url, {
        method: 'POST',
        body: formData
    });
    
    return await response.json();
}
```

#### 3. 创建草稿

```javascript
async function createDraft(accessToken, articles) {
    const url = `https://api.weixin.qq.com/cgi-bin/draft/add?access_token=${accessToken}`;
    
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ articles })
    });
    
    return await response.json();
}
```

### 注意事项

⚠️ **重要限制：**
- Access Token 有效期 2 小时，需要定时刷新
- 永久素材总数限制：5000
- 草稿箱容量限制：1000
- 单个文件大小限制：10MB

✅ **最佳实践：**
- 使用 Redis 缓存 Access Token
- 定期清理无用素材
- 错误处理要完善（网络、限流、权限等）
- 记录操作日志便于排查

---

## 故障排查

### 问题 1：生成失败，提示 "Cannot find module 'docx'"

**原因**：未安装依赖

**解决**：
```bash
cd personal/wechat-post-helper
npm install docx
```

### 问题 2：Word 打开后乱码

**原因**：可能使用了 HTML 格式而非真正的 .docx

**解决**：
- 确保使用 `generate-docx.js` 脚本生成
- 不要使用 `.doc` 扩展名（HTML 格式）
- 必须使用 `.docx` 扩展名

### 问题 3：导入微信公众号后格式丢失

**原因**：微信公众号编辑器对某些样式支持有限

**解决**：
- 使用 Word 打开后全选复制
- 避免使用复杂表格、公式
-  emoji 通常没问题，但特殊符号可能不显示

### 问题 4：自动发布失败，提示 "invalid media size"

**原因**：文件超过 10MB 限制

**解决**：
- 压缩图片
- 减少文章内容
- 分多篇发布

### 问题 5：Access Token 获取失败

**原因**：AppID 或 AppSecret 错误

**解决**：
- 检查公众号后台的 AppID 和 AppSecret
- 确认 IP 白名单已配置
- 检查网络是否正常

---

## 性能优化

### 批量生成

```javascript
const { createDocument } = require('./generate-docx');

async function batchGenerate(articles) {
    const results = [];
    
    for (const article of articles) {
        try {
            const path = await createDocument(article);
            results.push({ success: true, path, title: article.title });
        } catch (error) {
            results.push({ success: false, error: error.message, title: article.title });
        }
    }
    
    return results;
}
```

### 并发控制

```javascript
const pLimit = require('p-limit');
const limit = pLimit(3); // 最多3个并发

async function batchGenerateWithLimit(articles) {
    const promises = articles.map(article => 
        limit(() => createDocument(article))
    );
    
    return Promise.all(promises);
}
```

---

## 扩展功能

### 1. 支持封面图

```javascript
// 在 ArticleData 中添加封面
{
    title: "文章标题",
    coverImage: "./cover.jpg",
    sections: [...]
}
```

### 2. 支持原文链接

```javascript
{
    title: "文章标题",
    originalUrl: "https://example.com/original",
    sections: [...]
}
```

### 3. 支持定时发布

```javascript
// 使用 setTimeout 或 cron
const cron = require('node-cron');

cron.schedule('0 9 * * *', async () => {
    // 每天早上9点发布
    await publishToDraft(docxPath, title);
});
```

---

## 总结

### 手动流程（推荐）
1. 准备文章 JSON 配置
2. 运行 `generate-docx.js` 生成文件
3. 用 Word 打开检查
4. 复制粘贴到微信公众号编辑器
5. 预览并发布

### 自动流程（OpenClaw 等）
1. Agent 自动生成文章 JSON
2. 运行 `generate-docx.js` 生成文件
3. 运行 `publish-draft.js` 上传草稿
4. 删除本地 .docx 文件
5. 通知用户确认发布

选择哪种方式取决于你的使用场景和技术能力！
