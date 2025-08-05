import { YimoHero } from "@/components/YimoHero";
import { YimoPlayground } from "@/components/YimoPlayground";
import { YimoGallery } from "@/components/YimoGallery";
import { YimoFooter } from "@/components/YimoFooter";

const Index = () => {
  return (
    <div className="min-h-screen">
      <YimoHero />
      <YimoPlayground />
      <YimoGallery />
      <YimoFooter />
    </div>
  );
};

export default Index;
