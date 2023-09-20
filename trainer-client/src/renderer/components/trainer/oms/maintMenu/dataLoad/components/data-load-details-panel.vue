<template>
  <div class="detailsPanel">
    <oms-window :header="detailsHeader" size="full" windowPropName="detailsPanel">
      <div slot="windowContent">
        <table class="dataLoadDetails">
          <thead>
            <th>{{headerLeft}}</th>
            <th>{{headerRight}}</th>
          </thead>
          <tbody>
            <tr v-if="selectedDetails.length" v-for="(item, index) in selectedDetails" :key="index" class="uppercase">
              <td valign="top">{{item.itemName}}</td>
              <td><span class="wrap" v-for="(s, index) in item.data" :key="index">{{s}}</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </oms-window>
  </div>
</template>
<script>
import omsWindow from '@/components/trainer/oms/shared/oms-window'
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      detailsHeader: state => state.appContext.omsViewPort.detailsHeader,
      headerLeft: state => state.appContext.omsViewPort.headerLeft,
      headerRight: state => state.appContext.omsViewPort.headerRight,
      selectedDetails: state => state.appContext.omsViewPort.selectedDetails
    })
  },
  components: {
    omsWindow
  }
}
</script>


