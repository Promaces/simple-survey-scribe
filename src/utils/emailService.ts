import emailjs from '@emailjs/browser';

export const sendSurveyResults = async (answers: Record<number, string>) => {
  try {
    const result = await emailjs.send(
      'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
      'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
      {
        to_email: 'georgebasseybit@gmail.com',
        survey_results: JSON.stringify(answers, null, 2)
      },
      'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
    );
    return result;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};