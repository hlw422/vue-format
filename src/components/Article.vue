<template>

<div class="search-container">
  <a-input-search
      v-model:value="value"
      placeholder="input search text"
      enter-button="Search"
      size="large"
      @search="onSearch"
    />
   
  </div>

  <a-row :gutter="[16, 16]">
    <a-col v-for="(site, index) in websites" :key="index" :span="4">
      <a-card class="site-card" hoverable @click="handleCardClick(site.url)">
        <!-- 调整右上角操作菜单的位置 -->
        <div class="card-actions" @click.stop>
          <a-dropdown :trigger="['click']">
            <span class="more-actions">
              <ellipsis-outlined />
            </span>
            <template #overlay>
              <a-menu @click="handleMenuClick(site)">
                <a-menu-item key="edit">编辑</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>

        <!-- 卡片内容 -->
        <div class="card-content">
          <div class="card-header">
            <a-avatar shape="square" :size="32" :src="getFavicon(site.url)">
              <template #icon><GlobalOutlined /></template>
            </a-avatar>
            <span class="site-name">{{ site.name }}</span>
          </div>

          <div class="site-description">
            {{ site.description }}
          </div>
        </div>
      </a-card>
    </a-col>
  </a-row>

  <!-- 编辑对话框 -->
  <a-modal
    v-model:visible="editModalVisible"
    title="编辑网站信息"
    @ok="handleEditConfirm"
    @cancel="editModalVisible = false"
    okText="保存"
    cancelText="取消"
  >
    <a-form :model="editingSite">
      <a-form-item label="网站名称">
        <a-input v-model:value="computedName" />
      </a-form-item>
      <a-form-item label="网站地址">
        <a-input v-model:value="editingSite.url" />
      </a-form-item>
    </a-form>
    <!-- 自定义底部按钮，添加删除按钮 -->
    <template #footer>
      <div class="custom-modal-footer">
        <a-button danger @click="handleDelete">删除</a-button>
        <div class="footer-right-buttons">
          <a-button @click="editModalVisible = false">取消</a-button>
          <a-button type="primary" @click="handleEditConfirm">保存</a-button>
        </div>
      </div>
    </template>
  </a-modal>
</template>

<script setup>
import { ref, computed,reactive } from "vue";
import { EllipsisOutlined, GlobalOutlined } from "@ant-design/icons-vue";

import { useWebsiteStore } from "@/stores/websiteStorage.ts";
import { initWebsites } from "@/data/initWebsites";
const WebsiteStore = useWebsiteStore();

const websites = WebsiteStore.websites;

const handleDelete = () => {
  WebsiteStore.deleteWebsite(editingSite.value.id);
  editModalVisible.value = false;
};

// 定义计算属性
const computedName = computed({
  // 获取值
  get() {
    return editingSite.value.name === "添加" ? "" : editingSite.value.name;
  },
  // 设置值
  set(newValue) {
    editingSite.value.name = newValue;
  },
});

const editModalVisible = ref(false);
const editingSite = ref({});

const handleCardClick = (url) => {
  // 验证URL格式
  if (/^(https?:)?\/\//i.test(url)) {
    window.open(url, "_blank", "noopener,noreferrer");
  } else {
    console.error("Invalid URL format");
  }
};


const formRef = ref();
const formState = reactive({
  query: '',
});

const handleSubmit = async () => {
  try {
    await formRef.value.validate();
    
    // 构造 Bing 搜索 URL
    const searchUrl = `https://www.bing.com/search?q=${encodeURIComponent(formState.query)}`;
    
    // 在新标签页打开
    window.open(searchUrl, '_blank');
    
    // 清空搜索框（可选）
    formState.query = '';
  } catch (error) {
    console.log('验证失败:', error);
  }
};

// 获取网站图标（示例方法）
const getFavicon = (url) => {
  return `${url}/favicon.ico`;
};

const handleMenuClick = (site) => {
  editingSite.value = { ...site };
  editModalVisible.value = true;
};

const handleEditConfirm = () => {
  if (editingSite.value.id == 0) {
    editingSite.value.id = Date.now();
    editingSite.value.description = editingSite.value.url;
    WebsiteStore.addWebsite(editingSite.value);
  } else {
    WebsiteStore.updateWebsite(editingSite.value);
  }
  editModalVisible.value = false;
};
</script>

<style scoped>
.search-container {
  display: flex;
  align-content: center;
  max-width: 500px;
}

.search-form {
  display: flex;
  gap: 8px;
  width: 100%;
}

.search-input {
  width: 400px;
}

.search-btn {
  display: flex;
  align-items: center;
  gap: 4px;
}


/* 新增样式 */

/*
justify-content: space-between; —— 属性用于在弹性容器的主轴上均匀分布子元素，确保第一个元素位于容器的起始位置，最后一个元素位于容器的结束位置，其余元素则平均分布在它们之间
justify-content: center; —— 所有子元素居中对齐。

justify-content: flex-start; —— 所有子元素从容器的起始位置开始对齐。

justify-content: flex-end; —— 所有子元素从容器的结束位置开始对齐。

justify-content: space-around; —— 子元素之间和容器边缘之间的空间相等。

justify-content: space-evenly; —— 子元素之间的空间相等，包括第一个子元素与容器起始边缘和最后一个子元素与容器结束边缘之间的空间
*/
.custom-modal-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-right-buttons {
  display: flex;
  gap: 8px; /* 按钮间距 */
}
.site-card {
  position: relative;
  height: 160px;
}

.card-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.site-name {
  margin-left: 12px;
  font-weight: 500;
}

.site-description {
  flex: 1;
  color: rgba(0, 0, 0, 0.45);
  font-size: 12px;
  line-height: 1.5;
}
/* 新增卡片操作按钮样式 */
.card-actions {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 1;
}

.more-actions {
  font-size: 18px;
  color: rgba(0, 0, 0, 0.45);
  cursor: pointer;
  padding: 4px;
  display: inline-block;
}

.more-actions:hover {
  color: rgba(0, 0, 0, 0.85);
  background: rgba(0, 0, 0, 0.05);
  border-radius: 50%;
}

/* 调整卡片内容间距 */
.card-content {
  padding-top: 8px;
}
</style>
@/data/websiteData.js
