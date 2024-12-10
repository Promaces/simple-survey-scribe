import emailjs from '@emailjs/browser';

export const sendSurveyResults = async (answers: Record<number, string>) => {
  try {
    const result = await emailjs.send(
      'service_wa7c2aj',
      'template_mnjgots',
      {
        to_email: 'georgebasseybit@gmail.com',
        survey_results: JSON.stringify(answers, null, 2)
      },
      '7RRVOOgVYlqzBKP5r'
    );
    return result;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};