<script setup>
import newsbg from "../assets/newsbg.jpg";
import { Search } from "@element-plus/icons-vue";
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import moment from "moment";
import _ from "lodash";

moment.locale("zh-cn");
const searchText = ref("");
const visible = ref(false);
const newlist = ref([]);
const whichTab = ref(1);

onMounted(async () => {
  const res = await axios.get("/webapi/news/list");
  newlist.value = res.data.data;
});

const searchnewslist = computed(() =>
  searchText.value
    ? newlist.value.filter((item) => item.title.includes(searchText.value))
    : []
);

const topNewsList = computed(() => newlist.value.slice(0, 4));

const whichTime = (time) => {
  return moment(time).format("YYYY年MM月DD日 HH:mm");
};

const tablist = [
  {
    label: "最新动态",
    name: 1,
  },
  {
    label: "典型案例",
    name: 2,
  },
  {
    label: "通知公告",
    name: 3,
  },
];

const tabnews = computed(() =>
  _.groupBy(newlist.value, (item) => item.category)
);
const router = useRouter();
const handleChangepage = (id) => {
  router.push(`/news/${id}`);
};
</script>

<template>
  <div class="container">
    <div
      class="news-header"
      :style="{ backgroundImage: `url(${newsbg})` }"
    ></div>
    <div class="center">
      <h3>新闻资讯</h3>
      <p>为您推荐公司及行业的前沿资讯，让您随时了解行业动态!</p>
    </div>
    <div class="search">
      <el-popover
        placement="bottom"
        title="查询结果"
        width="50%"
        :visible="visible"
      >
        <template #reference>
          <el-input
            v-model="searchText"
            placeholder="请输入新闻关键字"
            :prefix-icon="Search"
            type="search"
            size="large"
            @input="visible = true"
            @blur="visible = false"
          ></el-input>
        </template>
        <div v-if="searchnewslist.length">
          <div
            v-for="data in searchnewslist"
            :key="data._id"
            class="search-item"
            @click="handleChangepage(data._id)"
          >
            {{ data.title }}
          </div>
        </div>
        <div v-else>
          <el-empty
            description="暂无新闻"
            :image-size="50"
            class="search-item"
          />
        </div>
      </el-popover>
    </div>
    <div class="topnews">
      <el-row :gutter="20">
        <el-col :span="6" v-for="item in topNewsList" :key="item._id">
          <el-card
            :body-style="{ padding: '0px' }"
            shadow="hover"
            @click="handleChangepage(item._id)"
          >
            <div
              class="image"
              :style="{
                backgroundImage: `url(http://localhost:3000${item.cover})`,
              }"
            ></div>
            <div style="padding: 14px">
              <span>{{ item.title }}</span>
              <div class="bottom">
                <time class="time">{{ whichTime(item.editTime) }}</time>
                <el-button text></el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <el-tabs v-model="whichTab" class="demo-tabs" style="margin: 20px">
      <el-tab-pane
        v-for="item in tablist"
        :label="item.label"
        :name="item.name"
        :key="item.name"
      >
        <el-row :gutter="20">
          <el-col :span="18">
            <div
              v-for="data in tabnews[item.name]"
              :key="data._id"
              style="padding: 10px"
            >
              <el-card
                :body-style="{ padding: '0px' }"
                shadow="hover"
                @click="handleChangepage(data._id)"
              >
                <div
                  class="tab-image"
                  :style="{
                    backgroundImage: `url(http://localhost:3000${data.cover})`,
                  }"
                ></div>
                <div style="padding: 14px; float: left">
                  <span>{{ data.title }}</span>
                  <div class="bottom">
                    <time class="tab-time">{{ whichTime(data.editTime) }}</time>
                    <el-button text></el-button>
                  </div>
                </div>
              </el-card>
            </div>
          </el-col>
          <el-col :span="6">
            <el-timeline style="max-width: 600px; margin-top: 20px">
              <el-timeline-item
                v-for="(data, index) in tabnews[item.name]"
                :key="index"
                :timestamp="whichTime(data.editTime)"
              >
                {{ data.title }}
              </el-timeline-item>
            </el-timeline>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <el-backtop :right="100" :bottom="100" />
  </div>
</template>

<style scoped>
.container {
  position: relative;
}

.news-header {
  width: 100%;
  height: 400px;
  background-size: cover;
}

.search {
  position: absolute;
  top: 300px;
  width: 100%;
  text-align: center;
}

.el-input {
  width: 35%;
}

.center {
  position: absolute;
  left: 50%;
  top: 15%;
  width: 100%;
  transform: translate(-50%, -50%);
  height: 100px;
  /* line-height: 100px; */
  font-size: 30px;
  color: #fff;
  text-align: center;
}

.search-item {
  height: 50%;
  line-height: 50px;
  padding: 0 10px;
  cursor: pointer;
}

.search-item:hover {
  background: whitesmoke;
  color: red;
}

.topnews {
  margin: 20px;
}

.image {
  width: 100%;
  height: 150px;
  background-size: cover;
}

.time,
.tab-time {
  font-size: 13px;
  color: gray;
}

.tab-image {
  width: 150px;
  height: 100px;
  background-size: cover;
  float: left;
}
</style>
