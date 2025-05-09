<template>
  <div class="recording-container">
    <h3 class="title">请朗读：长师校园帮</h3>

    <div class="controls">
      <el-button type="primary" @click="toggleRecording" class="control-button">
        {{ isRecording ? '录音完成' : '开始录音' }}
      </el-button>
    </div>
  </div>
</template>

<script>
import Recorder from 'js-audio-recorder';
import axios from 'axios';
export default {
  data() {
    return {
      recorder: null,
      isRecording: false, // 用于控制录音状态
    };
  },
  created() {
    this.recorder = new Recorder();
  },
  methods: {
    // 切换录音状态
    toggleRecording() {
      if (this.isRecording) {
        // 停止录音
        this.recorder.stop();
        this.isRecording = false;
        console.log('录音完成');
        this.uploadAndDestroyRecord(); // 停止录音后自动上传并销毁
      } else {
        // 开始录音
        this.recorder = new Recorder();
        Recorder.getPermission().then(() => {
          this.recorder.start();
          this.isRecording = true;
          console.log('开始录音');
        }).catch((error) => {
          this.$message({
            message: '请先允许该网页使用麦克风',
            type: 'info',
          });
          console.error(`${error.name} : ${error.message}`);
        });
      }
    },
    uploadAndDestroyRecord() {
      if (this.recorder == null || this.recorder.duration === 0) {
        this.$message({
          message: '录音时长为 0，无法上传',
          type: 'error',
        });
        return;
      }
      console.log('上传录音');

      const formData = new FormData();
      const blob = this.recorder.getWAVBlob();
      const fileOfBlob = new File([blob], `${new Date().getTime()}.mp3`, { type: 'audio/mp3' });
      formData.append('file', fileOfBlob);

      const uploadUrl = 'http://localhost:8888/csxyb_server_war/AudioUploadApiServlet'; 
      axios.post(uploadUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((res) => {
        console.log('上传成功:', res.data);
        this.$message({
          message: '上传成功',
          type: 'success',
        });
        this.handleDestroy(); 
      }).catch((error) => {
        console.error('上传失败:', error);
        this.$message({
          message: '上传失败',
          type: 'error',
        });
      });
    },
    handleDestroy() {
      console.log('销毁实例');
      if (this.recorder) {
        this.recorder.destroy();
        this.recorder = null;
      }
      this.isRecording = false;
    },
  },
};
</script>

<style scoped>
.recording-container {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

.controls {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.control-button {
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  border: none;
  outline: none;
  color: white;
  background-color: #409eff; /* Element UI 主色调 */
}

.control-button:hover {
  opacity: 0.8;
}

.control-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* 根据按钮类型调整颜色 */
.control-button[type="primary"] {
  background-color: #409eff;
}

.control-button[type="error"] {
  background-color: #f56c6c;
}
</style>