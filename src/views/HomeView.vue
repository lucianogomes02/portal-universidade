<template>
  <NavigationMenu :user="user" />
  <main class="main-container">
    <h3>Qual portal você deseja acessar?</h3>
    <div class="models-container">
      <div class="card-buttons" v-for="(permissionValue, permissionName) in userPermissions" :key="permissionName">
        <router-link v-if="permissionValue" :to="defineModelPathByPermissionName(permissionName)" :modelName="getModelName(permissionName)">
          <CardButton :modelName="getModelName(permissionName)" />
        </router-link>
      </div>
    </div>
  </main>
</template>

<script lang="js">
import {mapGetters} from "vuex";
import NavigationMenu from "@/components/NavigationMenu.vue";
import CardButton from "@/components/CardButton.vue";

export default {
  name: "HomeView",
  components: {CardButton, NavigationMenu},
  computed: {
    ...mapGetters(["user"]),
  },
  data () {
    return {
      userPermissions: {
        canViewStudent: false,
        canViewProfessor: false,
        canViewCoordinator: false,
        canViewCourse: false,
        canViewGrade: false,
      },
      modelsNamesByPermission: {
        canViewStudent: "Alunos",
        canViewProfessor: "Professores",
        canViewCoordinator: "Coordenadores",
        canViewCourse: "Disciplinas",
        canViewGrade: "Notas",
      },
      modelsPaths: {
          "Alunos": "#",
          "Professores": "#",
          "Coordenadores": "#",
          "Disciplinas": "#",
          "Notas": "#",
      }
    }
  },
  created() {
    this.setHomeViewBasedOnUserPermissions();
  },
  methods: {
    setHomeViewBasedOnUserPermissions() {
      const permissions = [
          "users.view_student",
          "users.view_professor",
          "users.view_coordinator",
          "courses.view_course",
          "grades.view_grade",
      ];

      this.user.permissions.forEach((permissionValue) => {
        const permissionParts = permissionValue.split('.');
        const permissionModel = permissionParts[1].split("_")[1]
        if (permissionParts.length === 2 && permissions.includes(permissionValue)) {
          const permission = `canView${permissionModel.charAt(0).toUpperCase() + permissionModel.slice(1).toLowerCase()}`;
          if (this.userPermissions.hasOwnProperty(permission)) {
            this.userPermissions[permission] = true;
          }
        }
      });
    },
    getModelName(permissionName) {
      return this.modelsNamesByPermission[permissionName] || "";
    },
    defineModelPathByPermissionName(permissionName) {
      return `/${this.modelsNamesByPermission[permissionName].toLowerCase()}`
    }
  },
};

</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.models-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 15px;
}

.card-buttons {
  display: flex;
  justify-content: space-around;
  width: 100%;
}


h3 {
  margin-top: 60px;
  text-align: center;
}

.card-buttons {
}
</style>
