<template>
  <div class="file_container">
    <el-button type="primary" @click="uploadDialog = true">上传</el-button>
    <el-table :data="tableData" style="width: 100%">
      <template #empty>
        <el-empty description="暂无数据">
          <el-button type="primary" @click="uploadDialog = true">上传</el-button>
        </el-empty>
      </template>
      <el-table-column prop="name" label="名称">
        <template #default="{ row }">
          <el-link type="primary" target="_blank" :href="row.path">{{row.name}}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="modify_date" label="修改日期" />
      <el-table-column prop="type" label="类型" />
      <el-table-column prop="size" label="大小" />
    </el-table>

    <el-dialog v-model="uploadDialog" title="上传附件" width="500px" top="5vh" draggable :close-on-click-modal="false"
      @close="cancelUpload()">
      <el-upload ref="uploadRef" drag action="" multiple :auto-upload="false" :http-request="uploadSubmit">
        <el-icon class="el-icon--upload">
          <upload-filled />
        </el-icon>
        <div class="el-upload__text">
          拖拽文件到此处或 <em>点击上传</em>
        </div>
      </el-upload>
      <template #footer>
        <el-button @click="cancelUpload()">取消</el-button>
        <el-button type="primary" @click="confirmUpload()">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { upload, getFiles } from '@/api/upload'
import router from '@/router'
const { ctx, proxy } = getCurrentInstance()
// 查询条件
let params = reactive({
  pageNum: 1,
  pageSize: 15,
  category: 'all'
})
// 展示数据
let tableData = ref()

// 文件列表
async function getData () {
  const res = await getFiles()
  tableData.value = res.data.map(item => {
    item.size = proxy.$utils.formatFileSize(item.Size)
    item.modify_date = proxy.$utils.formatDateTime(item.LastModified)
    if (proxy.$utils.isDocument(item.name)) {
      item.type = '文档'
    } else if (proxy.$utils.isPicture(item.name)) {
      item.type = '图片'
    } else if (proxy.$utils.isAudio(item.name)) {
      item.type = '音频'
    } else if (proxy.$utils.isVideo(item.name)) {
      item.type = '视频'
    } else {
      item.type = '其他'
    }
    return item
  })
}
getData()

/**
 * 附件上传
 */
let uploadRef = ref()
let uploadDialog = ref(false)
function cancelUpload () {
  ctx.$refs['uploadRef'].clearFiles()
  uploadDialog.value = false
}
function confirmUpload () {
  uploadRef.value.submit()
}

async function uploadSubmit (params) {
  const { file } = params
  const formData = new FormData()
  formData.append("file", file)
  formData.append("folder", 'test123')

  const res = await upload(formData)
  if (res.msg) ElMessage.success(res.msg)
  cancelUpload()
}

/**
 * 监听路由地址变化
 */
watch(() => router.currentRoute.value.path, (newValue, oldValue) => {
  if (!RegExp(/file/).test(newValue)) return
  params.category = router.currentRoute.value.params.category
  getData()
})
</script>

<style lang="scss" scoped>
.file_container {
  padding: 0 20px;
}
</style>