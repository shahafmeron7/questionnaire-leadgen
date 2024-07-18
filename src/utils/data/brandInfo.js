import env from './env'
import  PaysafeLogo  from "@/images/brands/Paysafe.svg?url";
import  StaxLogo  from "@/images/brands/Stax.svg?url";
export const brandInfo = {
   [env.PAYSAFE_FORM_ID]:{
      imgSrc:PaysafeLogo,
      imgAlt:'Paysafe Logo',
      sellingLines:[
         'Next-day funding with very low rates',
         'Market-leading fraud & risk protection',
         'Trusted by 250,000 businesses'
      ]
   },
   [env.STAX_FORM_ID]:{
      imgSrc:StaxLogo,
      imgAlt:'Stax Logo',

     
      sellingLines:[
         'Average monthly savings of 40%',
         '0% markup processing, zero hidden fees',
         'Support teams dedicated to your success',
      ]
   }
}