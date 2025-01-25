import { mount } from '@vue/test-utils';
import BookingForm from '';
import { describe, expect, it } from 'vitest';

describe('BookingForm', () => {
  it('renders correctly', () => {
    const wrapper = mount(BookingForm);

    expect(wrapper.html()).toContain('Email');
    expect(wrapper.html()).toContain('Seats to Reserve');
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true);
  });

  it('validates empty email and seat fields', async () => {
    const wrapper = mount(BookingForm);

    await wrapper.find('form').trigger('submit.prevent');

    expect(wrapper.vm.errors.email).toBe('Email is required');
    expect(wrapper.vm.errors.seats).toBe('Seats are required');
  });

  it('validates invalid email format and seat value', async () => {
    const wrapper = mount(BookingForm);

    wrapper.setData({
      formData: {
        email: 'invalid-email',
        seats: -1,
      },
    });

    await wrapper.find('form').trigger('submit.prevent');

    expect(wrapper.vm.errors.email).toBe('Email must be valid');
    expect(wrapper.vm.errors.seats).toBe('Seats must be at least 1');
  });

  it('handles backend errors when submitting booking', async () => {
    const wrapper = mount(BookingForm);

    wrapper.setData({
      formData: {
        email: 'test@example.com',
        seats: 3,
      },
    });

    jest.spyOn(wrapper.vm, 'submitForm').mockRejectedValueOnce({
      response: { data: { message: 'Travel is fully booked' } },
    });

    await wrapper.find('form').trigger('submit.prevent');

    expect(wrapper.vm.errors.backend).toBe('Travel is fully booked');
  });

  it('submits valid form data', async () => {
    const wrapper = mount(BookingForm);

    wrapper.setData({
      formData: {
        email: 'test@example.com',
        seats: 3,
      },
    });

    jest.spyOn(wrapper.vm, 'submitForm').mockResolvedValueOnce({ success: true });

    await wrapper.find('form').trigger('submit.prevent');

    expect(wrapper.vm.errors).toEqual({});
    expect(wrapper.vm.formData.email).toBe('test@example.com');
    expect(wrapper.vm.formData.seats).toBe(3);
  });
});

