// tests/UserForm.spec.js
import { expect } from 'chai';
import { mount } from '@vue/test-utils';
import UserForm from '@/components/UserForm.vue';

describe('UserForm.vue', () => {
  it('renders form elements correctly', () => {
    const wrapper = mount(UserForm);
    expect(wrapper.find('form').exists()).to.be.true;
    expect(wrapper.find('label[for="name"]').text()).to.equal('Name:');
    // Add more assertions as needed
  });

  it('validates identity number correctly', async () => {
    const wrapper = mount(UserForm);
    wrapper.setData({ user: { identityNumber: '123456789012345' } });
    await wrapper.find('form').trigger('submit');
    expect(wrapper.find('.error-message').text()).to.equal('Identity number must be 16 characters long.');
  });

  // Add more tests for other functionalities
});