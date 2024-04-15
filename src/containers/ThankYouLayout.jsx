import React from "react";
import HearBack from "../Components/Questionnaire/types/final page/HearBack";
import ThankYou from "../Components/Questionnaire/types/final page/ThankYou";
import {BrandsLayout} from "../Components/Questionnaire/types/final page/BrandsLayout";
import WhatsNext from "../Components/Questionnaire/types/final page/WhatsNext";
import ContentLayout from "./ContentLayout";
import PartnerWith from "../Components/UI/PartnerWith";

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
        <WhatsNext />
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
