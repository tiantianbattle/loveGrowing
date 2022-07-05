<template>
  <div class="stu_info">
    <div class="main">
      <side-nav :currTab="1" />
      <div class="right">
        <div class="title_wrap">
          <div class="title">
            学生信息
            <span class="sub_title">Student Infomation</span>
          </div>
          <status-bar />
        </div>
        <div class="select_wrap">
          <el-select v-model="gradeId" placeholder="请选择年级">
            <el-option
              v-for="item in grades"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-select v-model="classId" placeholder="请选择班级">
            <el-option
              v-for="item in classes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-input placeholder="搜索" v-model="search_text" clearable>
          </el-input>
        </div>
        <div class="list_wrap" v-if="this.stuList.length">
          <div class="stu" v-for="stu in dataMap" :key="stu.no">
            <img src="../assets/boy.png" v-if="stu.sex == '男'" />
            <img src="../assets/girl.png" v-if="stu.sex == '女'" />
            <div class="info_wrap">
              <div class="name">
                {{ stu.name }} | {{ stu.no }}
                <img
                  src="../assets/男.png"
                  v-if="stu.sex == '男'"
                />
                <img
                  src="../assets/女.png"
                  v-if="stu.sex == '女'"
                />
              </div>
              <div>{{ stu.grade }} {{ stu.classes }}</div>
            </div>
            <div class="btn_wrap">
              <div class="btn" @click="openDialog(stu.no)">详细信息</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      id="stu_info_detail"
      title="详细信息"
      :visible.sync="detailDialogVisible"
    >
      <div class="detail_wrap" v-if="this.stuList.length">
        <div class="avator">
          <img
            src="../assets/boy.png"
            v-if="dataMap[currStuIndex].sex == '男'"
          />
          <img
            src="../assets/girl.png"
            v-if="dataMap[currStuIndex].sex == '女'"
          />
        </div>
        <div class="name_wrap">
          {{ dataMap[currStuIndex].name }}
          <img
            src="../assets/男.png"
            v-if="dataMap[currStuIndex].sex == '男'"
          />
          <img
            src="../assets/女.png"
            v-if="dataMap[currStuIndex].sex == '女'"
          />
        </div>
        <div class="info_wrap">
          <div class="info_item">
            <div class="title">学号：</div>
            <div class="content">{{ dataMap[currStuIndex].no }}</div>
          </div>
          <div class="info_item">
            <div class="title">年级：</div>
            <input class="input" v-if="isEdit" v-model="tempStu.grade">
            <div class="content" v-else>{{ dataMap[currStuIndex].grade }}</div>
          </div>
          <div class="info_item">
            <div class="title">班级：</div>
            <input class="input" v-if="isEdit" v-model="tempStu.classes" />
            <div class="content" v-else>{{ dataMap[currStuIndex].classes }}</div>
          </div>
          <div class="info_item">
            <div class="title">民族：</div>
            <input class="input" v-if="isEdit" v-model="tempStu.national" />
            <div class="content" v-else>{{ dataMap[currStuIndex].national }}</div>
          </div>
          <div class="info_item">
            <div class="title">籍贯：</div>
            <input class="input" v-if="isEdit" v-model="tempStu.naticePlace" />
            <div class="content" v-else>{{ dataMap[currStuIndex].naticePlace }}</div>
          </div>
          <div class="info_item">
            <div class="title">身份证:</div>
            <input class="input" v-if="isEdit" v-model="tempStu.idCard" />
            <div class="content" v-else>{{ dataMap[currStuIndex].idCard }}</div>
          </div>
          <div class="info_item">
            <div class="title">出生日期：</div>
            <input class="input" v-if="isEdit" v-model="tempStu.birth" />
            <div class="content" v-else>{{ new Date(dataMap[currStuIndex].birth).toLocaleDateString() }}</div>
          </div>
          <div class="info_item">
            <div class="title">入学日期：</div>
            <input class="input" v-if="isEdit" v-model="tempStu.inDate" />
            <div class="content" v-else>{{ new Date(dataMap[currStuIndex].inDate).toLocaleDateString() }}</div>
          </div>
          <div class="info_item">
            <div class="title">家庭住址：</div>
            <input class="input" v-if="isEdit" v-model="tempStu.address" />
            <div class="content" v-else>{{ dataMap[currStuIndex].address }}</div>
          </div>
          <div class="info_item">
            <div class="title">联系电话：</div>
            <input class="input" v-if="isEdit" v-model="tempStu.phone" />
            <div class="content" v-else>{{ dataMap[currStuIndex].phone }}</div>
          </div>
          <div class="info_item">
            <div class="title">家长姓名：</div>
            <input class="input" v-if="isEdit" v-model="tempStu.parents.name" />
            <div class="content" v-else>{{ dataMap[currStuIndex].parents.name }}</div>
          </div>
          <div class="info_item">
            <div class="title">家长电话：</div>
            <input class="input" v-if="isEdit" v-model="tempStu.parents.phone" />
            <div class="content" v-else>{{ dataMap[currStuIndex].parents.phone }}</div>
          </div>
        </div>
        <div class="btn_wrap">
          <div v-if="!isEdit" class="btn" @click="edit">
            <svg
              xmlns:xlink="http://www.w3.org/1999/xlink"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              width="63px"
              height="50px"
            >
              <g transform="matrix(1 0 0 1 -7 -2 )">
                <path
                  d="M 29.3811659192825 37.5  L 31.3587443946188 37.5  L 35.4551569506726 33.3806818181818  L 30.0874439461883 27.9829545454545  L 25.9910313901345 32.1022727272727  L 25.9910313901345 34.0909090909091  L 29.3811659192825 34.0909090909091  L 29.3811659192825 37.5  Z M 46.8615470852018 13.1036931818182  C 47.2617713004484 12.7012310606061  47.2735426008969 12.3106060606061  46.8968609865471 11.9318181818182  C 46.5201793721973 11.5530303030303  46.1317264573991 11.5648674242424  45.7315022421525 11.9673295454545  L 33.3716367713005 24.3963068181818  C 32.9714125560538 24.7987689393939  32.9596412556054 25.1893939393939  33.3363228699552 25.5681818181818  C 33.7130044843049 25.9469696969697  34.1014573991031 25.9351325757576  34.5016816143498 25.5326704545455  L 46.8615470852018 13.1036931818182  Z M 49.0156950672646 31.9957386363636  C 49.4865470852018 32.1851325757576  49.7219730941704 32.5284090909091  49.7219730941704 33.0255681818182  L 49.7219730941704 39.7727272727273  C 49.7219730941704 42.5899621212121  48.727298206278 44.9988162878788  46.7379484304933 46.9992897727273  C 44.7485986547085 48.9997632575758  42.3531390134529 50  39.5515695067265 50  L 10.1704035874439 50  C 7.36883408071749 50  4.97337443946188 48.9997632575758  2.98402466367713 46.9992897727273  C 0.994674887892377 44.9988162878788  0 42.5899621212121  0 39.7727272727273  L 0 10.2272727272727  C 0 7.41003787878787  0.994674887892377 5.00118371212121  2.98402466367713 3.00071022727273  C 4.97337443946188 1.00023674242424  7.36883408071749 0  10.1704035874439 0  L 39.5515695067265 0  C 41.0347533632287 0  42.4119955156951 0.295928030303028  43.6832959641256 0.887784090909088  C 44.0364349775785 1.05350378787878  44.2483183856502 1.32575757575757  44.3189461883408 1.70454545454545  C 44.3895739910314 2.10700757575757  44.2836322869955 2.45028409090909  44.0011210762332 2.734375  L 42.2707399103139 4.47443181818182  C 41.9411434977578 4.80587121212121  41.5644618834081 4.90056818181818  41.1406950672646 4.75852272727273  C 40.5992152466368 4.61647727272727  40.0695067264574 4.54545454545455  39.5515695067265 5  L 10.1704035874439 5  C 8.61659192825112 4.54545454545455  7.28643497757848 5.10179924242424  6.17993273542601 6.21448863636363  C 5.07343049327354 7.32717803030303  4.52017937219731 8.66477272727273  5 10.2272727272727  L 5 39.7727272727273  C 4.52017937219731 41.3352272727273  5.07343049327354 42.672821969697  6.17993273542601 43.7855113636364  C 7.28643497757848 44.8982007575758  8.61659192825112 45.4545454545455  10.1704035874439 45  L 39.5515695067265 45  C 41.1053811659193 45.4545454545455  42.4355381165919 44.8982007575758  43.5420403587444 43.7855113636364  C 44.6485426008969 42.672821969697  45.2017937219731 41.3352272727273  45.2017937219731 39.7727272727273  L 45.2017937219731 35.2982954545455  C 45.2017937219731 34.9905303030303  45.307735426009 34.7301136363636  45.5196188340807 34.5170454545455  L 47.7797085201794 32.2443181818182  C 48.1328475336323 31.8892045454545  48.5448430493274 31.8063446969697  49.0156950672646 31.9957386363636  Z M 23 30.6818181818182  L 46.3318385650224 6.81818181818182  L 56.5022421524664 17.0454545454545  L 32.7713004484305 41  L 23 41  L 23 30.6818181818182  Z M 63 9.09090909090909  C 63 10.0378787878788  62.6704035874439 10.842803030303  62.0112107623318 11.5056818181818  L 58.762331838565 14.7727272727273  L 48.5919282511211 4.54545454545455  L 51.8408071748879 1.27840909090909  C 52.5 0.615530303030298  53.3004484304933 0.284090909090912  54.2421524663677 0.284090909090912  C 55.1838565022422 0.284090909090912  55.9843049327354 0.615530303030298  56.6434977578475 1.27840909090909  L 62.0112107623318 6.67613636363637  C 62.6704035874439 7.33901515151514  63 8.14393939393939  63 9.09090909090909  Z "
                  fill-rule="nonzero"
                  fill="#1b51f9"
                  stroke="none"
                  transform="matrix(1 0 0 1 7 2 )"
                />
              </g>
            </svg>
            <div class="text edit">编辑</div>
          </div>
          <div v-else class="btn" @click="save">
            <img src="../assets/save.png" />保存
          </div>
          <div v-if="!isEdit" class="btn">
            <svg
              xmlns:xlink="http://www.w3.org/1999/xlink"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              width="50px"
              height="50px"
            >
              <g transform="matrix(1 0 0 1 -958 -777 )">
                <path
                  d="M 10.4814137720902 42.2702373706634  C 10.8673573024579 41.8847636437411  11.0603290676417 41.4282815987016  11.0603290676417 40.9007912355447  C 11.0603290676417 40.3733008723879  10.8673573024579 39.9168188273484  10.4814137720902 39.5313451004261  C 10.0954702417225 39.1458713735038  9.63843185049767 38.9531345100426  9.1102985984156 38.9531345100426  C 8.58216534633354 38.9531345100426  8.12512695510867 39.1458713735038  7.73918342474101 39.5313451004261  C 7.35323989437335 39.9168188273484  7.16026812918952 40.3733008723879  7.16026812918952 40.9007912355447  C 7.16026812918952 41.4282815987016  7.35323989437335 41.8847636437411  7.73918342474101 42.2702373706634  C 8.12512695510867 42.6557110975857  8.58216534633354 42.8484479610469  9.1102985984156 42.8484479610469  C 9.63843185049767 42.8484479610469  10.0954702417225 42.6557110975857  10.4814137720902 42.2702373706634  Z M 25.3960999390615 24.6348143639683  C 26.9297176518383 26.1665652262122  28.6918545602275 27.3280584297018  30.6825106642291 28.119293974437  L 9.9024984765387 48.8740109555691  C 9.15092423319114 49.624670318523  8.23684745074142 50  7.16026812918952 50  C 6.10400162502539 50  5.17976843388178 49.624670318523  4.38756855575868 48.8740109555691  L 1.15783059110299 45.5873402312842  C 0.385943530367662 44.8569689592209  0 43.9440048691418  0 42.8484479610469  C 0 41.7731791438426  0.385943530367662 40.8500710083181  1.15783059110299 40.0791235544735  L 21.9073735527118 19.3548387096774  C 22.6995734308349 21.3430716169608  23.8624822262848 23.1030635017245  25.3960999390615 24.6348143639683  Z M 49.7410115783059 14.1205112598904  C 49.913670526102 14.3233921687969  50 14.57699330493  50 14.8813146682897  C 50 15.672550213025  49.7664026000406 16.7478190302293  49.2992078001219 18.1071211199026  C 48.3445053828966 20.8257252992493  46.6737761527524 23.0320551836072  44.2870201096892 24.7261107729763  C 41.900264066626 26.4201663623453  39.2748324192565 27.2671941570298  36.4107251675807 27.2671941570298  C 32.652853950843 27.2671941570298  29.4383505992281 25.9332521809698  26.7672151127361 23.2653682288497  C 24.0960796262442 20.5974842767296  22.7605118829982 17.3868938932846  22.7605118829982 13.6335970785149  C 22.7605118829982 9.88030026374518  24.0960796262442 6.66970988030026  26.7672151127361 4.00182592818016  C 29.4383505992281 1.33394197606005  32.652853950843 0  36.4107251675807 0  C 37.5888685760715 0  38.8228722323786 0.167376749847842  40.1127361365021 0.50213024954352  C 41.4026000406256 0.836883749239198  42.4944139752184 1.30858186244674  43.3881779402803 1.91722458916616  C 43.7131830184847 2.14039358896327  43.8756855575868 2.42442686143233  43.8756855575868 2.76932440657334  C 43.8756855575868 3.11422195171434  43.7131830184847 3.3982552241834  43.3881779402803 3.62142422398052  L 34.4606946983547 8.76445526475958  L 34.4606946983547 15.581253804017  L 40.3412553321146 18.8374923919659  C 40.4428194190534 18.776628119294  41.2451757058704 18.2846419151958  42.7483241925655 17.3615337796713  C 44.2514726792606 16.4384256441469  45.6276660572821 15.6167579630757  46.8769043266301 14.8965307364577  C 48.1261425959781 14.1763035098397  48.842169408897 13.8161898965307  49.024984765387 13.8161898965307  C 49.3296770262035 13.8161898965307  49.5683526305099 13.917630350984  49.7410115783059 14.1205112598904  Z "
                  fill-rule="nonzero"
                  fill="#f59a23"
                  stroke="none"
                  transform="matrix(1 0 0 1 958 777 )"
                />
              </g>
            </svg>
            <div class="text reset">重置密码</div>
          </div>
          <div v-else class="btn" @click="cancle">
            <img src="../assets/cancle.png" />取消
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import SideNav from "../components/SideNav.vue";
import StatusBar from "../components/StatusBar.vue";
import { get, put } from '../utils/request'

