<script setup>
import { computed, onMounted, ref } from "vue";
import { useMainStore } from "../../store/index";
import axios from "@/util/axios.config";
const store = useMainStore();
const loopList = ref([]);
const avatarUrl = computed(() =>
  store.userInfo.avatar
    ? "http://localhost:3000" + store.userInfo.avatar
    : `https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png`
);

const welcomeText = computed(() =>
  new Date().getHours() < 12 ? "要开心每一天" : "喝杯咖啡提提神吧"
);

onMounted(() => {
  getTableData();
});

const getTableData = async () => {
  const res = await axios.get(`/adminapi/product/list`);
  loopList.value = res.data.data;
};
</script>

<template>
  <div>
    <el-page-header content="首页" icon="" title="企业门户网站管理系统">
    </el-page-header>
    <el-card class="box-card">
      <el-row>
        <el-col :span="4">
          <el-avatar :size="100" :src="avatarUrl" />
        </el-col>
        <el-col :span="20"
          ><h3 style="line-height: 60px">
            欢迎{{ store.userInfo.username }}回来,{{ welcomeText }}
          </h3></el-col
        >
      </el-row>
    </el-card>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>公司产品</span>
        </div>
      </template>
      <el-carousel
        :interval="4000"
        type="card"
        height="200px"
        v-if="loopList.length"
      >
        <el-carousel-item v-for="item in loopList" :key="item._id">
          <div
            :style="{
              backgroundImage: `url(http://localhost:3000${item.cover})`,
              backgroundSize: 'cover',
            }"
          >
            <h3 text="2xl" justify="center">{{ item.title }}</h3>
          </div>
        </el-carousel-item>
      </el-carousel>
    </el-card>
  </div>
</template>

<style scoped>
.box-card {
  margin-top: 50px;
}

.el-carousel__item h3 {
  color: #fff;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
