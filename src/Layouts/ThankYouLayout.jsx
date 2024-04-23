import React from "react";

import HearBack from "../Components/Final Page/HearBack";
import ThankYou from "../Components/Final Page/ThankYou";
import {BrandsLayout} from "../Components/Final Page/BrandsLayout";
import ContentLayout from "./ContentLayout";
import PartnerWith from "../Components/UI/Promotional/PartnerWith";
import WhatsNext from "../Components/Final Page/WhatsNext";

const ThankYouLayout = () => {
  return (
    <>
      <ContentLayout bgColor={'rgba(0, 28, 65, 0.05)'}>
        <ThankYou />
      </ContentLayout>
      <ContentLayout bgColor={'#f6f6f6'}>
        <PartnerWith />
      </ContentLayout>
      <ContentLayout bgColor={'#f6f6f6'}>
        <WhatsNext/>
      </ContentLayout>
      <ContentLayout bgColor={'rgba(0, 111, 255, 0.05)'}>
        <BrandsLayout />
      </ContentLayout>
      <ContentLayout bgColor={'#f6f6f6'}>
        <HearBack />
      </ContentLayout>
    </>
  );
};

export default ThankYouLayout;
