import React from "react";

import HearBack from "../components/finalPage/HearBack";
import ThankYou from "../components/finalPage/ThankYou";
import {BrandsLayout} from "../components/finalPage/BrandsLayout";
import ContentLayout from "./ContentLayout";
import PartnerWith from "../components/UI/Promotional/PartnerWith";
import WhatsNext from "../components/finalPage/WhatsNext";

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
