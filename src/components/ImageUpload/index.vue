<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-upload
        action=""
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :class="{disabled:fileList.length>0}"
        :http-request="onupload"
        :before-upload="onBeforeUpload"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-progress v-if="isUploading" :percentage="percent" style="width:170px"></el-progress>
      <el-dialog title="图片预览" :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </div>
  </div>
</template>

<script>
var COS = require('cos-js-sdk-v5')

// SECRETID 和 SECRETKEY请登录 https://console.cloud.tencent.com/cam/capi 进行查看和管理
var cos = new COS({
  SecretId: 'AKIDlyLdxDHKPOH6pbIu14yoZGoKtPoEXipo', // 密钥
  SecretKey: '0qCRds5LTVcfheYTMdt6LYow1AIQVWX1'
})
export default {
  name: 'ImageUpload',
  components: {},
  props: {},
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [],
      isUploading: false,
      percent: 0
    }
  },
  created() {},
  mounted() {},
  methods: {
    handleRemove(file, fileList) {
      console.log('111', file, fileList)
      const index = this.fileList.findIndex(t => t.uid === file.uid)
      //   console.log('222', this.fileList)
      this.fileList.splice(index, 1)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    onupload({ file }) {
      this.isUploading = true
      console.log(file, 'filessss')
      this.fileList.push({
        url: URL.createObjectURL(file)
      })
      console.log(arguments)
      cos.uploadFile({
        Bucket: 'rzzt-1315288389', /* 填写自己的bucket，必须字段  --- 储存桶的名字 */
        Region: 'ap-nanjing', /* 存储桶所在地域，必须字段 */
        Key: new Date() + file.name, /* 存储在桶里的对象键（例如:1.jpg，a/b/test.txt，图片.jpg）支持中文，必须字段 */
        Body: file, // 上传文件对象
        SliceSize: 1024 * 1024 * 5, /* 触发分块上传的阈值，超过5MB使用分块上传，小于5MB使用简单上传。可自行设置，非必须 */
        onProgress: (progressData) => {
          console.log(JSON.stringify(progressData))
          this.percent = progressData.percent * 100
        }
      }, (err, data) => {
        if (err) {
          console.log('上传失败', err)
        } else {
          console.log('上传成功', data)
          //   this.fileList.push({
          //     url: 'http://' + data.Location
          //   })
          this.fileList[0].url = 'http://' + data.Location
          this.isUploading = false
        }
      })
    },
    onBeforeUpload({ type, size }) {
      if (!['image/png', 'image/jpeg', 'image/gif', 'image/jpg'].includes(type)) {
        this.$message.error('文件格式错误')
        return false
      }
      if (size > 1 * 1024 * 1024) {
        this.$message.error('文件格式过大')
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .disabled .el-upload{
    display: none;
}
</style>