export default {
  name: "StuInfo",
  components: {
    SideNav,
    StatusBar,
  },
  beforeMount() {
    this.getData();
  },
  data() {
    return {
      grades: [
        {
          value: 1,
          label: "一年级",
        },
        {
          value: 2,
          label: "二年级",
        },
        {
          value: 3,
          label: "三年级",
        },
        {
          value: 4,
          label: "四年级",
        },
        {
          value: 5,
          label: "五年级",
        },
        {
          value: 6,
          label: "六年级",
        },
      ],
      classes: [
        {
          value: 1,
          label: "一班",
        },
        {
          value: 2,
          label: "二班",
        },
        {
          value: 3,
          label: "三班",
        },
        {
          value: 4,
          label: "四班",
        },
      ],
      stuList: [],
      gradeId: 1,
      classId: 1,
      search_text: "",
      detailDialogVisible: false,
      currStuIndex: 0,
      isEdit: false,
      tempStu: {}
    };
  },
  methods: {
    openDialog(no) {
      this.currStuIndex = this.stuList.findIndex((stu) => stu.no == no);
      this.detailDialogVisible = true;
    },
    edit() {
      this.isEdit = true
      this.tempStu = Object.assign(this.stuList[this.currStuIndex])
    },
    cancle() {
      this.isEdit = false
      this.detailDialogVisible = false
    },
    save() {
      // let list = [...this.stuList]
      // list.forEach((item, index) => {
      //   if (index == this.currStuIndex) {
      //     item = Object.assign(this.tempStu)
      //   }
      // })

      console.log(this.tempStu)
      put({
        url: '/stus',
        data: this.tempStu
      })
      this.getData()
      this.isEdit = false
    },
    async getData() {
      const res = await get('/stus')
      this.stuList = res.data
    },
    async updateData(body) {
      console.log(body)
      await put({
        url: '/stus',
        body
      })
    }
  },
  computed: {
    dataMap() {
      let gradeMap = [null, '一年级', '二年级', '三年级', '四年级', '五年级', '六年级']
      let classMap = [null,  '一班', '二班', '三班', '四班', '五班', '六班']
      return this.stuList.map(stu => {
        stu.grade = gradeMap[stu.grade]
        stu.classes = classMap[stu.classes]
        stu.no = (stu.no + '').length == 1 ? '0' + stu.no : stu.no
        return stu
      })
    }
  }
};
</script>

