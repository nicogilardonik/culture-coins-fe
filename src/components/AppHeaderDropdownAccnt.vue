<template>
  <CDropdown variant="nav-item">
    <CDropdownToggle placement="bottom-end" class="py-0" :caret="false" @click.prevent>
      <CAvatar size="md" class="avatar-text" >{{avatarText}}</CAvatar>
    </CDropdownToggle>
    <CDropdownMenu class="pt-0">
      <CDropdownHeader component="h6" class="bg-light fw-semibold py-2">
        User
      </CDropdownHeader>
      <CDropdownItem>
        <strong>{{ userName }}</strong>
      </CDropdownItem>
    </CDropdownMenu>
  </CDropdown>
</template>

<script>
export default {
  name: 'AppHeaderDropdownAccnt',
  setup() {
    return {
      avatarImg: null, //avatar
      //avatarText: 'XX',
      itemsCount: 42,
    }
  },
  methods: {
    getFirstChar(text) {
      return (text && text.length > 0) ? text[0] : '';
    }
  },
  computed: {

    userName() {
      let userProfile = this.$store.state.userProfile;
      return userProfile ? userProfile.firstName + ' ' + userProfile.lastName : '';
    },
    avatarText() {
      let avText = '##';
      let userProfile = this.$store.state.userProfile;

      if (userProfile) {
        if (userProfile.firstName) {
          avText = this.getFirstChar(userProfile.firstName) + this.getFirstChar(userProfile.lastName);
        }
        else if (!avText && userProfile.id && userProfile.id.length >= 2) {
          //Si no tiene ni nombre ni apellido, le pongo los últimos 2 caracteres del ID
          avText = userProfile.id.substring(userProfile.id.length - 2);
        }

      }
      return avText;
    }
  }
}
</script>

<style>

.avatar-text {
  background-color: #027380;
  font-weight: 600;
}

</style>