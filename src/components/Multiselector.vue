<template>
    <CRow>
      <CCol xs="12" md="5">
        <div class="select-wrapper">
          <select v-model="selectedGroup" class="custom-select">
            <option disabled value="">Select group</option>
            <option
              v-for="(description, group) in groups" :key="group" :value="group">
              {{ group }}
            </option>
          </select>
        </div>
      </CCol>
  
      <CCol md="1"></CCol>
      <CCol xs="12" md="6">
        <div v-if="selectedGroup" class="values-list">
          <h3>Values for "{{ selectedGroup }}":</h3>
          <ul>
            <li v-for="value in groups[selectedGroup]" :key="value" class="checkbox-item">
              <input type="checkbox" :id="value" :value="value" v-model="checkedValues" class="custom-checkbox"
              />
              <label :for="value" class="checkbox-label">{{ value }}</label>
            </li>
          </ul>
        </div>
      </CCol>
    </CRow>
  </template>
  
  <script>

  export default {
    emits: ['selected-values'],
    data() {
        return {
            selectedGroup: '',
            checkedValues: [],
            groups: {
                'Grow Together': ['Empowerment', 'Teamwork', 'Personal Development'],
                'Client Value': [
                    'Reliability',
                    'Quality Service',
                    'Customer Satisfaction',
                ],
                'Innovate for Success': [
                    'Creativity',
                    'Innovation',
                    'Continuous Improvement',
                ],
                'Deliver Excellence': [
                    'Attention to Detail',
                    'Commitment',
                    'Professionalism',
                ],
            },
        };
    },
    methods: {
        emitSelectedValues() {
          this.$emit('selected-values', this.selectedGroup ,this.checkedValues);
        }
    },
    components: { }
};
  </script>
  
  <style scoped>
  .select-wrapper {
    margin-bottom: 1rem;
  }
  
  .custom-select {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
  
  .custom-select:focus {
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
  
  .values-list h3 {
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }
  
  .values-list ul {
    list-style: none;
    padding-left: 0;
  }
  
  .checkbox-item {
    margin-bottom: 0.5rem;
  }
  
  .custom-checkbox {
    margin-right: 0.5rem;
  }
  
  .checkbox-label {
    user-select: none; /* Esto mejora la experiencia del usuario al evitar selecciones accidentales de texto al hacer clic */
  }
  </style>
  