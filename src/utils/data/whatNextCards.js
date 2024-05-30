import phoneIcon from "@/images/thank you/phone.svg?url"
import discussionIcon from "@/images/thank you/discussion.svg?url"
import handsIcon from "@/images/thank you/hands.svg?url"

export const cards = [
   {
     title: "Wait for a call from the relevant provider(s)",
     info: "Please expect a call from the provider (or providers) we matched you with shortly. You are even likely to hear back from them within one business day! The number of providers will depend on your business requirements and our matching process but can be 1-3.",
     src: phoneIcon,
     bolds:["within one business day!","1-3"],
     alt: "Phone icon",
   },
   {
     title: "Discuss your business needs",
     info: "Once the provider calls you, this is your chance to ask any questions about the services. See if the provider is right for you and your specific needs. You’ll also be able to receive a pricing quote to see which plans are available. Speaking to a representative in person is always more efficient than finding what you need.",
     src: discussionIcon,

     bolds:["ask any questions","receive a pricing quote","plans are available.","Speaking to a representative in person"],

     alt: "Dicussion icon",
   },
   {
     title: "Count on us",
     info: "We're here for you if you need anything throughout the process. Feel free to email us with any questions or concerns at service@sonary.com, and we'll get back to you as soon as possible.",
     src: handsIcon,
     bolds:[],

     alt: "Hands icon",

   },
 ];