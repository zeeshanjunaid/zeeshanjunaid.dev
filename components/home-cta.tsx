import { Container } from "@/components/container";
import { BlurBG } from "@/components/blur-bg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

const HomeCTA = () => {
  return (
    <section className="py-16 md:py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple/5 rounded-full blur-3xl" />
      </div>

      <Container className="px-4 md:px-7 lg:px-0">
        <div className="relative bg-white dark:bg-gray-900 rounded-3xl p-12 md:p-16 text-center overflow-hidden">
          <BlurBG className="rounded-3xl" />
          
          {/* Decorative Elements */}
          <div className="absolute top-6 right-6 w-3 h-3 bg-purple/20 rounded-full" />
          <div className="absolute bottom-6 left-6 w-2 h-2 bg-purple/30 rounded-full" />
          
          <div className="relative z-20">
            <div className="w-16 h-16 bg-purple/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-8 h-8 text-purple" />
            </div>
            
            <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold font-ao text-gray-900 dark:text-white mb-6">
              Have a Project in Mind?
            </h2>
            
            <p className="text-gray-900/80 dark:text-white/80 font-switzer font-light text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed max-w-2xl mx-auto mb-8">
              Let&apos;s turn your idea into a tangible success. I&apos;m currently available for new freelance projects and would love to hear about your vision.
            </p>
            
            <Link href="/contact">
              <Button 
                variant="purple" 
                size="lg" 
                className="rounded-xl uppercase font-medium font-switzer flex items-center gap-2 mx-auto shadow-lg hover:shadow-xl transition-shadow duration-200 w-full sm:w-auto justify-center min-w-[200px]"
              >
                Start Your Project
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-br from-purple/5 via-transparent to-purple/10 rounded-3xl" />
        </div>
      </Container>
    </section>
  );
};

export default HomeCTA;