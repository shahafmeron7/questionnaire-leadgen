import lightspeedIcon from "../../images/thank you/lightspeed.svg"
import toastIcon from "../../images/thank you/toast.svg";
const prosIcon =
  "https://assets.sonary.com/wp-content/uploads/2024/01/18084718/Icon-Name.svg";
const consIcon =
  "https://assets.sonary.com/wp-content/uploads/2024/01/18084759/Icon-Name-1.svg";
  export const brandsCards = [
    {
      src: lightspeedIcon,
      alt: "lightspeed Logo",
      pid:"677451",
      pros_cons: {
        Pros: {
          icon: prosIcon,
          list: [
            "Integrates payments, POS & eCommerce",
            "Easy customization",
            "Intuitive interface for simple use",
            "Annual contract is binding",
          ],
        },

        Cons: {
          icon: consIcon,
          list: [
            "Certain features only in premium plans",
            "Add-ons can ramp up the cost",
            "You are tied in to an annual contract",
          ],
        },
      },
    },
    {
      src: toastIcon,
      alt: "Trusted Providers Logo",
      pid:"675177",
      pros_cons: {
        Pros: {
          icon: prosIcon,
          list: [
            "Streamlined back-office operations",
            "Kitchen and service staff integrations",
            "Multi-location menu management",
            "Fairly priced",
          ],
        },

        Cons: {
          icon: consIcon,
          list: [
            "Only available on Android",
            "Early termination fee",
            "Not fit for large restaurants or chains",
          ],
        },
      },
    },
  ];