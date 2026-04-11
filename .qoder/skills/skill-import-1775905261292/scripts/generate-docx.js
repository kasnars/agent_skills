#!/usr/bin/env node

/**
 * 微信公众号文章 .docx 生成脚本
 * 
 * 使用方法：
 * node scripts/generate-docx.js [options]
 * 
 * 选项：
 *   --title     文章标题
 *   --output    输出目录（默认当前目录）
 *   --content   文章内容 JSON 文件路径
 * 
 * 示例：
 * node scripts/generate-docx.js --title "Agent工具使用指南" --output ./dist
 */

const fs = require('fs');
const path = require('path');
const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } = require('docx');

// 解析命令行参数
function parseArgs() {
    const args = process.argv.slice(2);
    const options = {};
    
    for (let i = 0; i < args.length; i += 2) {
        if (args[i].startsWith('--')) {
            const key = args[i].slice(2);
            options[key] = args[i + 1];
        }
    }
    
    return options;
}

// 创建文档
async function createDocument(articleData) {
    const { title, sections, outputDir } = articleData;
    
    const children = [];
    
    // 添加标题
    children.push(
        new Paragraph({
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.LEFT,
            children: [
                new TextRun({
                    text: title,
                    bold: true,
                    size: 36, // 18号字
                    font: '微软雅黑',
                }),
            ],
            spacing: { after: 400 },
        })
    );
    
    // 添加各个章节
    sections.forEach((section, index) => {
        // 添加小标题（如果有）
        if (section.heading) {
            children.push(
                new Paragraph({
                    heading: HeadingLevel.HEADING_2,
                    children: [
                        new TextRun({
                            text: section.heading,
                            bold: true,
                            size: 32, // 16号字
                            font: '微软雅黑',
                        }),
                    ],
                    spacing: { after: 300, before: index > 0 ? 300 : 0 },
                })
            );
        }
        
        // 添加段落
        section.paragraphs.forEach((para, pIndex) => {
            const isBold = para.bold || false;
            const color = para.color || undefined;
            
            children.push(
                new Paragraph({
                    children: [
                        new TextRun({
                            text: para.text,
                            bold: isBold,
                            size: 24, // 12号字
                            color: color,
                            font: '微软雅黑',
                        }),
                    ],
                    spacing: { after: 200 },
                })
            );
        });
        
        // 章节间添加空行
        if (index < sections.length - 1) {
            children.push(
                new Paragraph({
                    children: [],
                    spacing: { after: 200 },
                })
            );
        }
    });
    
    const doc = new Document({
        sections: [{
            properties: {},
            children: children,
        }],
    });
    
    // 生成文件
    const buffer = await Packer.toBuffer(doc);
    const fileName = `${title}.docx`;
    const outputPath = path.join(outputDir || process.cwd(), fileName);
    
    fs.writeFileSync(outputPath, buffer);
    
    return outputPath;
}

// 主函数
async function main() {
    try {
        const options = parseArgs();
        
        // 如果提供了 content 文件，读取内容
        let articleData;
        if (options.content) {
            const contentPath = path.resolve(options.content);
            articleData = JSON.parse(fs.readFileSync(contentPath, 'utf8'));
        } else {
            // 否则使用交互式或默认内容
            console.log('请提供文章内容 JSON 文件路径（--content 参数）');
            console.log('JSON 格式示例：');
            console.log(JSON.stringify({
                title: "🤖 文章标题",
                outputDir: "./output",
                sections: [
                    {
                        heading: "📌 小标题",
                        paragraphs: [
                            { text: "正文内容..." },
                            { text: "加粗内容", bold: true }
                        ]
                    }
                ]
            }, null, 2));
            process.exit(1);
        }
        
        // 确保输出目录存在
        if (articleData.outputDir) {
            fs.mkdirSync(articleData.outputDir, { recursive: true });
        }
        
        console.log('正在生成 .docx 文件...');
        const outputPath = await createDocument(articleData);
        console.log(`✅ 文件已生成：${outputPath}`);
        console.log('💡 提示：可以用 Word 打开后复制到微信公众号编辑器');
        
    } catch (error) {
        console.error('❌ 生成失败：', error.message);
        console.error(error.stack);
        process.exit(1);
    }
}

// 导出供其他模块使用
module.exports = { createDocument };

// 直接运行时执行
if (require.main === module) {
    main();
}
