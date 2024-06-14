<template>
    <div>
      <form @submit.prevent="submitForm">
        <div>
          <label for="name">Name:</label>
          <input type="text" v-model="user.name" id="name" required :disabled="loading">
        </div>
        <div>
          <label for="identityNumber">Identity Number:</label>
          <input type="text" v-model="user.identityNumber" id="identityNumber" required :disabled="loading">
          <p v-if="errors.identityNumber">{{ errors.identityNumber }}</p>
        </div>
        <div>
          <label for="email">Email:</label>
          <input type="email" v-model="user.email" id="email" required :disabled="loading">
          <p v-if="errors.email">{{ errors.email }}</p>
        </div>
        <div>
          <label for="dateOfBirth">Date of Birth:</label>
          <input type="date" v-model="user.dateOfBirth" id="dateOfBirth" required :disabled="loading">
        </div>
        <button type="submit" :disabled="loading">
          <span v-if="loading">Submitting...</span>
          <span v-else>Submit</span>
        </button>
      </form>
      <div v-if="loading" class="loading-overlay">
        <div class="loading-spinner"></div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  const API_URL = process.env.VUE_APP_API_URL || 'http://localhost:5093';
  
  export default {
    data() {
      return {
        user: {
          name: '',
          identityNumber: '',
          email: '',
          dateOfBirth: ''
        },
        errors: {
          identityNumber: '',
          email: ''
        },
        loading: false
      };
    },
    methods: {
      async submitForm() {
        this.resetErrors();
        this.loading = true;
  
        if (!this.isValidForm()) {
          this.loading = false;
          return;
        }
  
        try {
          await axios.post(`${API_URL}/api/users`, this.user);
          alert('User registered successfully!');
          this.resetForm();
        } catch (error) {
          this.handleError(error);
        } finally {
          this.loading = false;
        }
      },
      resetForm() {
        this.user = {
          name: '',
          identityNumber: '',
          email: '',
          dateOfBirth: ''
        };
      },
      resetErrors() {
        this.errors = {
          identityNumber: '',
          email: ''
        };
      },
      isValidForm() {
        if (this.user.identityNumber.length !== 16) {
          this.errors.identityNumber = 'Identity number must be 16 characters long.';
          return false;
        }
        if (!this.validateEmail(this.user.email)) {
          this.errors.email = 'Invalid email format.';
          return false;
        }
        return true;
      },
      validateEmail(email) {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
      },
      handleError(error) {
        if (error.response) {
          alert(`Registration failed: ${error.response.data.message || 'Unknown error'}`);
        } else if (error.request) {
          alert('Registration failed: No response from server. Please check your network connection.');
        } else {
          alert(`Registration failed: ${error.message}`);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  form div {
    margin-bottom: 1rem;
  }
  label {
    margin-right: 1rem;
  }
  input {
    padding: 0.5rem;
    width: 100%;
    box-sizing: border-box;
  }
  button {
    padding: 0.5rem 1rem;
  }
  button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  form {
    max-width: 400px;
    margin: auto;
    text-align: left;
  }
  .loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  .loading-spinner {
    border: 8px solid rgba(255, 255, 255, 0.3);
    border-top: 8px solid #fff;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  </style>
  