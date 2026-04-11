# Release 发布包

这里存放用于测试的 zip 文件

## 当前版本

### wechat-post-helper.zip
- **版本**: v1.0.0
- **大小**: ~15KB
- **功能**: 微信公众号文章生成工具
- **特性**:
  - ✅ 生成标准 .docx 格式文件（无乱码）
  - ✅ 支持中文和 emoji
  - ✅ 可自定义字体、字号、颜色
  - ✅ 支持手动导入和自动发布两种模式
  - ✅ 包含完整文档和示例

## 安装方式

### 方式 1：手动安装
```bash
# 1. 解压到 skills 目录
unzip wechat-post-helper.zip -d ~/.qoder/skills/

# 2. 安装依赖
cd ~/.qoder/skills/wechat-post-helper
npm install

# 3. 开始使用
# 在 Qoder 中调用 wechat-post-helper 技能即可
```

### 方式 2：项目级别安装
```bash
# 1. 解压到项目的 skills 目录
unzip wechat-post-helper.zip -d .qoder/skills/

# 2. 安装依赖
cd .qoder/skills/wechat-post-helper
npm install
```

## 使用示例

```bash
# 生成文章
node scripts/generate-docx.js --content article.json

# 输出
✅ 文件已生成：/path/to/output/文章标题.docx
```

## 文件结构

```
wechat-post-helper/
├── SKILL.md              # 技能说明（Agent 读取）
├── QUICKSTART.md         # 快速开始指南
├── examples.md           # 使用示例
├── reference.md          # 技术参考文档
├── package.json          # 依赖配置
├── .gitignore           # Git 忽略规则
└── scripts/
    └── generate-docx.js  # 生成脚本
```

## 注意事项

1. **首次使用需要安装依赖**：`npm install`
2. **Node.js 版本要求**：建议 v14 或更高版本
3. **自动发布功能**：需要额外配置微信公众号 API

## 测试清单

- [ ] 解压成功
- [ ] 依赖安装成功
- [ ] SKILL.md 可被 Agent 识别
- [ ] 脚本可正常运行
- [ ] 生成的 .docx 文件无乱码
- [ ] 可成功导入微信公众号编辑器