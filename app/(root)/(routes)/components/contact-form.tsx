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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { pricingTiers } from "./pricing-table";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email("Invalid email address"),
  phone: z.string().refine((val) => /^\+\d{1,3}\d{10}$/.test(val), {
    message: "Invalid phone number",
  }),
  service: z.string(),
  referral: z.string(),
  message: z.string().nonempty({ message: "Message is required" }),
});
type FormValues = z.infer<typeof formSchema>;

const ContactForm = () => {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get('service');

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: serviceParam || "",
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
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll personally review your project details and get back to you within one business day.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  };

  const serviceOptions = [
    { value: "none", label: "I'm not sure yet - let's discuss" },
    ...pricingTiers.map(tier => ({
      value: tier.id,
      label: `${tier.name} - $${tier.price}/month`
    })),
    { value: "custom", label: "Custom project (one-time)" },
  ];

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
        duration: 0.4,
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
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="bg-light dark:bg-dark relative overflow-hidden rounded-3xl p-8 md:p-10 lg:p-12 border border-lightBorderColor dark:border-darkBorderColor max-w-4xl mx-auto"
          >
            <BlurBG className="rounded-3xl" />
            
            {/* Form Header */}
            <div className="relative z-20 mb-8 text-center">
              <h4 className="text-[24px] md:text-[28px] font-ao font-bold text-dark dark:text-light mb-3">
                Tell Me About Your Project
              </h4>
              <p className="text-dark/70 dark:text-light/70 font-switzer font-light text-[16px] leading-relaxed">
                Fill out the form below and I&apos;ll get back to you within 24 hours with a detailed response tailored to your project needs.
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

                {/* Service Selection Field */}
                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="flex items-center gap-2 text-dark dark:text-light font-switzer font-medium text-[16px]">
                        <CheckCircle className="w-4 h-4 text-purple" />
                        Service Needed *
                      </FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                          <SelectTrigger className="h-14 border-0 focus:ring-0 text-dark dark:text-light font-switzer text-[16px] font-light focus:ring-offset-0 relative bg-light dark:bg-dark border-[1px] border-solid border-lightBorderColor dark:border-darkBorderColor rounded-xl">
                            <div className="relative w-full">
                              <BlurBG className="rounded-xl" />
                              <div className="relative z-20">
                                <SelectValue placeholder="Select a service..." />
                              </div>
                            </div>
                          </SelectTrigger>
                          <SelectContent className="bg-light dark:bg-dark border-lightBorderColor dark:border-darkBorderColor rounded-xl">
                            {serviceOptions.map((option) => (
                              <SelectItem 
                                key={option.value} 
                                value={option.value}
                                className="text-dark dark:text-light font-switzer font-light hover:bg-purple/10 focus:bg-purple/20 rounded-lg mx-1 my-0.5"
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

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
                        placeholder="I'm looking for a React developer to build an e-commerce website. My budget is around $5,000 and I need it completed within 8 weeks. The site should have user authentication, payment processing, and an admin dashboard..."
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
                      className="px-8 py-4 text-[16px] font-switzer font-medium rounded-xl uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-200 min-w-[180px]"
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
    </motion.div>
  );
};

export default ContactForm;