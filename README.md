# agent_skills

> 个人 Skills 仓库，存放各类 AI Agent 技能扩展

## 仓库说明

本仓库用于存放个人开发及使用的 Agent Skills，涵盖：

- 🏠 **personal/** — 个人项目及兴趣爱好的 skill
- 🏢 **company/** — 公司/团队项目专用的 skill

所有 skill 均遵循主流 Agent Skill 标准格式（如 OpenClaw SKILL.md 规范），可直接被 Agent 加载使用。

## 目录结构

```
agent_skills/
├── personal/          # 个人用 skill
│   └── *.md
├── company/           # 公司用 skill
│   └── *.md
└── README.md
```

## 使用方式

将对应 skill 目录放入 Agent 的 skills 目录后即可自动加载。具体加载规则请参考各 skill 内的说明。

## 开发规范

参考 `personal/skill-dev-guide/SKILL.md` 了解如何编写兼容的 Skill。
