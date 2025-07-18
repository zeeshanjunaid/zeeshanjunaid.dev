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
import { SendHorizonal, User, Mail, Phone, MessageSquare, HelpCircle } from "lucide-react";
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
        description: "I'll get back to you within 24 hours.",
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

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="max-w-4xl mx-auto"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-light dark:bg-dark relative overflow-hidden rounded-3xl px-6 py-10 md:px-12 md:py-16 border border-lightBorderColor dark:border-darkBorderColor"
        >
          <BlurBG className="rounded-3xl" />
          
          {/* Form Header */}
          <motion.div variants={itemVariants} className="relative z-20 mb-10 text-center">
            <div className="w-16 h-16 bg-purple/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <MessageSquare className="w-8 h-8 text-purple" />
            </div>
            <h3 className="text-[24px] md:text-[28px] lg:text-[32px] font-ao font-bold text-dark dark:text-light mb-4">
              Let's Discuss Your Project
            </h3>
            <p className="text-dark/70 dark:text-light/70 font-switzer font-light text-[16px] md:text-[18px] leading-relaxed max-w-2xl mx-auto">
              Fill out the form below with your project details. I'll review your requirements 
              and get back to you within <strong className="text-purple">24 hours</strong> with a detailed response.
            </p>
          </motion.div>

          <div className="relative z-20 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Name Field */}
            <motion.div variants={itemVariants}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="flex items-center gap-2 text-dark dark:text-light font-switzer font-medium text-[16px]">
                      <User className="w-4 h-4 text-purple" />
                      What's your name?
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Enter your full name"
                        className="border-0 focus-visible:ring-0 text-dark dark:text-light font-switzer text-[16px] font-light focus-visible:ring-offset-0 relative h-14"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            {/* Email Field */}
            <motion.div variants={itemVariants}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="flex items-center gap-2 text-dark dark:text-light font-switzer font-medium text-[16px]">
                      <Mail className="w-4 h-4 text-purple" />
                      What's your email?
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="your.email@example.com"
                        className="border-0 focus-visible:ring-0 text-dark dark:text-light font-switzer text-[16px] font-light focus-visible:ring-offset-0 relative h-14"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            {/* Phone Field */}
            <motion.div variants={itemVariants}>
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="flex items-center gap-2 text-dark dark:text-light font-switzer font-medium text-[16px]">
                      <Phone className="w-4 h-4 text-purple" />
                      Phone number
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
            </motion.div>

            {/* Referral Field */}
            <motion.div variants={itemVariants}>
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
                        placeholder="Google search, referral, social media..."
                        className="border-0 focus-visible:ring-0 text-dark dark:text-light font-switzer text-[16px] font-light focus-visible:ring-offset-0 relative h-14"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            {/* Message Field */}
            <motion.div variants={itemVariants} className="md:col-span-2">
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="flex items-center gap-2 text-dark dark:text-light font-switzer font-medium text-[16px]">
                      <MessageSquare className="w-4 h-4 text-purple" />
                      Tell me about your project and budget
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="border-0 focus-visible:ring-0 text-dark dark:text-light font-switzer text-[16px] font-light focus-visible:ring-offset-0 relative min-h-[120px]"
                        placeholder="I'm looking for a React developer for my e-commerce project. My budget is around $5,000 and I need it completed in 6 weeks..."
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            {/* Submit Button */}
            <motion.div variants={itemVariants} className="md:col-span-2 text-center pt-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  disabled={isLoading}
                  size="lg"
                  className="px-12 py-4 text-[16px] font-switzer font-medium rounded-xl uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-300"
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
              
              <p className="text-dark/50 dark:text-light/50 font-switzer font-light text-[14px] mt-4">
                Your information is secure and will never be shared with third parties.
              </p>
            </motion.div>
          </div>
        </form>
      </Form>
    </motion.div>
  );
};

export default ContactForm;