<style lang="less" scoped>
body {
  .stu_info {
    .main {
      display: flex;
      justify-content: center;
      width: 100%;
      margin: 30px auto 0;
      .right {
        flex: 1;
        max-width: 1500px;
        margin-left: 40px;
        .title_wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          .title {
            flex: 1;
            padding-top: 20px;
            color: #7a7a7a;
            font-size: 40px;
            .sub_title {
              font-size: 24px;
            }
          }
        }
        .select_wrap {
          display: flex;
          margin-top: 20px;
          div {
            margin-right: 30px;
            width: 200px;
          }
        }
        .list_wrap {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          .stu {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin: 20px;
            padding: 20px 50px;
            border-radius: 20px;
            background-color: #fff;
            img {
              overflow: hidden;
            }
            .name {
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 20px 0;
              img {
                margin-left: 10px;
                width: 20px;
                height: 20px;
              }
            }
            .btn_wrap {
              display: flex;
              align-items: center;
              justify-content: center;
              margin-top: 20px;
              .btn {
                padding: 10px 20px;
                color: #fff;
                background-color: rgba(25, 156, 213, 1);
                border-radius: 20px;
              }
            }
          }
        }
      }
    }
    .detail_wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .name_wrap {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 20px 0;
        font-size: 24px;
        font-weight: 700;
        color: #333;
        img {
          width: 30px;
          height: 30px;
          margin-left: 10px;
        }
      }
      .info_wrap {
        font-size: 18px;
        .info_item {
          display: flex;
          align-items: center;
          margin: 10px 0;
          .title {
            width: 100px;
          }
          .content {
            flex: 1;
            text-align: right;
          }
          .input {
            width: 300px;
            height: 25px;
            border-radius: 5px;
            border: 1px solid #666;
            padding: 5px;
          }
        }
      }
      .btn_wrap {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
        .btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin: 0 40px;
          font-size: 18px;
          .text {
            margin-top: 10px;
          }
          .edit {
            color: #2953f0;
          }
          .reset {
            color: #e89d42;
          }
          img {
            width: 50px;
            height: 50px;
          }
        }
      }
    }
  }
}
</style>
