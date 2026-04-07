# Avue 组件库使用指南 Skill

适用于本项目的 Avue 组件库开发规范和最佳实践指南。

## 支持的 Agent 工具

| 工具 | 配置文件 | 使用方式 |
|------|---------|---------|
| Qoder | `SKILL.md` | 将整个 `avue-guide` 文件夹放入 `.qoder/skills/` 目录 |
| Claude | `CLAUDE.md` | 将 `CLAUDE.md` 放入项目根目录或 `.claude/` 目录 |
| Cursor | `.cursorrules` | 将 `.cursorrules` 放入项目根目录 |
| Windsurf | `.windsurfrules` | 将 `.windsurfrules` 放入项目根目录 |
| Trae | `CLAUDE.md` | 兼容 Claude 格式 |
| OpenClaw | `CLAUDE.md` | 兼容 Claude 格式 |

## 安装方式

### Qoder
```bash
# 复制到 Qoder skills 目录
cp -r avue-guide ~/.qoder/skills/
```

### Claude / Trae / OpenClaw
```bash
# 复制 CLAUDE.md 到项目根目录
cp avue-guide/CLAUDE.md ./CLAUDE.md
```

### Cursor
```bash
# 复制 .cursorrules 到项目根目录
cp avue-guide/.cursorrules ./.cursorrules
```

### Windsurf
```bash
# 复制 .windsurfrules 到项目根目录
cp avue-guide/.windsurfrules ./.windsurfrules
```

## 文件说明

```
avue-guide/
├── SKILL.md          # Qoder 专用格式（主文档）
├── CLAUDE.md         # Claude/Trae/OpenClaw 兼容格式
├── .cursorrules      # Cursor 规则文件
├── .windsurfrules    # Windsurf 规则文件
├── examples.md       # 详细使用示例（10个完整案例）
├── reference.md      # 完整配置属性参考
└── README.md         # 本说明文档
```

## 核心规范

### 1. 弹窗必须添加 append-to-body

```vue
<el-dialog :visible.sync="dialogVisible" append-to-body>
  <!-- 弹窗内容 -->
</el-dialog>
```

### 2. 按钮默认使用 small 尺寸

```vue
<el-button type="primary" size="small">确定</el-button>
```

### 3. 使用项目封装组件

- `<override-container>` - 容器组件
- `<override-search>` - 搜索组件
- `<override-empty>` - 空状态组件

## 快速开始

### avue-crud 基础模板

```vue
<template>
  <override-container>
    <avue-crud
      :option="option"
      :data="data"
      :page.sync="page"
      :table-loading="loading"
      v-model="form"
      ref="crud"
      @on-load="onLoad"
      @row-save="rowSave"
      @row-update="rowUpdate"
      @row-del="rowDel"
    >
      <template slot="empty"><override-empty></override-empty></template>
    </avue-crud>
  </override-container>
</template>

<script>
import { getList, add, update, remove } from '@/api/module/name';

export default {
  data() {
    return {
      form: {},
      loading: false,
      data: [],
      page: { pageSize: 10, currentPage: 1, total: 0 },
      option: {
        height: 'auto',
        calcHeight: 70,
        border: true,
        index: true,
        selection: true,
        column: [
          { label: '名称', prop: 'name', search: true }
        ]
      }
    };
  },
  methods: {
    onLoad(page, params = {}) {
      this.loading = true;
      getList(page.currentPage, page.pageSize, params).then(res => {
        this.data = res.data.data.records;
        this.page.total = res.data.data.total;
        this.loading = false;
      });
    },
    rowSave(row, done, loading) {
      add(row).then(() => { this.onLoad(this.page); done(); }).catch(() => loading());
    },
    rowUpdate(row, index, done, loading) {
      update(row).then(() => { this.onLoad(this.page); done(); }).catch(() => loading());
    },
    rowDel(row) {
      this.$confirm('确定删除？').then(() => remove(row.id)).then(() => this.onLoad(this.page));
    }
  }
};
</script>
```

## 参考资源

- Avue 官方文档: https://avuejs.com/
- Element UI 文档: https://element.eleme.io/
- 项目 CRUD mixin: `src/mixins/crud.js`
- 项目示例页面: `src/views/system/user.vue`

## 版本信息

- Avue 版本: 2.8.25
- Element UI 版本: 2.15.14
- Vue 版本: 2.7.10