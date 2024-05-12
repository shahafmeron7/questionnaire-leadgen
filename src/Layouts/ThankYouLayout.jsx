import React ,{Suspense}from "react";
import Loading from '@/components/UI/LazyLoading/Loading'
import ContentLayout from "./ContentLayout";
import ThankYou from "@/components/finalPage/ThankYou";

const PartnerWith =React.lazy(() => import("@/components//UI/Promotional/PartnerWith"));
const WhatsNext = React.lazy(() => import("@/components//finalPage/WhatsNext"));
const BrandsLayout = React.lazy(() =>
  import("@/components//finalPage/BrandsLayout")
);
const HearBack = React.lazy(() => import("@/components//finalPage/HearBack"));

const ThankYouLayout = () => {
  return (
    <>
      <ContentLayout bgColor={"rgba(0, 28, 65, 0.05)"}>
        <ThankYou />
      </ContentLayout>

      <ContentLayout bgColor={"#f6f6f6"}>
      <Suspense fallback={<Loading />}>

          <PartnerWith />
          </Suspense>

      </ContentLayout>

      <ContentLayout bgColor={"#f6f6f6"}>
        <Suspense fallback={<Loading />}>
          <WhatsNext />
        </Suspense>
      </ContentLayout>

      <ContentLayout bgColor={"rgba(0, 111, 255, 0.05)"}>
        <Suspense fallback={<Loading />}>
          <BrandsLayout />
        </Suspense>
      </ContentLayout>

      <ContentLayout bgColor={"#f6f6f6"}>
        <Suspense fallback={<Loading />}>
          <HearBack />
        </Suspense>
      </ContentLayout>
    </>
  );
};

export default ThankYouLayout;
