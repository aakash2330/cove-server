import React from 'react';
import '../index.css';

function Contact() {
   return(
    <div className='flex flex-col md:flex-row mx-auto md:mx-44'>
    <div className='flex flex-col mt-8 max-w-lg md:w-1/2 md:mt-32 '>
        <h1 className='mb-8 text-center md:text-left'>Contact Us</h1>
        <p className='text-center md:text-left'>We're dedicated to providing you with the best shopping experience for all 
            your footwear needs. Whether you're browsing for the perfect pair of sneakers, 
            elegant heels, or rugged boots, we're here to help. Your satisfaction is our priority,
             and we'd love to hear about your experience with us. Whether you have questions, 
             feedback, or simply want to chat about shoes, our team is ready to assist you </p>
    </div>
    <div className='flex flex-col mt-8 md:items-center md:justify-center md:p-12 md:w-1/2'>
  <div className='mx-auto w-full max-w-lg md:max-w-[550px]'>
    <form>
      <div className='mb-5'>
        <label
          for='name'
          className='mb-3 block text-base font-medium text-[#07074D]'
        >
          Full Name
        </label>
        <input
          type='text'
          name='name'
          id='name'
          placeholder='Full Name'
          className='w-full border border-[#e0e0e0] text-[#6B7280] bg-white py-3 px-6 text-base font-medium outline-none focus:border-[#6A64F1] focus:shadow-md'
        />
      </div>
      <div className='mb-5'>
        <label
          for='email'
          className='mb-3 block text-base font-medium text-[#07074D]'
        >
          Email 
        </label>
        <input
          type='email'
          name='email'
          id='email'
          placeholder='example@domain.com'
          className='w-full border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
        />
      </div>
      <div className='mb-5'>
        <label
          for='subject'
          className='mb-3 block text-base font-medium text-[#07074D]'
        >
          Subject
        </label>
        <input
          type='text'
          name='subject'
          id='subject'
          placeholder='Enter your subject'
          className='w-full border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
        />
      </div>
      <div className='mb-5'>
        <label
          for='message'
          className='mb-3 block text-base font-medium text-[#07074D]'
        >
          Message
        </label>
        <textarea
          rows='4'
          name='message'
          id='message'
          placeholder='Type your message'
          className='w-full resize-none border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
        ></textarea>
      </div>
      <div className='mb-8'>
        <button
          className='hover:shadow-form bg-black py-3 px-8 text-base font-semibold text-white outline-none'
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</div>
    </div>
   );

}

export default Contact;