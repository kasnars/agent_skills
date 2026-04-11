const { Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel, Spacing } = require('docx');
const fs = require('fs');
const path = require('path');

// 文章配置
const articleConfig = {
  title: "⚛️ React快速上手：从零基础到构建第一个应用",
  outputDir: path.join(__dirname, '..', '..', '..', '..', 'playground'),
  outputFile: "React快速上手.docx"
};

// 确保输出目录存在
if (!fs.existsSync(articleConfig.outputDir)) {
  fs.mkdirSync(articleConfig.outputDir, { recursive: true });
}

// 创建文档
const doc = new Document({
  sections: [{
    properties: {},
    children: [
      // 标题
      new Paragraph({
        heading: HeadingLevel.TITLE,
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
        children: [
          new TextRun({
            text: "⚛️ React快速上手：从零基础到构建第一个应用",
            bold: true,
            size: 36, // 18号字
            font: "微软雅黑",
          })
        ]
      }),

      // 开头引入
      new Paragraph({
        spacing: { before: 200, after: 100 },
        children: [
          new TextRun({
            text: "你是否还在为选择前端框架而纠结？🤔",
            bold: true,
            size: 24,
            font: "微软雅黑",
          })
        ]
      }),

      new Paragraph({
        spacing: { after: 100 },
        children: [
          new TextRun({
            text: "在2024年的今天，React依然是全球最受欢迎的前端框架之一。从Facebook到Airbnb，从Netflix到Instagram，无数知名公司都在使用React构建他们的产品。",
            size: 24,
            font: "微软雅黑",
          })
        ]
      }),

      new Paragraph({
        spacing: { after: 100 },
        children: [
          new TextRun({
            text: '很多新手开发者问我："学React难吗？"我的回答是：只要你掌握了正确的方法，React其实比你想的简单得多！',
            size: 24,
            font: "微软雅黑",
          })
        ]
      }),

      new Paragraph({
        spacing: { after: 100 },
        children: [
          new TextRun({
            text: "今天，我将带你从零开始，用最简洁的方式掌握React核心概念，并手把手教你构建第一个应用。全程干货，建议收藏！✨",
            size: 24,
            font: "微软雅黑",
          })
        ]
      }),

      // 第一部分：什么是React
      new Paragraph({
        spacing: { before: 300, after: 100 },
        children: [
          new TextRun({
            text: "📦 什么是React？不只是个库",
            bold: true,
            size: 32, // 16号字
            font: "微软雅黑",
          })
        ]
      }),

      new Paragraph({
        spacing: { after: 100 },
        children: [
          new TextRun({
            text: "React是由Facebook开发的JavaScript库，专门用于构建用户界面。与Angular、Vue等完整框架不同，React专注于View层，这让它更加灵活和轻量。",
            size: 24,
            font: "微软雅黑",
          })
        ]
      }),

      new Paragraph({
        spacing: { after: 100 },
        children: [
          new TextRun({
            text: "React的核心理念有三个：组件化、声明式和单向数据流。组件化让你可以把界面拆分成独立可复用的部分；声明式让你只需要描述UI应该长什么样，而不需要关心如何更新DOM；单向数据流则让数据流向更可预测，调试更容易。",
            size: 24,
            font: "微软雅黑",
          })
        ]
      }),

      new Paragraph({
        spacing: { after: 100 },
        children: [
          new TextRun({
            text: "💡 记住：React最大的优势是虚拟DOM和组件化思想，这让它性能优秀且易于维护。",
            size: 24,
            font: "微软雅黑",
          })
        ]
      }),

      // 第二部分：环境搭建
      new Paragraph({
        spacing: { before: 300, after: 100 },
        children: [
          new TextRun({
            text: "🛠️ 环境搭建：5分钟创建React项目",
            bold: true,
            size: 32,
            font: "微软雅黑",
          })
        ]
      }),

      new Paragraph({
        spacing: { after: 100 },
        children: [
          new TextRun({
            text: "在开始之前，你需要安装Node.js（建议16.x以上版本）。安装完成后，我们就可以使用官方脚手架工具Create React App来快速创建项目了。",
            size: 24,
            font: "微软雅黑",
          })
        ]
      }),

      new Paragraph({
        spacing: { after: 100 },
        children: [
          new TextRun({
            text: "打开终端，运行以下命令：",
            size: 24,
            font: "微软雅黑",
          })
        ]
      }),

      new Paragraph({
        spacing: { after: 100 },
        children: [
          new TextRun({
            text: "npx create-react-app my-first-app",
            bold: true,
            size: 22,
            font: "Courier New",
          })
        ]
      }),

      new Paragraph({
        spacing: { after: 100 },
        children: [
          new TextRun({
            text: "这个命令会自动完成所有配置工作，包括Webpack、Babel等工具。等待安装完成后，进入项目目录并启动开发服务器：",
            size: 24,
            font: "微软雅黑",
          })
        ]
      }),

      new Paragraph({
        spacing: { after: 100 },
        children: [
          new TextRun({
            text: "cd my-first-app\nnpm start",
            bold: true,
            size: 22,
            font: "Courier New",
          })
        ]
      }),

      new Paragraph({
        spacing: { after: 100 },
        children: [
          new TextRun({
            text: "🎉 浏览器会自动打开http://localhost:3000，你就能看到React的欢迎页面了！整个过程不超过5分钟，是不是很简单？",
            size: 24,
            font: "微软雅黑",
          })
        ]
      }),

      // 第三部分：第一个组件
      new Paragraph({
        spacing: { before: 300, after: 100 },
        children: [
          new TextRun({
            text: "💻 第一个组件：Hello World实战",
            bold: true,
            size: 32,
            font: "微软雅黑",
          })
        ]
      }),

      new Paragraph({
        spacing: { after: 100 },
        children: [
          new TextRun({
            text: "在React中，一切都是组件。让我们创建第一个组件。打开src/App.js，你会看到默认的代码。现在，让我们把它改成一个简单的欢迎组件：",
            size: 24,
            font: "微软雅黑",
          })
        ]
      }),

      new Paragraph({
        spacing: { after: 100 },
        children: [
          new TextRun({
            text: "function App() {\n  return (\n    <div>\n      <h1>你好，React！</h1>\n      <p>这是我的第一个React应用 🚀</p>\n    </div>\n  );\n}",
            bold: true,
            size: 22,
            font: "Courier New",
          })
        ]
      }),

      new Paragraph({
        spacing: { after: 100 },
        children: [
          new TextRun({
            text: "这就是一个最简单的React组件！注意几个关键点：组件名必须大写开头（这是规定）；使用JSX语法（看起来像HTML，但其实是JavaScript）；必须有return语句返回JSX。",
            size: 24,
            font: "微软雅黑",
          })
        ]
      }),

      new Paragraph({
        spacing: { after: 100 },
        children: [
          new TextRun({
            text: '保存文件后，浏览器会自动刷新，你就能看到"你好，React！"的字样了。这就是React的热更新功能，开发体验非常棒！✨',
            size: 24,
            font: "微软雅黑",
          })
        ]
      }),

      // 第四部分：Hooks入门
      new Paragraph({
        spacing: { before: 300, after: 100 },
        children: [
          new TextRun({
            text: '🔥 Hooks入门：让组件"活"起来',
            bold: true,
            size: 32,
            font: "微软雅黑",
          })
        ]
      }),

      new Paragraph({
        spacing: { after: 100 },
        children: [
          new TextRun({
            text: '如果只是显示静态内容，那还不够有趣。让我们用useState来添加交互功能。useState是React最常用的Hook，它让组件拥有"记忆"能力。',
            size: 24,
            font: "微软雅黑",
          })
        ]
      }),

      new Paragraph({
        spacing: { after: 100 },
        children: [
          new TextRun({
            text: "来看一个计数器示例：",
            size: 24,
            font: "微软雅黑",
          })
        ]
      }),

      new Paragraph({
        spacing: { after: 100 },
        children: [
          new TextRun({
            text: "import { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  \n  return (\n    <div>\n      <p>你点击了 {count} 次</p>\n      <button onClick={() => setCount(count + 1)}>\n        点我 +1\n      </button>\n    </div>\n  );\n}",
            bold: true,
            size: 22,
            font: "Courier New",
          })
        ]
      }),

      new Paragraph({
        spacing: { after: 100 },
        children: [
          new TextRun({
            text: "useState接收一个初始值，返回一个数组：第一个元素是当前状态值，第二个是更新状态的函数。每次调用setCount，React都会重新渲染组件，显示最新的count值。",
            size: 24,
            font: "微软雅黑",
          })
        ]
      }),

      new Paragraph({
        spacing: { after: 100 },
        children: [
          new TextRun({
            text: "🎯 小贴士：useState可以多次使用，每个状态独立管理。比如你可以同时用useState管理count、name、isLoading等多个状态。",
            size: 24,
            font: "微软雅黑",
          })
        ]
      }),

      new Paragraph({
        spacing: { after: 100 },
        children: [
          new TextRun({
            text: "再来看useEffect，它用于处理副作用（比如数据请求、订阅等）。最常见的用法是在组件挂载时执行一次：",
            size: 24,
            font: "微软雅黑",
          })
        ]
      }),

      new Paragraph({
        spacing: { after: 100 },
        children: [
          new TextRun({
            text: "import { useEffect } from 'react';\n\nuseEffect(() => {\n  console.log('组件已挂载！');\n}, []); // 空数组表示只执行一次",
            bold: true,
            size: 22,
            font: "Courier New",
          })
        ]
      }),

      new Paragraph({
        spacing: { after: 100 },
        children: [
          new TextRun({
            text: "这两个Hook是React开发的基石，掌握了它们，你就已经入门React了！💪",
            size: 24,
            font: "微软雅黑",
          })
        ]
      }),

      // 结尾总结
      new Paragraph({
        spacing: { before: 300, after: 100 },
        children: [
          new TextRun({
            text: "✨ 总结：你的React学习路线图",
            bold: true,
            size: 32,
            font: "微软雅黑",
          })
        ]
      }),

      new Paragraph({
        spacing: { after: 100 },
        children: [
          new TextRun({
            text: "恭喜你已经迈出了React学习的第一步！🎉 回顾一下今天的内容：我们了解了React的核心概念，完成了环境搭建，创建了第一个组件，还学习了useState和useEffect这两个核心Hook。",
            size: 24,
            font: "微软雅黑",
          })
        ]
      }),

      new Paragraph({
        spacing: { after: 100 },
        children: [
          new TextRun({
            text: "接下来的学习建议：先用React做一个小项目（比如TodoList），实践是最好的老师；然后学习组件间通信（props）、条件渲染、列表渲染等基础概念；最后再深入React Router、状态管理等进阶内容。",
            size: 24,
            font: "微软雅黑",
          })
        ]
      }),

      new Paragraph({
        spacing: { after: 100 },
        children: [
          new TextRun({
            text: "💡 记住：不要试图一次性学完所有东西。循序渐进，边做边学，你会发现React其实很友好。遇到问题时，官方文档（react.dev）是你最好的朋友。",
            size: 24,
            font: "微软雅黑",
          })
        ]
      }),

      new Paragraph({
        spacing: { after: 100 },
        children: [
          new TextRun({
            text: "如果你觉得这篇文章有帮助，欢迎点赞、收藏、分享给更多想学React的朋友！有问题请在评论区留言，我会一一解答。我们下期见！👋😊",
            size: 24,
            font: "微软雅黑",
          })
        ]
      }),
    ],
  }],
});

// 生成文件
const outputPath = path.join(articleConfig.outputDir, articleConfig.outputFile);

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync(outputPath, buffer);
  console.log(`✅ 文章已成功生成：${outputPath}`);
  console.log(`📄 文件大小：${(fs.statSync(outputPath).size / 1024).toFixed(2)} KB`);
}).catch((err) => {
  console.error('❌ 生成文件失败：', err);
  process.exit(1);
});
