<template>
  <div>
    <img
      v-if="avatar || newAvatar"
      :src="newAvatar ? newAvatar : avatar"
      @click="openModal"
    />

    <CButton v-else color="primary" @click="openModal">Add Avatar</CButton>

    <CModal
      :visible="isModalOpen"
      @close="
        () => {
          isModalOpen = false
        }
      "
      size="lg"
    >
      <CModalHeader>
        <h2>Avatar</h2>
      </CModalHeader>
      <CModalBody>
        <CRow class="d-flex justify-content-between align-items-center">
          <CCol xs="12" md="6" v-for="avatar in avatars" :key="avatar">
            <img :src="avatar" @click="updateAvatar(avatar)" />
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter>
        <CButton color="danger" @click="() => {
          isModalOpen = false
        }">Cerrar</CButton>
      </CModalFooter>
    </CModal>

    <div v-if="isModalOpen"></div>
  </div>
</template>

<script>
export default {
  emits: ['avatar-updated'],
  name: 'Avatar',

  props: {
    avatar: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      newAvatar: '',
      isModalOpen: false,
     // avatarPrefix: require(`@/assets/images/avatars/${this.avatarName}`),
      avatars: [
        require('@/assets/images/avatars/1.jpg'),
        require('@/assets/images/avatars/2.jpg'),
        require('@/assets/images/avatars/3.jpg'),
        require('@/assets/images/avatars/4.jpg'),
        require('@/assets/images/avatars/5.jpg'),
        require('@/assets/images/avatars/6.jpg'),
        require('@/assets/images/avatars/7.jpg'),
        require('@/assets/images/avatars/8.jpg'),
        require('@/assets/images/avatars/9.jpg'),
        require('@/assets/images/avatars/10.jpg'),
        require('@/assets/images/avatars/11.jpg'),
        require('@/assets/images/avatars/12.jpg'),
        require('@/assets/images/avatars/13.jpg'),
        require('@/assets/images/avatars/14.jpg'),
      ],
    }
  },
  mounted() {},

  methods: {
    openModal() {
      this.isModalOpen = true
    },
    updateAvatar(avatar) {
      debugger
     // const filename = avatar.substring(avatar.lastIndexOf('/') + 1)
    
      // const nameWithoutExtension = filename.substring(
      //   0,
      //   filename.lastIndexOf('.'),
      // )
      //const extension = filename.substring(filename.lastIndexOf('.'))
      //const fileName = nameWithoutExtension.split('.')[0]

      this.newAvatar = avatar;
      this.isModalOpen = false;
      this.$emit('avatar-updated', this.newAvatar)
    },
  },
}
</script>
