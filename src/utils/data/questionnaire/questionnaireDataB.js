import env from "@/utils/data/env";
const questionnaireDataB = {
  flow_id: 1,
  flow_name: "merchant_services",
  supported_brands: [
     {
        weight: 0.75,
        form_id: env.PAYSAFE_FORM_ID,
      },
      {
        weight: 0.25,
        form_id: env.STAX_FORM_ID,
      },
  ],
  questions: [
    {
      text: "What type of business do you have? BBBBB",
      code: "industry_type",
      step: 1,
      type: "one-selection",
      included_in_scoring: true,

      display_list_direction: "col",
      answers: [
        {
          text: "Food and Catering",
         //  next_question_code: "monthly_volume",
         next_question_code: "zip_code",

        },
        {
          text: "Retail",
          next_question_code: "monthly_volume",
        },
        {
          text: "B2B Services",
          next_question_code: "monthly_volume",
          excluded_brands: [env.PAYSAFE_FORM_ID],

        },
        {
          text: "Health and Leisure",
          next_question_code: "monthly_volume",
        },
        {
          text: "Other",
          isOther: true,
          next_question_code: "monthly_volume",
        },
      ],
    },
    {
      text: "What's your estimated monthly processing volume?",
      code: "monthly_volume",
      step: 2,
      type: "one-selection",
      display_list_direction: "col",
      included_in_scoring: true,

      answers: [
        {
          text: "Up to $999",
          next_question_code: "cc_payment_method",
        },
        {
          text: "Between $1,000-$9,999",
          next_question_code: "cc_payment_method",
        },
        {
          text: "More than $10,000",
          next_question_code: "cc_payment_method",
        },
        {
          text: "Not sure",
          next_question_code: "cc_payment_method",
        },
      ],
    },
    {
      text: "What’s your preferred method for accepting credit card payments?",
      code: "cc_payment_method",
      step: 3,
      type: "multi-selection",
      display_list_direction: "row",
      included_in_scoring: true,

      instructions: "Select all that apply",
      answers: [
        {
          text: "In person",
          iconSrc:
            "https://assets.sonary.com/wp-content/uploads/2024/04/11084238/cash.svg",
          next_question_code: "zip_code",
        },
        {
          text: "Online",
          iconSrc:
            "https://assets.sonary.com/wp-content/uploads/2024/04/11084239/creditcard.svg",

          next_question_code: "zip_code",
        },
        {
          text: "By phone",
          iconSrc:
            "https://assets.sonary.com/wp-content/uploads/2024/04/11084237/phone.svg",
          next_question_code: "zip_code",
        },
      ],
    },
    {
      code: "zip_code",
      step: 4,
      type: "details-question",
      display_list_direction: "col",
      
      subquestions: [
        {
          text: "Please enter your zip code",
          code: "zip_code",
          error: "Please enter a valid 5-digit ZIP code.",
          example: "e.g: 90210",
          maxLength: "5",
        },
      ],
      answers: [
        {
          next_question_code: "loader",
        },
      ],
      extra_info: "This will help us find relevant providers in your location.",
    },
    {
      text: "Hold on...",
      code: "loader",
      step: 5,
      type: "loader",
      display_list_direction: "col",
      answers: [
        {
          next_question_code: "form_result",
        },
      ],
      extra_info: "Our experts are working their magic",
    },
    {
      code: "form_result",
      step: 6,
      display_list_direction: "col",

      type: "form-result",
      subquestions: [
         {
            text: "First name",
            code: "first_name",
            error: "Your first name must contain at least 2 characters",
            example: "e.g: John",
          },
          {
            text: "Last name",
            code: "last_name",
            error: "Your last name must contain at least 2 characters",
            example: "e.g: Smith",
          },
          {
            text: "What is your work email address?",
            code: "email",
            example: "e.g: abc@gmail.com",
            error: "Please enter a valid email address",
          },
          {
            text: "What is your phone number?",
            code: "phone",
            error: "Please enter a valid phone number",
            example: "e.g: 2345678901",
            maxLength: "10",
          },
          {
            text: "What is your business name?",
            code: "company_name",
            error: "Your business name must contain at least 2 characters",
            example: "e.g: Acme Marketing",
            maxLength: "50",
          },
      ],
      answers: [
        {
          next_question_code: "thank_you",
        },
      ],
    },
    

    {
      text: "Thank you",
      code: "thank_you",
      step: 99999,
      type: "thank you",
      display_list_direction: "col",
      answers: [],
    },
  ],
};
export  {questionnaireDataB};
