"use client";

import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";

import { BlurBG } from "@/components/blur-bg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { SendHorizonal, User, Mail, Phone, MessageSquare, HelpCircle, CheckCircle, Clock, Shield } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email("Invalid email address"),
  phone: z.string().refine((val) => /^\+\d{1,3}\d{10}$/.test(val), {
    message: "Invalid phone number",
  }),
  referral: z.string(),
  message: z.string().nonempty({ message: "Message is required" }),
});
type FormValues = z.infer<typeof formSchema>;

const ContactForm = () => {
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      referral: "",
      message: "",
    },
  });
  const isLoading = form.formState.isSubmitting;
  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    try {
      await axios.post("/api/send", values);
      form.reset();
      toast({
        title: "Thank you for your message.",
        description: "I&apos;ll get back to you within 24 hours.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const benefits = [
    {
      icon: Clock,
      title: "Quick Response",
      description: "24-hour response guarantee"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is protected"
    },
    {
      icon: CheckCircle,
      title: "Free Consultation",
      description: "No obligation discussion"
    }
  ];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="max-w-6xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
        {/* Left Side - Benefits & Info */}
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-8">
          {/* Header */}
          <div>
            <div className="w-16 h-16 bg-purple/10 rounded-2xl flex items-center justify-center mb-6">
              <MessageSquare className="w-8 h-8 text-purple" />
            </div>
            <h3 className="text-[28px] md:text-[32px] lg:text-[36px] font-ao font-bold text-dark dark:text-light mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-dark/70 dark:text-light/70 font-switzer font-light text-[16px] md:text-[18px] leading-relaxed">
              Fill out the form and I&apos;ll get back to you within 24 hours with a detailed response tailored to your project needs.
            </p>
          </div>

          {/* Benefits */}
          <div className="space-y-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 group"
              >
                <div className="w-12 h-12 bg-purple/10 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-purple/20 group-hover:scale-110 transition-all duration-300">
                  <benefit.icon className="w-6 h-6 text-purple" />
                </div>
                <div>
                  <h4 className="text-dark dark:text-light font-switzer font-semibold text-[16px] md:text-[18px] mb-1">
                    {benefit.title}
                  </h4>
                  <p className="text-dark/70 dark:text-light/70 font-switzer font-light text-[14px] md:text-[16px]">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Info */}
          <motion.div
            variants={itemVariants}
            className="relative bg-light dark:bg-dark rounded-3xl p-8 overflow-hidden border border-lightBorderColor dark:border-darkBorderColor"
          >
            <BlurBG className="rounded-3xl" />
            <div className="relative z-20">
              <h4 className="text-dark dark:text-light font-ao font-bold text-[18px] md:text-[20px] mb-4">
                Prefer Direct Contact?
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-purple" />
                  <a href="mailto:hello@zeeshanjunaid.dev" className="text-dark dark:text-light hover:text-purple transition-colors duration-200 font-switzer text-[16px]">
                    hello@zeeshanjunaid.dev
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-purple" />
                  <a href="tel:+923408563525" className="text-dark dark:text-light hover:text-purple transition-colors duration-200 font-switzer text-[16px]">
                    +92 340 8563525
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side - Form */}
        <motion.div variants={itemVariants} className="lg:col-span-3">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="bg-light dark:bg-dark relative overflow-hidden rounded-3xl p-8 md:p-10 lg:p-12 border border-lightBorderColor dark:border-darkBorderColor"
            >
              <BlurBG className="rounded-3xl" />
              
              {/* Form Header */}
              <div className="relative z-20 mb-8 text-center">
                <h4 className="text-[24px] md:text-[28px] font-ao font-bold text-dark dark:text-light mb-3">
                  Let&apos;s Discuss Your Project
                </h4>
                <p className="text-dark/70 dark:text-light/70 font-switzer font-light text-[16px] leading-relaxed">
                  Tell me about your vision and I&apos;ll help bring it to life
                </p>
              </div>

              <div className="relative z-20 space-y-8">
                {/* Personal Info Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="flex items-center gap-2 text-dark dark:text-light font-switzer font-medium text-[16px]">
                          <User className="w-4 h-4 text-purple" />
                          Full Name *
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={isLoading}
                            placeholder="John Doe"
                            className="border-0 focus-visible:ring-0 text-dark dark:text-light font-switzer text-[16px] font-light focus-visible:ring-offset-0 relative h-14"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Email Field */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="flex items-center gap-2 text-dark dark:text-light font-switzer font-medium text-[16px]">
                          <Mail className="w-4 h-4 text-purple" />
                          Email Address *
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={isLoading}
                            placeholder="john@example.com"
                            className="border-0 focus-visible:ring-0 text-dark dark:text-light font-switzer text-[16px] font-light focus-visible:ring-offset-0 relative h-14"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Contact Info Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Phone Field */}
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="flex items-center gap-2 text-dark dark:text-light font-switzer font-medium text-[16px]">
                          <Phone className="w-4 h-4 text-purple" />
                          Phone Number *
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={isLoading}
                            placeholder="+1 (555) 123-4567"
                            className="border-0 focus-visible:ring-0 text-dark dark:text-light font-switzer text-[16px] font-light focus-visible:ring-offset-0 relative h-14"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Referral Field */}
                  <FormField
                    control={form.control}
                    name="referral"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="flex items-center gap-2 text-dark dark:text-light font-switzer font-medium text-[16px]">
                          <HelpCircle className="w-4 h-4 text-purple" />
                          How did you find me?
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={isLoading}
                            placeholder="Google, LinkedIn, referral..."
                            className="border-0 focus-visible:ring-0 text-dark dark:text-light font-switzer text-[16px] font-light focus-visible:ring-offset-0 relative h-14"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Message Field */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="flex items-center gap-2 text-dark dark:text-light font-switzer font-medium text-[16px]">
                        <MessageSquare className="w-4 h-4 text-purple" />
                        Project Details & Budget *
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          className="border-0 focus-visible:ring-0 text-dark dark:text-light font-switzer text-[16px] font-light focus-visible:ring-offset-0 relative min-h-[140px] resize-none"
                          placeholder="I&apos;m looking for a React developer to build an e-commerce website. My budget is around $5,000 and I need it completed within 8 weeks. The site should have user authentication, payment processing, and an admin dashboard..."
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Section */}
                <div className="pt-6 border-t border-lightBorderColor dark:border-darkBorderColor">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-center sm:text-left">
                      <p className="text-dark/60 dark:text-light/60 font-switzer font-light text-[14px] mb-1">
                        * Required fields
                      </p>
                      <p className="text-dark/50 dark:text-light/50 font-switzer font-light text-[12px]">
                        Your information is secure and will never be shared
                      </p>
                    </div>
                    
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        disabled={isLoading}
                        size="lg"
                        className="px-8 py-4 text-[16px] font-switzer font-medium rounded-xl uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-300 min-w-[180px]"
                        variant="purple"
                      >
                        {isLoading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <SendHorizonal className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </form>
          </Form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ContactForm;